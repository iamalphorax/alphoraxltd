"use client";

import React, { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CopyButtonProps {
  text: string;
  /** Visible label. Omit for an icon-only button (then `srLabel` is required). */
  label?: string;
  srLabel?: string;
  className?: string;
}

/** Copies text to the clipboard and briefly confirms it. */
const CopyButton = ({ text, label, srLabel, className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fall back.
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        if (document.execCommand("copy")) setCopied(true);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const Icon = copied ? CheckIcon : CopyIcon;

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label ? undefined : srLabel}
        title={label ? undefined : srLabel}
        className={`inline-flex items-center justify-center gap-2 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
          copied
            ? "border-accent/60 text-accent bg-accent/10"
            : "border-secondary-silver/20 text-secondary-silver hover:text-white hover:border-accent/40"
        } ${className}`}
      >
        <Icon size={16} aria-hidden="true" />
        {label && <span>{copied ? "Copied" : label}</span>}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </>
  );
};

export default CopyButton;
