export const SITE_SUBMISSION_WEBHOOK_URL =
  "https://n8n.webwood.ai/webhook/gp-site-submission";

export type SiteSubmissionPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  source: string;
};
