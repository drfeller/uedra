import Link from 'next/link';
import {
  Shield,
  FileCheck,
  Lock,
  Scale,
  Users,
  Download,
  BookOpen,
  Landmark,
  Stethoscope,
  Banknote,
  Gavel,
  Heart,
  ArrowRight,
  Globe,
  Building2,
} from 'lucide-react';

export default function HomePage() {
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
            Open Standard &middot; Free &amp; Fair
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Protecting Families
            <br />
            Through Open Standards
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/80">
            UEDRA advocates for uniform legislation and publishes the Estate
            Document Registry Standard (EDRS) &mdash; the free, open technical
            baseline ensuring estate documents are secure, verifiable, and
            accessible when families need them most.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/standard"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4991a]"
            >
              <Download className="h-4 w-4" />
              Read the EDRS Standard
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Learn About UEDRA
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            The Problem
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            Estate Documents Are Unprotected
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <Card icon={Heart} title="Lost at the Worst Time">
              Wills, trusts, and advance directives are routinely lost, unfound,
              or inaccessible at the moment families need them most &mdash;
              during grief, crisis, or incapacity.
            </Card>
            <Card icon={Shield} title="Vulnerable to Fraud">
              Powers of attorney and estate documents have no verification
              infrastructure. Financial exploitation of the elderly through
              forged or revoked documents costs billions annually.
            </Card>
            <Card icon={Globe} title="No Interstate System">
              A will executed in one state is invisible in another. No uniform
              registration, verification, or recognition framework exists across
              jurisdictions.
            </Card>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            The Solution
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            A Free &amp; Fair Standard for Everyone
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            UEDRA publishes the EDRS &mdash; an open, freely available technical
            standard that any registry provider can implement. No licensing fees,
            no vendor lock-in, no barriers to entry.
          </p>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={Lock} title="Security" description="AES-256 encryption, blockchain verification, HSM key management" />
            <FeatureCard icon={FileCheck} title="Interoperability" description="Standardized APIs for healthcare, financial, and legal institutions" />
            <FeatureCard icon={Users} title="Consumer Protection" description="Data portability, fee transparency, mandatory business continuity" />
            <FeatureCard icon={Scale} title="Open Governance" description="Consensus-driven development, public comment, independent certification" />
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-[#0f2b5b] py-24 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Who We Serve
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Built for Every Stakeholder
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <AudienceCard icon={Heart} title="Families" href="/for-families">
              Know your estate documents are protected, verifiable, and
              accessible to the right people at the right time.
            </AudienceCard>
            <AudienceCard icon={Scale} title="Attorneys" href="/for-attorneys">
              Register client documents with blockchain-verified integrity and
              standardized attestation workflows.
            </AudienceCard>
            <AudienceCard icon={Landmark} title="Legislators" href="/for-legislators">
              Reference EDRS as the technical foundation for state or federal
              estate document registry legislation.
            </AudienceCard>
            <AudienceCard icon={Building2} title="Institutions" href="/standard">
              Healthcare, banks, and courts can verify documents through a
              standardized, trusted API.
            </AudienceCard>
          </div>
        </div>
      </section>

      {/* Legislative Momentum */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
                Legislative Momentum
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
                Model Legislation Ready for Adoption
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                UEDRA has developed a comprehensive proposal for the Uniform Law
                Commission to appoint a Study Committee on a Uniform Estate
                Planning Document Registry Act. The EDRS standard provides the
                technical foundation that makes legislation practical and
                enforceable.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/legislative-tracker"
                  className="inline-flex items-center gap-2 rounded-md bg-[#0f2b5b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a3d7a]"
                >
                  View Legislative Tracker
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/for-legislators"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-[#0f2b5b] transition hover:bg-gray-50"
                >
                  Info for Legislators
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-[#f8f9fc] p-8">
              <div className="grid grid-cols-2 gap-6">
                <Stat number="50" label="States Targeted" />
                <Stat number="16" label="UEEPDA Adopters" />
                <Stat number="46" label="States with POLST Registries" />
                <Stat number="12" label="EDRS Technical Sections" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Trust */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Institutional Trust
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            One Standard, Universal Verification
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <Card icon={Stethoscope} title="Healthcare">
              Verify advance directives and healthcare POAs in under 2 seconds.
              HL7 FHIR R4 integration for seamless EHR connectivity.
            </Card>
            <Card icon={Banknote} title="Financial">
              Confirm power of attorney authenticity and currency. Reduce elder
              fraud with blockchain-verified document hashes.
            </Card>
            <Card icon={Gavel} title="Legal &amp; Courts">
              Verify will existence and version history. Access immutable audit
              trails and determine authoritative document versions.
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-[#0f2b5b]" />
          <h2 className="mt-6 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            Get Involved
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            UEDRA is built through open, consensus-driven collaboration. Whether
            you are a family seeking protection, an attorney, a legislator, or a
            technologist &mdash; your voice matters.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#0f2b5b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3d7a]"
            >
              Contact Us
            </Link>
            <Link
              href="/standard"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d4991a]"
            >
              <Download className="h-4 w-4" />
              Download EDRS-1.0
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Card({ icon: Icon, title, children }: { icon: typeof Shield; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Icon className="h-8 w-8 text-[#0f2b5b]" />
      <h3 className="mt-4 text-lg font-semibold text-[#0f2b5b]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{children}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: typeof Shield; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f2f8]">
        <Icon className="h-6 w-6 text-[#0f2b5b]" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-[#0f2b5b]">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-gray-500">{description}</p>
    </div>
  );
}

function AudienceCard({ icon: Icon, title, href, children }: { icon: typeof Shield; title: string; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group rounded-xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
      <Icon className="h-8 w-8 text-[#b8860b]" />
      <h3 className="mt-4 text-lg font-semibold group-hover:text-[#b8860b] transition">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-blue-100/70">{children}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#b8860b]">
        Learn more <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-[#b8860b]">{number}</div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  );
}
