/**
 * UEDRA Certification Evaluation Engine
 * Rule-based scoring against EDRS-1.0 standard — NOT AI, for auditability.
 */

export interface SelfAssessmentSection {
  sectionId: string;
  sectionName: string;
  items: SelfAssessmentItem[];
}

export interface SelfAssessmentItem {
  id: string;
  question: string;
  answer: 'yes' | 'partial' | 'no';
  mandatory: boolean;
}

export interface EvaluationResult {
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  mandatoryPassed: boolean;
  status: 'approved' | 'review' | 'denied';
  failedItems: string[];
  failedMandatory: string[];
  recommendations: string[];
}

// The 12 EDRS-1.0 sections with their assessment items
export const EDRS_SECTIONS: SelfAssessmentSection[] = [
  {
    sectionId: 'identity-verification',
    sectionName: 'Identity Verification',
    items: [
      { id: 'iv-1', question: 'Multi-factor identity verification for all document registrations', answer: 'no', mandatory: true },
      { id: 'iv-2', question: 'Government-issued ID verification capability', answer: 'no', mandatory: true },
      { id: 'iv-3', question: 'Biometric verification (face match or fingerprint)', answer: 'no', mandatory: false },
      { id: 'iv-4', question: 'Identity re-verification for document modifications', answer: 'no', mandatory: true },
    ],
  },
  {
    sectionId: 'document-registration',
    sectionName: 'Document Registration',
    items: [
      { id: 'dr-1', question: 'Unique document identifiers for all registered documents', answer: 'no', mandatory: true },
      { id: 'dr-2', question: 'Document versioning with complete version history', answer: 'no', mandatory: true },
      { id: 'dr-3', question: 'Support for 30+ estate document types', answer: 'no', mandatory: false },
      { id: 'dr-4', question: 'Document status lifecycle management (draft → active → revoked)', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'encryption',
    sectionName: 'Encryption & Data Protection',
    items: [
      { id: 'enc-1', question: 'AES-256 encryption at rest for all documents', answer: 'no', mandatory: true },
      { id: 'enc-2', question: 'TLS 1.2+ encryption in transit', answer: 'no', mandatory: true },
      { id: 'enc-3', question: 'Key management system (KMS) for encryption keys', answer: 'no', mandatory: false },
      { id: 'enc-4', question: 'Client-side encryption option available', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'blockchain',
    sectionName: 'Blockchain Verification',
    items: [
      { id: 'bc-1', question: 'Document hash attestation on a public blockchain', answer: 'no', mandatory: false },
      { id: 'bc-2', question: 'Tamper-evident proof of document existence and timestamp', answer: 'no', mandatory: false },
      { id: 'bc-3', question: 'Public verification of document authenticity via hash', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'attorney-attestation',
    sectionName: 'Attorney Attestation',
    items: [
      { id: 'aa-1', question: 'Attorney attestation workflow for document modifications', answer: 'no', mandatory: false },
      { id: 'aa-2', question: 'Bar verification for attesting attorneys', answer: 'no', mandatory: false },
      { id: 'aa-3', question: 'Digital signature capture for attestations', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'access-control',
    sectionName: 'Access Control',
    items: [
      { id: 'ac-1', question: 'Role-based access control (RBAC)', answer: 'no', mandatory: true },
      { id: 'ac-2', question: 'Granular permission levels (view, download, modify)', answer: 'no', mandatory: true },
      { id: 'ac-3', question: 'Emergency access designation with conditions', answer: 'no', mandatory: false },
      { id: 'ac-4', question: 'Access grant expiration and revocation', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'institutional-api',
    sectionName: 'Institutional API',
    items: [
      { id: 'api-1', question: 'RESTful API for institutional verification queries', answer: 'no', mandatory: false },
      { id: 'api-2', question: 'API authentication and rate limiting', answer: 'no', mandatory: false },
      { id: 'api-3', question: 'Document existence and status verification endpoints', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'audit-trail',
    sectionName: 'Audit Trail',
    items: [
      { id: 'at-1', question: 'Immutable audit log of all document actions', answer: 'no', mandatory: true },
      { id: 'at-2', question: 'Tamper-evident audit trail (hash-chaining or similar)', answer: 'no', mandatory: true },
      { id: 'at-3', question: 'Audit trail includes IP address, timestamp, user agent', answer: 'no', mandatory: false },
      { id: 'at-4', question: 'Audit trail queryable by authorized users', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'physical-vault',
    sectionName: 'Physical Vault (Optional)',
    items: [
      { id: 'pv-1', question: 'Physical document storage option available', answer: 'no', mandatory: false },
      { id: 'pv-2', question: 'Chain of custody tracking for physical documents', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'consumer-protections',
    sectionName: 'Consumer Protections',
    items: [
      { id: 'cp-1', question: 'Data portability — users can export all their data', answer: 'no', mandatory: true },
      { id: 'cp-2', question: 'Account deletion with 30-day grace period', answer: 'no', mandatory: false },
      { id: 'cp-3', question: 'Clear terms of service and privacy policy', answer: 'no', mandatory: true },
      { id: 'cp-4', question: 'Notification of material changes to service', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'interstate-recognition',
    sectionName: 'Interstate Recognition',
    items: [
      { id: 'ir-1', question: 'Documents accessible from any US state', answer: 'no', mandatory: false },
      { id: 'ir-2', question: 'Compliance with UEEPDA where adopted', answer: 'no', mandatory: false },
      { id: 'ir-3', question: 'Multi-jurisdictional document support', answer: 'no', mandatory: false },
    ],
  },
  {
    sectionId: 'compliance',
    sectionName: 'Compliance & Security',
    items: [
      { id: 'co-1', question: 'Regular security assessments or penetration testing', answer: 'no', mandatory: false },
      { id: 'co-2', question: 'Incident response plan documented', answer: 'no', mandatory: false },
      { id: 'co-3', question: 'SOC 2 or equivalent certification (or plan to obtain)', answer: 'no', mandatory: false },
      { id: 'co-4', question: 'GDPR/CCPA compliance for user data', answer: 'no', mandatory: false },
    ],
  },
];

/**
 * Evaluate a certification application against EDRS-1.0 standards.
 * Rule-based — not AI — for consistency and auditability.
 */
export function evaluateCertification(
  sections: SelfAssessmentSection[],
): EvaluationResult {
  let score = 0;
  let maxScore = 0;
  const failedItems: string[] = [];
  const failedMandatory: string[] = [];
  const recommendations: string[] = [];

  for (const section of sections) {
    for (const item of section.items) {
      maxScore += 1;

      if (item.answer === 'yes') {
        score += 1;
      } else if (item.answer === 'partial') {
        score += 0.5;
        if (item.mandatory) {
          failedMandatory.push(`${section.sectionName}: ${item.question} (partial — must be fully implemented)`);
        }
      } else {
        failedItems.push(`${section.sectionName}: ${item.question}`);
        if (item.mandatory) {
          failedMandatory.push(`${section.sectionName}: ${item.question}`);
        }
      }
    }
  }

  const percentage = Math.round((score / maxScore) * 100);
  const mandatoryPassed = failedMandatory.length === 0;

  // Decision logic
  let status: 'approved' | 'review' | 'denied';
  if (percentage >= 80 && mandatoryPassed) {
    status = 'approved';
  } else if (percentage >= 70) {
    status = 'review';
    recommendations.push('Your application will be reviewed by the UEDRA Standards Council.');
    if (!mandatoryPassed) {
      recommendations.push('Mandatory items must be fully implemented before certification can be granted.');
    }
  } else {
    status = 'denied';
    recommendations.push('We recommend addressing the failed items and reapplying.');
  }

  // Add specific recommendations
  if (failedItems.length > 0 && failedItems.length <= 5) {
    recommendations.push(`Focus on: ${failedItems.slice(0, 3).join('; ')}`);
  }

  return {
    score,
    maxScore,
    percentage,
    passed: status === 'approved',
    mandatoryPassed,
    status,
    failedItems,
    failedMandatory,
    recommendations,
  };
}

/**
 * Generate a unique certificate number.
 */
export function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 9000) + 1000;
  return `UEDRA-CERT-${year}-${seq}`;
}
