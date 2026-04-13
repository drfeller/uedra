import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Search,
  Shield,
  ShieldCheck,
  Building2,
  Heart,
  Scale,
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  FileText,
  Lock,
  Bell,
  BarChart3,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Institutions — UEDRA',
  description:
    'Verify estate documents in seconds. Banks, hospitals, and attorneys can look up registered estate documents in the UEDRA National Registry.',
};

export default function ForInstitutionsPage() {
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
            <Building2 className="h-3.5 w-3.5" />
            For Institutions
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Verify Estate Documents
            <br />
            in Seconds
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/80">
            When a patient arrives incapacitated, when a client claims POA authority,
            when an estate enters probate — verify the documents are real and current.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4991a]"
            >
              <Search className="h-4 w-4" />
              Start Verifying Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us About API Access
            </Link>
          </div>
        </div>
      </section>

      {/* Use cases — 3 institution types */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Who This Is For
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b]">
            Built for the Institutions That Need It Most
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <InstitutionCard
              icon={Building2}
              title="Banks & Financial Institutions"
              description="Verify Power of Attorney and trust documents before processing transactions. Confirm the person claiming authority actually has it."
              useCases={[
                'POA verification for account access',
                'Trust document confirmation',
                'Estate account setup',
                'Fiduciary authority validation',
              ]}
            />
            <InstitutionCard
              icon={Heart}
              title="Hospitals & Healthcare"
              description="Find healthcare directives and HIPAA authorizations for incapacitated patients. Know who has medical decision-making authority."
              useCases={[
                'Advance directive lookup',
                'Healthcare POA verification',
                'HIPAA authorization check',
                'Emergency contact identification',
              ]}
            />
            <InstitutionCard
              icon={Scale}
              title="Attorneys & Law Firms"
              description="Verify wills and trusts during probate proceedings. Confirm whether a more recent version exists before filing."
              useCases={[
                'Will existence verification',
                'Trust registry search',
                'Document currency confirmation',
                'Cross-state document lookup',
              ]}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b]">Four Simple Steps</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number={1}
              icon={Search}
              title="Search"
              description="Enter a registry number or search by name, date of birth, and state."
            />
            <StepCard
              number={2}
              icon={FileText}
              title="View Results"
              description="See document type, status, storage location, and contact information."
            />
            <StepCard
              number={3}
              icon={Phone}
              title="Contact"
              description="Reach the right person to retrieve the actual document."
            />
            <StepCard
              number={4}
              icon={CheckCircle2}
              title="Verify"
              description="Confirm the document is current and matches what was presented to you."
            />
          </div>
        </div>
      </section>

      {/* Verification tiers */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Verification Tiers
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b]">
            Understanding What You See
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            Every document in the registry has a verification tier that tells you how much
            you can trust the record.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <Shield className="h-5 w-5 text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Self-Registered</h3>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                The registrant stated this document exists and provided storage and
                contact information. UEDRA has not verified the document itself.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gray-400" />
                  Document existence declared
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gray-400" />
                  Storage location provided
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gray-400" />
                  Contact person listed
                </li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-[#b8860b]/30 bg-[#b8860b]/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b8860b]/20">
                  <ShieldCheck className="h-5 w-5 text-[#b8860b]" />
                </div>
                <h3 className="text-lg font-bold text-[#0f2b5b]">Certified Vault</h3>
              </div>
              <p className="mb-4 text-sm text-gray-700">
                This document is stored in a UEDRA-certified registry. The document&apos;s
                existence, integrity, and chain of custody are verified.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#b8860b]" />
                  Document verified and encrypted
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#b8860b]" />
                  Chain of custody tracked
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#b8860b]" />
                  Instant retrieval by authorized parties
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Coming Soon
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b]">
            Power User Features
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            We&apos;re building institutional tools for high-volume users.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <ComingSoonCard
              icon={BarChart3}
              title="Bulk Lookup API"
              description="Integrate document verification directly into your systems with our REST API."
            />
            <ComingSoonCard
              icon={Bell}
              title="Alert Subscriptions"
              description="Get notified when a document status changes — POA revocations, will updates, and more."
            />
            <ComingSoonCard
              icon={Lock}
              title="Audit Trail"
              description="Compliance-ready logs of every lookup your institution performs."
            />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#b8860b] transition hover:text-[#d4991a]"
            >
              Contact us about early access
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f2b5b] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Verify?</h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-200">
            Search the UEDRA National Registry for free. No account required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4991a]"
            >
              <Search className="h-4 w-4" />
              Start Verifying Now
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Register Documents (Free)
            </Link>
          </div>
          <p className="mt-8 text-sm text-blue-300/60">
            For comprehensive, verified access: Certified Registrars like{' '}
            <a
              href="https://verauth.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#b8860b] transition hover:text-[#d4991a]"
            >
              VerAuth
            </a>{' '}
            offer encrypted vault storage and instant document delivery to authorized
            institutions.
          </p>
        </div>
      </section>
    </>
  );
}

// --- Local components ---

function InstitutionCard({
  icon: Icon,
  title,
  description,
  useCases,
}: {
  icon: typeof Building2;
  title: string;
  description: string;
  useCases: string[];
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f2b5b]/10">
        <Icon className="h-6 w-6 text-[#0f2b5b]" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-[#0f2b5b]">{title}</h3>
      <p className="mb-4 text-sm text-gray-600">{description}</p>
      <ul className="space-y-2">
        {useCases.map((uc) => (
          <li key={uc} className="flex items-start gap-2 text-sm text-gray-500">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
            {uc}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number;
  icon: typeof Search;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f2b5b] text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
        Step {number}
      </div>
      <h3 className="mb-2 text-lg font-bold text-[#0f2b5b]">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function ComingSoonCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof BarChart3;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f2b5b]/10">
        <Icon className="h-5 w-5 text-[#0f2b5b]" />
      </div>
      <div className="mb-1 flex items-center gap-2">
        <h3 className="font-bold text-[#0f2b5b]">{title}</h3>
        <Clock className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
