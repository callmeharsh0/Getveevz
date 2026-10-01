/**
 * Smart Email helpers for GetVeevz.
 * - Mobile Phones (iOS / Android): Triggers native mailto: to open installed Gmail / Mail app.
 * - Desktop: Opens Gmail Web directly in a new tab with pre-filled fields.
 */

export const DEFAULT_EMAIL = "team@getveevz.com";

export interface EmailParams {
  to?: string;
  subject?: string;
  body?: string;
}

/**
 * Checks if current device is a mobile or tablet device.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const ua = navigator.userAgent || navigator.vendor || "";
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

/**
 * Builds a standard mailto: link for native mail apps (iOS Mail, Android Gmail, etc.).
 */
export function getMailtoUrl({
  to = DEFAULT_EMAIL,
  subject = "",
  body = "",
}: EmailParams = {}): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);

  const qs = params.toString().replace(/\+/g, "%20");
  return `mailto:${to}${qs ? `?${qs}` : ""}`;
}

/**
 * Builds a direct Gmail web compose URL with pre-filled recipient, subject, and body.
 */
export function getGmailComposeUrl({
  to = DEFAULT_EMAIL,
  subject = "",
  body = "",
}: EmailParams = {}): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
  });

  if (subject) params.set("su", subject);
  if (body) params.set("body", body);

  return `https://mail.google.com/mail/?${params.toString()}`;
}

/**
 * Returns the optimal email URL based on device type:
 * - Mobile: mailto: to open native app
 * - Desktop: Gmail web compose URL
 */
export function getSmartEmailUrl({
  to = DEFAULT_EMAIL,
  subject = "",
  body = "",
}: EmailParams = {}): string {
  if (isMobileDevice()) {
    return getMailtoUrl({ to, subject, body });
  }
  return getGmailComposeUrl({ to, subject, body });
}

/**
 * Returns href, target, and rel attributes for anchor tags.
 * On mobile, no target="_blank" is used to prevent blank tabs when launching native apps.
 */
export function getSmartEmailLinkProps({
  to = DEFAULT_EMAIL,
  subject = "",
  body = "",
}: EmailParams = {}) {
  const isMobile = isMobileDevice();
  if (isMobile) {
    return {
      href: getMailtoUrl({ to, subject, body }),
      target: undefined,
      rel: undefined,
    };
  }
  return {
    href: getGmailComposeUrl({ to, subject, body }),
    target: "_blank",
    rel: "noopener noreferrer",
  };
}

/**
 * Programmatically opens the smart email handler:
 * - On Mobile: Sets window.location.href to mailto: (opens Gmail/Mail app directly).
 * - On Desktop: Opens Gmail compose in a new tab.
 */
export function openSmartEmail({
  to = DEFAULT_EMAIL,
  subject = "",
  body = "",
}: EmailParams = {}) {
  if (isMobileDevice()) {
    window.location.href = getMailtoUrl({ to, subject, body });
  } else {
    window.open(getGmailComposeUrl({ to, subject, body }), "_blank", "noopener,noreferrer");
  }
}
