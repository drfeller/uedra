import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Shield,
  Heart,
  AlertTriangle,
  Lock,
  Globe,
  FileCheck,
  Clock,
  BadgeCheck,
  Search,
  HelpCircle,
  ArrowRight,
  Download,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Users,
  FileWarning,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Families',
  description:
    'Learn how the Estate Document Registry Standard (EDRS) protects your family by keeping wills, trusts, and advance directives secure, verifiable, and accessible.',
};

export default function ForFamiliesPage() {
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
            <Heart className="h-3.5 w-3.5" />
            For Families
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Protection and Peace of Mind
            <br />
            for Your Family
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/80">
            Your estate documents &mdash; wills, trusts, powers of attorney, and
            advance directives &mdash; are among the most important legal
            instruments your family will ever need. The EDRS standard ensures
            they are secure, verifiable, and accessible when it matters most.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/certification"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4991a]"
            >
              <Search className="h-4 w-4" />
              Find a Compliant Provider
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Get in Touch
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
            What Happens When Estate Documents Fail
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Every year, families face devastating consequences because the
            estate planning system has no infrastructure for secure
            registration, verification, or access. The stories are painfully
            common.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <ProblemCard
              icon={FileWarning}
              title="Lost Wills and Trusts"
              description="A loved one passes away and no one can locate the will. The estate enters intestacy, assets are distributed by formula rather than wishes, and family disputes erupt over what the decedent actually wanted."
            />
            <ProblemCard
              icon={AlertTriangle}
              title="Inaccessible Directives During Emergencies"
              description="A medical emergency strikes and the advance directive is locked in a safe deposit box or filed in an attorney's office that is closed for the weekend. Critical end-of-life decisions are made without guidance."
            />
            <ProblemCard
              icon={Users}
              title="Power of Attorney Fraud"
              description="Financial exploitation of the elderly through forged, revoked, or outdated powers of attorney costs billions annually. There is no system for a bank or care facility to verify that a POA is genuine and current."
            />
            <ProblemCard
              icon={Globe}
              title="No Way to Verify Currency"
              description="A will was updated three times over two decades. After the testator's death, an outdated version surfaces first. Without a registry, there is no authoritative way to determine which version is current."
            />
          </div>
        </div>
      </section>

      {/* How EDRS Protects You */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            The Solution
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            How EDRS Protects Your Family
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            The Estate Document Registry Standard (EDRS) establishes the
            technical requirements that any registry must meet to ensure your
            documents are truly protected. Here is what that means for you.
          </p>
          <div className="mt-14 space-y-8">
            <ProtectionRow
              icon={Lock}
              title="Secure Registration"
              description="Your documents are stored with AES-256 encryption, the same standard used by the federal government. Multi-factor identity verification ensures that only you can register and manage your documents. No one can alter, delete, or access them without proper authorization."
            />
            <ProtectionRow
              icon={ShieldCheck}
              title="Blockchain Verification"
              description="Every document registration creates a cryptographic hash stored on an immutable blockchain ledger. This means anyone can verify that a document has not been tampered with, without needing to see the document itself. Forgery becomes detectable."
            />
            <ProtectionRow
              icon={Phone}
              title="Emergency Access Protocols"
              description="EDRS requires registries to support emergency access for healthcare providers, financial institutions, and designated family members. When a medical crisis occurs, authorized parties can retrieve advance directives and healthcare powers of attorney through standardized, secure protocols."
            />
            <ProtectionRow
              icon={Clock}
              title="Waiting Periods and Anti-Fraud Protections"
              description="Critical changes to document registrations trigger mandatory waiting periods and notifications to designated contacts. If someone attempts to revoke or replace your power of attorney, you and your trusted contacts are alerted before the change takes effect."
            />
            <ProtectionRow
              icon={Globe}
              title="Interstate Portability"
              description="Move from New York to Florida? Your registered documents travel with you. EDRS establishes standardized APIs and data formats that enable registries across state lines to recognize and verify each other's registrations through federated trust networks."
            />
          </div>
        </div>
      </section>

      {/* What to Look For */}
      <section className="bg-[#0f2b5b] py-24 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Choosing a Provider
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            What to Look for in a Registry
          </h2>
          <p className="mt-4 max-w-3xl text-blue-100/70">
            Not all document storage services are created equal. EDRS
            compliance is the gold standard for consumer protection. Here is
            how to evaluate providers and what questions to ask.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <BadgeCheck className="h-10 w-10 text-[#b8860b]" />
              <h3 className="mt-4 text-xl font-semibold">
                The EDRS Compliance Badge
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100/70">
                Providers that have completed independent certification testing
                are authorized to display the EDRS Compliance Badge. This badge
                means the provider meets all technical, security, and consumer
                protection requirements defined in the standard, including
                encryption, identity verification, access controls, data
                portability, fee transparency, and business continuity planning.
              </p>
              <Link
                href="/certification"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#b8860b] transition hover:text-[#d4991a]"
              >
                View certified providers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <HelpCircle className="h-10 w-10 text-[#b8860b]" />
              <h3 className="mt-4 text-xl font-semibold">
                Questions to Ask Providers
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-blue-100/70">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Are you EDRS-compliant and independently certified?
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  How do you verify the identity of registrants?
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Can my family access documents in an emergency? How?
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  What happens to my documents if you go out of business?
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Can I export my registrations to another provider?
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                  Do you support interstate verification and portability?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Common Questions
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-8">
            <FAQ
              question="Is registering my estate documents mandatory?"
              answer="No. Registration through an EDRS-compliant registry is entirely voluntary. Your existing estate documents remain legally valid whether or not they are registered. Registration adds a layer of protection by making documents discoverable, verifiable, and accessible to authorized parties, but it is never required."
            />
            <FAQ
              question="What types of documents can be registered?"
              answer="EDRS supports registration of wills, revocable and irrevocable trusts, durable powers of attorney, healthcare powers of attorney, advance directives (living wills), POLST/MOLST forms, beneficiary designations, and other estate planning instruments. The standard defines metadata schemas for each document type to ensure consistent handling."
            />
            <FAQ
              question="How do I find an EDRS-compliant provider?"
              answer="UEDRA maintains a directory of independently certified EDRS-compliant providers. You can also ask your estate planning attorney whether they work with a compliant registry. Look for the EDRS Compliance Badge, which indicates the provider has passed third-party certification testing."
            />
            <FAQ
              question="What happens if I move to a different state?"
              answer="EDRS is designed for interstate portability. Compliant registries participate in federated trust networks that allow registrations to be recognized across jurisdictions. Your registered documents remain verifiable and accessible regardless of which state you move to, provided both registries are EDRS-compliant."
            />
            <FAQ
              question="Can my family access my documents in an emergency?"
              answer="Yes. EDRS requires registries to implement emergency access protocols. You designate trusted contacts and specify access conditions during registration. In a medical emergency, healthcare providers can request access through standardized verification processes. The system balances privacy protection with the critical need for timely access."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Shield className="mx-auto h-12 w-12 text-[#0f2b5b]" />
          <h2 className="mt-6 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            Protect Your Family Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Find an EDRS-compliant registry provider and take the first step
            toward ensuring your estate documents are secure, verifiable, and
            accessible when your family needs them most.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/certification"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4991a]"
            >
              <Search className="h-4 w-4" />
              Find Compliant Providers
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#0f2b5b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3d7a]"
            >
              Contact Us
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

function ProblemCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Icon className="h-8 w-8 text-[#0f2b5b]" />
      <h3 className="mt-4 text-lg font-semibold text-[#0f2b5b]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
}

function ProtectionRow({
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

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-gray-200 pb-8">
      <h3 className="text-lg font-semibold text-[#0f2b5b]">{question}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{answer}</p>
    </div>
  );
}
