/**
 * Company details used across the legal, careers and case-study pages.
 * Update these in one place — every page that mentions them reads from here.
 */
export const company = {
  name: "Alphorax",
  legalName: "Alphorax LTD",
  website: "alphorax.com",
  email: "info@alphorax.com",
  privacyEmail: "info@alphorax.com",
  careersEmail: "info@alphorax.com",
  pressEmail: "info@alphorax.com",
  phone: "+2348139015905",
  // TODO(press): add your city (e.g. "City, Country"). Used in press release
  // datelines and the media kit.
  headquarters: "Nigeria",
  founded: "2025",
  socials: {
    linkedin: "https://www.linkedin.com/company/alphoraxltd",
    x: "https://twitter.com/alphoraxltd",
  },
  // TODO(legal): confirm the country whose laws govern the Terms of Service.
  governingLaw: "the Federal Republic of Nigeria",
  // Google Analytics measurement ID loaded in app/layout.tsx
  gaMeasurementId: "G-FNS3P4DVCZ",
  // Meta (Facebook) Pixel ID loaded in app/layout.tsx
  metaPixelId: "1561459935497412",
} as const;

/** Date shown as "Last updated" on the legal pages. */
export const legalLastUpdated = "November 24, 2026";
