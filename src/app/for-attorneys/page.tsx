import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Shield,
  Scale,
  FileCheck,
  Lock,
  KeyRound,
  BadgeCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Code2,
  Fingerprint,
  ClipboardCheck,
  GitBranch,
  Building2,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Attorneys',
  description:
    'Learn how the EDRS standard streamlines estate document registration with blockchain-verified attestation workflows, bar verification, and standardized APIs for law firms.',
};

export default function ForAttorneysPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f2b5b] py-28 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 40px, white 40px, white 41px)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest">
            <Scale className="h-3.5 w-3.5" />
            For Attorneys
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Professional Trust,
            <br />
            Client Protection
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/80">
            The EDRS standard gives estate planning attorneys a trusted,
            standardized framework for registering client documents with
            blockchain-verified integrity, bar-linked attestation, and
            institutional interoperability.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4991a]"
            >
              <Users className="h-4 w-4" />
              Join the Standards Council
            </Link>
            <Link
              href="/certification"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Get Certified
            </Link>
          </div>
        </div>
      </section>

      {/* Attestation Workflow */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Attestation Workflow
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            Attorney Attestation Under EDRS
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            EDRS establishes a rigorous, cryptographically verifiable
            attestation framework that ties each registration to your bar
            credentials and professional identity. This is not just document
            storage &mdash; it is professional attestation with an immutable
            audit trail.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <WorkflowCard
              step="01"
              icon={Fingerprint}
              title="PKI Digital Signatures"
              description="Each attestation is cryptographically signed using Public Key Infrastructure (PKI) certificates tied to your verified professional identity. Signatures are non-repudiable and independently verifiable by any relying party."
            />
            <WorkflowCard
              step="02"
              icon={BadgeCheck}
              title="Bar Verification"
              description="EDRS requires registries to verify your state bar membership and good standing before issuing attestation credentials. Your bar number and jurisdiction are embedded in every attestation you sign."
            />
            <WorkflowCard
              step="03"
              icon={ClipboardCheck}
              title="Five Attestation Types"
              description="The standard defines five distinct attestation categories: Witnessing of Execution, Preparation of Document, Notarization, Legal Review and Opinion, and Identity Verification of the Principal."
            />
          </div>

          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8">
            <h3 className="text-lg font-semibold text-[#0f2b5b]">
              The Five Attestation Types
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { label: 'Witnessing', desc: 'Execution observed' },
                { label: 'Preparation', desc: 'Document drafted' },
                { label: 'Notarization', desc: 'Identity confirmed' },
                { label: 'Legal Review', desc: 'Opinion rendered' },
                { label: 'Identity Verification', desc: 'Principal verified' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-gray-100 bg-[#f8f9fc] p-4 text-center"
                >
                  <div className="text-sm font-semibold text-[#0f2b5b]">
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Benefits
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            Why Attorneys Choose EDRS
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <BenefitCard
              icon={FileCheck}
              title="Standardized Registration"
              description="A single, consistent workflow for registering every type of estate document. No more ad hoc storage arrangements, lost originals, or client confusion about where documents are kept. EDRS provides a uniform process that clients and institutions both trust."
            />
            <BenefitCard
              icon={GitBranch}
              title="Version Control"
              description="Every amendment, restatement, and revocation is tracked with full version history. When a will is updated, the registry maintains a complete chain of custody showing exactly when each version was registered, by whom, and which is current."
            />
            <BenefitCard
              icon={Building2}
              title="Institutional Verification"
              description="Banks, healthcare providers, and courts can independently verify the authenticity and currency of documents you have registered, without contacting your office. This reduces friction for your clients and strengthens the reliance parties can place on your work."
            />
            <BenefitCard
              icon={ShieldCheck}
              title="Reduced Malpractice Risk"
              description="Blockchain-verified registration creates an immutable record that a document was properly executed, witnessed, and delivered. The audit trail protects you by providing clear evidence of professional diligence in the event of a dispute."
            />
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="bg-[#0f2b5b] py-24 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Integration
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Working with EDRS-Compliant Registries
          </h2>
          <p className="mt-4 max-w-3xl text-blue-100/70">
            EDRS is designed to integrate into your existing practice workflow.
            Whether you work with a single registry provider or need
            programmatic access across multiple systems, the standard provides
            clear integration paths.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <Lock className="h-10 w-10 text-[#b8860b]" />
              <h3 className="mt-4 text-xl font-semibold">
                Registry Provider Workflow
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-blue-100/70">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Register with an EDRS-compliant provider using your bar credentials
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Upload documents through secure, encrypted channels
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Apply digital attestation with your PKI certificate
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Manage client access permissions and emergency contacts
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Track version history and receive change notifications
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <Code2 className="h-10 w-10 text-[#b8860b]" />
              <h3 className="mt-4 text-xl font-semibold">
                API Access for Law Firms
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-blue-100/70">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  RESTful APIs with OAuth 2.0 authentication
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Batch registration for high-volume practices
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Webhook notifications for document status changes
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Integration with practice management systems (Clio, MyCase, etc.)
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Standardized JSON/XML schemas for all document types
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CLE Resources */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Education
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            CLE Resources
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            UEDRA is developing continuing legal education materials to help
            attorneys understand the EDRS standard, its implications for estate
            planning practice, and how to advise clients on document
            registration.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <CLECard
              icon={BookOpen}
              title="EDRS Overview for Estate Planners"
              status="Coming Soon"
              description="A comprehensive introduction to the Estate Document Registry Standard, covering architecture, security, and attestation workflows."
            />
            <CLECard
              icon={KeyRound}
              title="Digital Attestation in Practice"
              status="Coming Soon"
              description="Practical guidance on implementing PKI-based attestation in your estate planning workflow, including setup and best practices."
            />
            <CLECard
              icon={GraduationCap}
              title="Ethics of Document Registration"
              status="Coming Soon"
              description="Ethical considerations for attorneys advising clients on estate document registration, including duties of competence and confidentiality."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Scale className="mx-auto h-12 w-12 text-[#0f2b5b]" />
          <h2 className="mt-6 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            Shape the Future of Estate Planning
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Join the UEDRA Standards Council to contribute to the development
            of the EDRS standard, participate in public comment periods, and
            help define the attestation frameworks that will protect your
            clients for decades to come.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#0f2b5b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3d7a]"
            >
              <Users className="h-4 w-4" />
              Join the Standards Council
            </Link>
            <Link
              href="/certification"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d4991a]"
            >
              <BadgeCheck className="h-4 w-4" />
              Get Certified
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Local Components                                                   */
/* ------------------------------------------------------------------ */

function WorkflowCard({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: string;
  icon: typeof Shield;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f2b5b] text-xs font-bold text-white">
          {step}
        </span>
        <Icon className="h-6 w-6 text-[#b8860b]" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#0f2b5b]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-6 rounded-xl border border-gray-200 bg-[#f8f9fc] p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0f2b5b]">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#0f2b5b]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function CLECard({
  icon: Icon,
  title,
  status,
  description,
}: {
  icon: typeof Shield;
  title: string;
  status: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Icon className="h-8 w-8 text-[#0f2b5b]" />
        <span className="rounded-full bg-[#b8860b]/10 px-3 py-1 text-xs font-semibold text-[#b8860b]">
          {status}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#0f2b5b]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
}
