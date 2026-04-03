"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Download,
  FileText,
  Shield,
  Lock,
  Link2,
  UserCheck,
  Key,
  Server,
  ClipboardList,
  Building2,
  Heart,
  Globe,
  CheckSquare,
  Fingerprint,
} from "lucide-react";

const sections = [
  {
    number: 1,
    title: "Identity Verification",
    icon: Fingerprint,
    summary:
      "Ensures that all registrants are who they claim to be, preventing fraudulent document filings.",
    details: [
      "NIST IAL2 identity proofing requirements",
      "Liveness detection to prevent spoofing",
      "Multi-factor authentication at AAL2 or higher",
      "Knowledge-based verification as a supplemental layer",
      "Identity proofing audit trail retention",
    ],
  },
  {
    number: 2,
    title: "Document Registration",
    icon: FileText,
    summary:
      "Defines how estate documents are ingested, hashed, classified, and versioned within a registry.",
    details: [
      "SHA-256 cryptographic hashing for tamper detection",
      "Full version history with immutable audit records",
      "Support for 30+ estate document types",
      "Metadata schema for document classification",
      "Original document preservation requirements",
    ],
  },
  {
    number: 3,
    title: "Encryption & Data Security",
    icon: Lock,
    summary:
      "Mandates encryption at rest and in transit, along with rigorous infrastructure security controls.",
    details: [
      "AES-256 encryption for data at rest",
      "TLS 1.3 required for all data in transit",
      "Hardware Security Modules (HSM) for key management",
      "SOC 2 Type II compliance requirement",
      "Annual penetration testing and vulnerability assessments",
    ],
  },
  {
    number: 4,
    title: "Blockchain Verification",
    icon: Link2,
    summary:
      "Anchors document hashes to public blockchains, enabling independent, tamper-proof verification by anyone.",
    details: [
      "Ethereum and Polygon blockchain anchoring support",
      "Independent verifiability without registry cooperation",
      "Merkle tree batch anchoring for efficiency",
      "Timestamped proof-of-existence records",
      "Multi-chain support for redundancy",
    ],
  },
  {
    number: 5,
    title: "Attorney Attestation",
    icon: UserCheck,
    summary:
      "Enables attorneys to digitally sign and attest to documents, with bar association verification.",
    details: [
      "PKI-based digital signatures",
      "Bar association membership verification",
      "X.509 certificate infrastructure",
      "Timestamped attestation records",
      "Revocation and re-attestation workflows",
    ],
  },
  {
    number: 6,
    title: "Access Control & Release",
    icon: Key,
    summary:
      "Governs who can access documents and under what trigger conditions documents are released.",
    details: [
      "Role-based access control (RBAC)",
      "Trigger events: death, incapacity, emergency, court order",
      "Granular permission settings per document",
      "Time-limited access grants",
      "Emergency access protocols with audit logging",
    ],
  },
  {
    number: 7,
    title: "Institutional API",
    icon: Server,
    summary:
      "Specifies how institutions -- courts, hospitals, banks -- connect to registries programmatically.",
    details: [
      "RESTful API architecture",
      "Mutual TLS (mTLS) for institutional authentication",
      "OAuth 2.0 authorization framework",
      "HL7 FHIR R4 compatibility for healthcare",
      "Standardized error codes and response formats",
    ],
  },
  {
    number: 8,
    title: "Audit Trail",
    icon: ClipboardList,
    summary:
      "Requires comprehensive, append-only logging of every action taken within the registry.",
    details: [
      "Append-only audit log architecture",
      "Minimum 7-year retention period",
      "Blockchain anchoring of audit records",
      "Tamper-evident log integrity checks",
      "Exportable audit reports for legal proceedings",
    ],
  },
  {
    number: 9,
    title: "Physical Vault (Optional)",
    icon: Building2,
    summary:
      "An optional standard for registries that also store physical original documents.",
    details: [
      "Bonded storage facility requirements",
      "Chain of custody documentation",
      "NIST SP 800-88 media sanitization standards",
      "Climate-controlled storage specifications",
      "Disaster recovery and geographic redundancy",
    ],
  },
  {
    number: 10,
    title: "Consumer Protections",
    icon: Heart,
    summary:
      "Safeguards that ensure consumers retain control over their data and can move between providers.",
    details: [
      "Full data portability between compliant registries",
      "Deletion grace period upon account termination",
      "Strict prohibition on selling consumer data",
      "Plain-language terms of service requirements",
      "Dispute resolution and complaint procedures",
    ],
  },
  {
    number: 11,
    title: "Interstate Recognition",
    icon: Globe,
    summary:
      "Ensures documents registered in one state are recognized and accessible across jurisdictions.",
    details: [
      "Cross-jurisdiction recognition framework",
      "Multi-state governance participation model",
      "Reciprocity agreements between adopting states",
      "Uniform data format for interstate transfers",
      "Conflict-of-law resolution guidelines",
    ],
  },
  {
    number: 12,
    title: "Compliance & Certification",
    icon: CheckSquare,
    summary:
      "Describes how registries achieve and maintain certification against the EDRS standard.",
    details: [
      "Self-assessment checklist for initial readiness",
      "Third-party audit by accredited assessors",
      "Biennial recertification requirement",
      "Public registry of certified providers",
      "Corrective action and remediation processes",
    ],
  },
];

const annexes = [
  {
    title: "Annex A: Document Type Taxonomy",
    description:
      "A comprehensive classification of 30+ estate document types supported by the standard, including wills, trusts, powers of attorney, advance directives, beneficiary designations, and more.",
  },
  {
    title: "Annex B: API Schema Summary",
    description:
      "A summary of the institutional API endpoints, request/response schemas, authentication flows, and error codes defined in the EDRS standard.",
  },
  {
    title: "Annex C: Self-Assessment Checklist",
    description:
      "A detailed checklist that registry providers can use to evaluate their readiness for EDRS certification prior to engaging a third-party auditor.",
  },
];

function AccordionItem({
  section,
}: {
  section: (typeof sections)[number];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-[#b8860b]/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#f8f9fc] transition-colors"
        aria-expanded={isOpen}
      >
        <div className="w-10 h-10 rounded-lg bg-[#0f2b5b] flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[#b8860b]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#b8860b]">
              Section {section.number}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[#0f2b5b]">
            {section.title}
          </h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <div className="ml-14">
            <p className="text-gray-600 mb-4">{section.summary}</p>
            <ul className="space-y-2">
              {section.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#b8860b] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StandardPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0f2b5b] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#b8860b] text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Open Standard
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Estate Document Registry Standard
          </h1>
          <p className="text-xl text-blue-100 mb-4">Version 1.0</p>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            A comprehensive, open specification for secure estate document
            registries. Free to implement, free to audit, designed to protect
            families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs/EDRS-Standard-v1.0.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b8860b] text-white font-semibold rounded-lg hover:bg-[#a07608] transition-colors"
            >
              <Download className="w-5 h-5" />
              Download EDRS-1.0 (PDF)
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              About UEDRA
            </Link>
          </div>
        </div>
      </section>

      {/* Overview stats */}
      <section className="py-12 px-6 bg-[#f8f9fc] border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-[#0f2b5b]">12</div>
            <div className="text-sm text-gray-600 mt-1">Core Sections</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0f2b5b]">30+</div>
            <div className="text-sm text-gray-600 mt-1">Document Types</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0f2b5b]">3</div>
            <div className="text-sm text-gray-600 mt-1">Annexes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0f2b5b]">Free</div>
            <div className="text-sm text-gray-600 mt-1">& Open Source</div>
          </div>
        </div>
      </section>

      {/* Standard Sections */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2b5b] text-center mb-4">
            Standard Overview
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            The EDRS standard is organized into 12 sections, each addressing a
            critical aspect of secure estate document registry operation. Click
            any section to explore its requirements.
          </p>
          <div className="space-y-3">
            {sections.map((section) => (
              <AccordionItem key={section.number} section={section} />
            ))}
          </div>
        </div>
      </section>

      {/* Annexes */}
      <section className="py-20 px-6 bg-[#f8f9fc]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2b5b] text-center mb-12">
            Annexes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {annexes.map((annex) => (
              <div
                key={annex.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-[#b8860b]/10 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-[#b8860b]" />
                </div>
                <h3 className="text-base font-semibold text-[#0f2b5b] mb-2">
                  {annex.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {annex.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-16 px-6 bg-[#0f2b5b]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Download the Full Standard
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            The complete EDRS-1.0 specification is available as a free PDF.
            Implement it, audit it, improve it -- no licensing fees, no
            restrictions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs/EDRS-Standard-v1.0.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b8860b] text-white font-semibold rounded-lg hover:bg-[#a07608] transition-colors"
            >
              <Download className="w-5 h-5" />
              Download EDRS-1.0 (PDF)
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Learn About UEDRA
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
