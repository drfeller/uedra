import Link from 'next/link';
import {
  FileText,
  Download,
  BookOpen,
  ExternalLink,
  FileSearch,
  GraduationCap,
  Scale,
  ArrowRight,
  Shield,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
};

interface Resource {
  title: string;
  description: string;
  type: string;
  href: string;
  external?: boolean;
}

const documents: Resource[] = [
  {
    title: 'EDRS-1.0 Standard',
    description:
      'The complete Estate Document Registry Standard version 1.0, defining requirements for document registration, verification, access control, and audit logging.',
    type: 'PDF',
    href: '#',
  },
  {
    title: 'UEDRA ULC Proposal',
    description:
      'Full text of the study committee proposal submitted to the Uniform Law Commission for a Uniform Estate Document Registry Act.',
    type: 'PDF',
    href: '#',
  },
  {
    title: 'EDRS Self-Assessment Checklist',
    description:
      'Annex C compliance checklist for registry providers seeking EDRS-1.0 certification. Covers all mandatory and recommended requirements.',
    type: 'PDF',
    href: '#',
  },
  {
    title: 'EDRS API Schema Summary',
    description:
      'Technical overview of the EDRS-1.0 API schema, including endpoint definitions, authentication flows, and data models.',
    type: 'PDF',
    href: '#',
  },
];

const research: Resource[] = [
  {
    title: 'ABA Commission on Law and Aging: Lost and Contested Wills',
    description:
      'American Bar Association research on the frequency and consequences of lost, contested, and fraudulently altered estate planning documents.',
    type: 'External',
    href: '#',
    external: true,
  },
  {
    title: 'GAO Report: Elder Fraud and Financial Exploitation',
    description:
      'Government Accountability Office findings on the scale and impact of elder financial exploitation, including power of attorney abuse.',
    type: 'External',
    href: '#',
    external: true,
  },
  {
    title: 'POLST Registry Studies: Lessons for Estate Documents',
    description:
      'Research on existing POLST (Physician Orders for Life-Sustaining Treatment) registries and their applicability to broader estate document registry models.',
    type: 'External',
    href: '#',
    external: true,
  },
  {
    title: 'Uniform Law Commission: UEEPDA Analysis',
    description:
      'Background materials on the Uniform Electronic Estate Planning Documents Act, adopted by 14 states and DC.',
    type: 'External',
    href: '#',
    external: true,
  },
];

const educational: Resource[] = [
  {
    title: 'Understanding Estate Document Registries',
    description:
      'A plain-language guide explaining what estate document registries are, why they matter, and how EDRS-1.0 establishes a standard for interoperability and security.',
    type: 'Guide',
    href: '#',
  },
  {
    title: 'EDRS Compliance Roadmap for Providers',
    description:
      'Step-by-step guide for existing and prospective registry providers to achieve EDRS-1.0 certification, from self-assessment through third-party audit.',
    type: 'Guide',
    href: '#',
  },
  {
    title: 'Legislative Brief: Why UEDRA Matters',
    description:
      'A concise briefing document for legislators and policy staff outlining the case for a uniform estate document registry act and its benefits for constituents.',
    type: 'Brief',
    href: '#',
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex gap-4 hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 mt-1">
        {resource.external ? (
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-purple-600" />
          </div>
        ) : resource.type === 'Guide' || resource.type === 'Brief' ? (
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-[#0f2b5b]/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#0f2b5b]" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-[#0f2b5b] text-lg">{resource.title}</h3>
            <p className="text-gray-600 mt-1 text-sm leading-relaxed">{resource.description}</p>
          </div>
        </div>
        <div className="mt-3">
          <Link
            href={resource.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b8860b] hover:text-[#9a7209] transition-colors"
          >
            {resource.external ? (
              <>
                View Resource <ExternalLink className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Download {resource.type}
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* Hero */}
      <section className="bg-[#0f2b5b] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[#b8860b]" />
            <h1 className="text-4xl font-bold">Resources</h1>
          </div>
          <p className="text-lg text-blue-200 max-w-3xl">
            Standards documents, research, and educational materials for legislators, registry
            providers, and estate planning professionals.
          </p>
        </div>
      </section>

      {/* Documents */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-[#0f2b5b]" />
          <h2 className="text-2xl font-bold text-[#0f2b5b]">Standards &amp; Documents</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {documents.map((r, i) => (
            <ResourceCard key={i} resource={r} />
          ))}
        </div>
      </section>

      {/* Research */}
      <section className="max-w-6xl mx-auto px-6 mt-14">
        <div className="flex items-center gap-3 mb-6">
          <FileSearch className="w-6 h-6 text-[#0f2b5b]" />
          <h2 className="text-2xl font-bold text-[#0f2b5b]">Research &amp; Reports</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {research.map((r, i) => (
            <ResourceCard key={i} resource={r} />
          ))}
        </div>
      </section>

      {/* Educational */}
      <section className="max-w-6xl mx-auto px-6 mt-14 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-6 h-6 text-[#0f2b5b]" />
          <h2 className="text-2xl font-bold text-[#0f2b5b]">Educational Materials</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {educational.map((r, i) => (
            <ResourceCard key={i} resource={r} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f2b5b] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Scale className="w-10 h-10 text-[#b8860b] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Need Something Specific?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            If you are a legislator, registry provider, or researcher looking for specific materials
            or data, our team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a7209] transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
