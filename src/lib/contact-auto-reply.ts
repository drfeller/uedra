/**
 * Auto-reply templates for UEDRA contact form submissions.
 *
 * The subject dropdown values (from `src/app/contact/page.tsx`) are used as
 * keys here. Each template returns a short acknowledgment tailored to the
 * topic so submitters hear something useful within seconds of submitting,
 * instead of waiting for a human reply.
 *
 * Tone: warm, factual, no fluff. Signed by "UEDRA" — these are automated.
 */

export type ContactSubject =
  | 'General Inquiry'
  | 'Standards & Technical'
  | 'Certification'
  | 'Legislative Affairs'
  | 'Media & Press'
  | 'Partnership Opportunity'
  | 'Other';

const GENERIC_INTRO = (name: string) =>
  `Hi ${name},\n\nThanks for reaching out to UEDRA. We received your message and a human will respond personally within 1–2 business days.`;

const GENERIC_OUTRO =
  `In the meantime, you may find answers in our published materials at https://uedra.org.\n\n— The UEDRA Team\nUniversal Estate Document Registry Association\nhttps://uedra.org`;

const TEMPLATES: Record<ContactSubject, (name: string) => string> = {
  'General Inquiry': (name) =>
    `${GENERIC_INTRO(name)}

We answer general questions about UEDRA, the EDRS-1.0 standard, and how estate document registries fit into modern estate planning.

${GENERIC_OUTRO}`,

  'Standards & Technical': (name) =>
    `${GENERIC_INTRO(name)}

For standards and technical questions, the authoritative reference is the EDRS-1.0 specification, available for download at https://uedra.org/standard. It covers identity verification, document registration, encryption, blockchain verification, and the Institutional Verification API in detail.

If your question is about a specific section or conformance requirement, including the section number in your follow-up helps us route it faster.

${GENERIC_OUTRO}`,

  Certification: (name) =>
    `${GENERIC_INTRO(name)}

If you're a registry provider interested in EDRS-1.0 certification, you can start the self-assessment and application at https://uedra.org/certification. The process covers 12 standard sections with 44 assessment items; providers scoring ≥80% with all mandatory items passed receive automatic approval.

If you're a consumer wondering whether a specific provider is certified, you can verify any certificate at https://uedra.org/certification/verify.

${GENERIC_OUTRO}`,

  'Legislative Affairs': (name) =>
    `${GENERIC_INTRO(name)}

UEDRA works with legislators and state-level policy staff on the Uniform Estate Document Registry Act (UEDRA) — a model statute that gives EDRS-1.0 a legislative home. You can review the latest proposal and follow legislative activity at https://uedra.org/legislative-tracker.

If you represent a state legislator's office or a bar association, please mention your jurisdiction in your message so we can connect you with the right team member.

${GENERIC_OUTRO}`,

  'Media & Press': (name) =>
    `${GENERIC_INTRO(name)}

For press inquiries, we typically respond within one business day. If you're on deadline, please note that in your next message and we'll prioritize accordingly. Background materials, the EDRS-1.0 standard, and executive bios are available at https://uedra.org/about.

${GENERIC_OUTRO}`,

  'Partnership Opportunity': (name) =>
    `${GENERIC_INTRO(name)}

Thanks for your interest in partnering with UEDRA. We work with registry providers, technology integrators, estate planning attorneys, and institutional stakeholders (banks, healthcare systems, courts) on standards adoption and ecosystem development.

To help us route your inquiry, please note in your follow-up which category best describes your organization.

${GENERIC_OUTRO}`,

  Other: (name) =>
    `${GENERIC_INTRO(name)}

${GENERIC_OUTRO}`,
};

/**
 * Returns an auto-reply body for a given subject. Unknown subjects fall back
 * to the generic template so we never fail to send an acknowledgment.
 */
export function getAutoReplyBody(subject: string, name: string): string {
  const template = TEMPLATES[subject as ContactSubject] || TEMPLATES.Other;
  return template(name);
}

export function getAutoReplySubject(originalSubject: string): string {
  return `Re: ${originalSubject} — UEDRA`;
}
