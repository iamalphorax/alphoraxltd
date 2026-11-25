import { NextResponse, after } from "next/server";
import { cleanEventId, getMetaRequestContext, sendMetaEvent } from "@/lib/meta/capi";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const field = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Sends a job application to the team inbox via Brevo. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const metaContext = getMetaRequestContext(request);
    const name = field(body.name, 200);
    const email = field(body.email, 200);
    const role = field(body.role, 200);
    const location = field(body.location, 200);
    const portfolio = field(body.portfolio, 500);
    const cv = field(body.cv, 500);
    const message = field(body.message, 5000);

    if (!name || !email || !role || !portfolio || !message) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!isHttpUrl(portfolio) || (cv && !isHttpUrl(cv))) {
      return NextResponse.json({ error: "Links must start with http:// or https://." }, { status: 400 });
    }
    if (body.consent !== true) {
      return NextResponse.json({ error: "Please accept the privacy notice to apply." }, { status: 400 });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const recipient = process.env.CAREERS_EMAIL || process.env.CONTACT_EMAIL;
    const senderEmail = process.env.SENDER_EMAIL || recipient;

    if (!brevoApiKey || !recipient || !senderEmail) {
      console.error("Careers form: missing BREVO_API_KEY or CONTACT_EMAIL/CAREERS_EMAIL.");
      return NextResponse.json(
        { error: "Applications are temporarily unavailable. Please email us instead." },
        { status: 500 },
      );
    }

    const link = (url: string) =>
      `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`;

    const htmlContent = `
      <h3>New job application from the Alphorax website</h3>
      <p><strong>Role:</strong> ${escapeHtml(role)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Location:</strong> ${escapeHtml(location || "N/A")}</p>
      <p><strong>LinkedIn / portfolio:</strong> ${link(portfolio)}</p>
      <p><strong>CV:</strong> ${cv ? link(cv) : "N/A"}</p>
      <p><strong>Why Alphorax:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: { name: "Alphorax Careers", email: senderEmail },
        replyTo: { name, email },
        to: [{ email: recipient, name: "Alphorax Hiring" }],
        subject: `Application: ${role} — ${name}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const details = await response.json().catch(() => null);
      console.error("Brevo careers email error:", response.status, details);
      return NextResponse.json(
        { error: "We couldn't send your application. Please try again." },
        { status: 502 },
      );
    }

    // Report the application to Meta (no applicant contact details are sent).
    after(() =>
      sendMetaEvent({
        eventName: "SubmitApplication",
        eventId: cleanEventId(body.metaEventId),
        context: metaContext,
        customData: { content_name: "Job application" },
      }),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
