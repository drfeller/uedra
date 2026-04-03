import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Shield,
  Landmark,
  FileCheck,
  Globe,
  Scale,
  ArrowRight,
  CheckCircle2,
  Building2,
  BookOpen,
  Download,
  Users,
  AlertTriangle,
  History,
  Car,
  Stethoscope,
  ScrollText,
  BadgeCheck,
  Handshake,
  Phone,
  ClipboardList,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Legislators',
  description:
    'Learn how the Uniform Estate Document Registry Act modernizes estate document infrastructure with voluntary registration, identity verification, and interstate recognition.',
};

export default function ForLegislatorsPage() {
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
            <Landmark className="h-3.5 w-3.5" />
            For Legislators
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Modernizing Estate
            <br />
            Document Infrastructure
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/80">
            Estate planning documents are the only major category of legal
            instruments in the United States with no registration
            infrastructure. UEDRA provides the legislative framework and
            technical standard to close this gap.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4991a]"
            >
              <Phone className="h-4 w-4" />
              Request a Legislative Briefing
            </Link>
            <Link
              href="#ulc-proposal"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              Download the ULC Proposal
            </Link>
          </div>
        </div>
      </section>

      {/* The Registration Gap */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            The Registration Gap
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            Every Major Legal Instrument Has a Registry &mdash; Except One
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            The United States has developed comprehensive registration systems
            for virtually every important category of legal instrument. Estate
            planning documents remain the glaring exception.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <RegistryCard
              icon={Building2}
              title="Real Property"
              year="Since 1640"
              description="Recording acts in every state create public registries for deeds, mortgages, and liens."
            />
            <RegistryCard
              icon={ScrollText}
              title="UCC Filings"
              year="Since 1952"
              description="The Uniform Commercial Code provides centralized filing systems for secured transactions."
            />
            <RegistryCard
              icon={Car}
              title="Vehicles"
              year="Since 1901"
              description="Every state operates a DMV with title and registration systems for motor vehicles."
            />
            <RegistryCard
              icon={ClipboardList}
              title="Vital Records"
              year="Since 1900"
              description="Births, deaths, and marriages are registered through state vital statistics offices."
            />
          </div>

          <div className="mt-10 rounded-xl border-2 border-dashed border-[#b8860b]/30 bg-[#b8860b]/5 p-8 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-[#b8860b]" />
            <h3 className="mt-4 text-xl font-bold text-[#0f2b5b]">
              Estate Documents: No System
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
              Wills, trusts, powers of attorney, and advance directives have no
              registration infrastructure. They are created, stored in filing
              cabinets and safe deposit boxes, and frequently lost, forged, or
              inaccessible at the moment they are needed most.
            </p>
          </div>
        </div>
      </section>

      {/* UEEPDA Success */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
                Building on Success
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
                UEEPDA Proved the Need
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                The Uniform Electronic Estate Planning Documents Act (UEEPDA),
                drafted by the Uniform Law Commission, has been adopted by 16
                states. It established that estate documents can be validly
                created and executed in electronic form.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                However, UEEPDA addressed the medium &mdash; electronic versus
                paper &mdash; without addressing the infrastructure. It
                authorized electronic wills but created no system for
                registering, verifying, or locating them. UEDRA fills this gap
                by providing the registry framework that makes electronic
                execution practically useful.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-[#f8f9fc] p-8">
              <div className="grid grid-cols-2 gap-8">
                <Stat number="16" label="States Adopted UEEPDA" />
                <Stat number="0" label="States with Estate Registries" />
                <Stat number="46" label="States with POLST Registries" />
                <Stat number="50" label="States Targeted by UEDRA" />
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-xs leading-relaxed text-gray-500">
                  UEEPDA made electronic estate documents legal. UEDRA makes
                  them findable, verifiable, and accessible across state lines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The UEDRA Proposal */}
      <section id="ulc-proposal" className="bg-[#0f2b5b] py-24 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            The Proposal
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Uniform Estate Document Registry Act
          </h2>
          <p className="mt-4 max-w-3xl text-blue-100/70">
            UEDRA has developed a comprehensive proposal for the Uniform Law
            Commission to appoint a Study Committee on a Uniform Estate
            Planning Document Registry Act. The proposal draws on the
            technical foundation of the EDRS standard and the legislative
            precedent of UEEPDA.
          </p>

          <div className="mt-14 space-y-6">
            <ProvisionRow
              icon={Handshake}
              title="Voluntary Registration"
              description="Registration is entirely voluntary. No estate document is required to be registered to be legally valid. The registry provides an additional layer of protection, not a mandate."
            />
            <ProvisionRow
              icon={BadgeCheck}
              title="Identity Verification"
              description="Registries must implement multi-factor identity verification for all registrants. This prevents unauthorized registration and ensures that only the principal (or their authorized representative) can register documents."
            />
            <ProvisionRow
              icon={Shield}
              title="Authorized Access Controls"
              description="The act defines clear categories of authorized access: principal access, fiduciary access, emergency access for healthcare providers, institutional verification for banks and courts, and law enforcement access with proper legal process."
            />
            <ProvisionRow
              icon={Globe}
              title="Interstate Recognition"
              description="Documents registered in one state's EDRS-compliant registry are recognized and verifiable in all participating states. Federated trust networks enable cross-jurisdictional verification without requiring a national database."
            />
            <ProvisionRow
              icon={FileCheck}
              title="Provider Certification"
              description="Registry providers must meet technical, security, and consumer protection standards defined in the EDRS. Independent certification ensures consistent quality and protects consumers from substandard providers."
            />
          </div>

          <div className="mt-14 rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <Download className="mx-auto h-10 w-10 text-[#b8860b]" />
            <h3 className="mt-4 text-xl font-semibold">
              Download the ULC Proposal
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-blue-100/70">
              Review the full proposal for a Uniform Law Commission Study
              Committee, including legislative rationale, proposed scope, and
              technical appendices.
            </p>
            <Link
              href="/resources"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d4991a]"
            >
              <Download className="h-4 w-4" />
              View Resources &amp; Downloads
            </Link>
          </div>
        </div>
      </section>

      {/* POLST Precedent */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Proven Model
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            The POLST Precedent
          </h2>
          <div className="mt-8 grid items-start gap-12 md:grid-cols-2">
            <div>
              <p className="leading-relaxed text-gray-600">
                Physician Orders for Life-Sustaining Treatment (POLST)
                registries demonstrate that estate document registries work in
                practice. 46 states have implemented POLST registries, providing
                healthcare providers with real-time access to patients&apos; end-of-life
                treatment preferences.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                POLST registries have proven that voluntary registration systems
                for sensitive legal-medical documents can achieve broad adoption,
                institutional integration, and measurable improvements in
                outcomes. UEDRA extends this model to the full spectrum of
                estate planning documents.
              </p>
              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-[#0f2b5b]">
                  What POLST Proved
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    'Voluntary registries achieve high adoption without mandates',
                    'Healthcare providers integrate registry access into workflows',
                    'Interstate recognition is achievable through standardization',
                    'Consumer trust grows when systems are transparent and secure',
                    'State legislation can establish registries without federal action',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <Stethoscope className="h-10 w-10 text-[#0f2b5b]" />
              <h3 className="mt-4 text-xl font-semibold text-[#0f2b5b]">
                POLST by the Numbers
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="text-3xl font-bold text-[#b8860b]">46</div>
                  <div className="text-sm text-gray-500">
                    States with active POLST registries
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <div className="text-3xl font-bold text-[#b8860b]">2.5M+</div>
                  <div className="text-sm text-gray-500">
                    POLST forms registered nationally
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <div className="text-3xl font-bold text-[#b8860b]">
                    &lt;2 sec
                  </div>
                  <div className="text-sm text-gray-500">
                    Average retrieval time in emergency settings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Support */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b8860b]">
            Take Action
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0f2b5b] sm:text-4xl">
            How to Support UEDRA
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            There are several concrete ways legislators and their staff can
            advance estate document registry infrastructure in their
            jurisdictions.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <ActionCard
              step="01"
              icon={ScrollText}
              title="Introduce Companion Legislation"
              description="Draft and introduce state-level legislation that establishes an estate document registry framework in your jurisdiction. UEDRA provides model language and technical specifications that can be adapted to your state's legal traditions."
            />
            <ActionCard
              step="02"
              icon={FileCheck}
              title="Reference EDRS in Bills"
              description="When drafting estate planning or elder protection legislation, reference the EDRS standard as the technical baseline for registry requirements. This ensures interoperability and avoids proprietary lock-in."
            />
            <ActionCard
              step="03"
              icon={Users}
              title="Join the Study Committee"
              description="Support the Uniform Law Commission's consideration of a Study Committee on estate document registries. Contact your state's ULC commissioners to advocate for the appointment of a drafting committee."
            />
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-[#f8f9fc] p-8">
              <History className="h-8 w-8 text-[#0f2b5b]" />
              <h3 className="mt-4 text-lg font-semibold text-[#0f2b5b]">
                Legislative Briefings Available
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                UEDRA offers legislative briefings for state legislators,
                committee staff, and ULC commissioners. Briefings cover the
                registration gap, the EDRS technical standard, the POLST
                precedent, and implementation pathways.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f2b5b] transition hover:text-[#b8860b]"
              >
                Request a briefing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-xl border border-gray-200 bg-[#f8f9fc] p-8">
              <BookOpen className="h-8 w-8 text-[#0f2b5b]" />
              <h3 className="mt-4 text-lg font-semibold text-[#0f2b5b]">
                Track Legislative Progress
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Follow the progress of estate document registry legislation
                across all 50 states. Our tracker monitors bill introductions,
                committee hearings, and adoptions in real time.
              </p>
              <Link
                href="/legislative-tracker"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f2b5b] transition hover:text-[#b8860b]"
              >
                View the tracker <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f2b5b] py-24 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Landmark className="mx-auto h-12 w-12 text-[#b8860b]" />
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Close the Registration Gap
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100/70">
            Estate documents deserve the same registration infrastructure that
            protects real property, commercial transactions, and vital records.
            Contact UEDRA for a legislative briefing and learn how your state
            can lead this modernization effort.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4991a]"
            >
              <Phone className="h-4 w-4" />
              Request a Legislative Briefing
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              Download the ULC Proposal
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

function RegistryCard({
  icon: Icon,
  title,
  year,
  description,
}: {
  icon: typeof Shield;
  title: string;
  year: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Icon className="h-8 w-8 text-[#0f2b5b]" />
      <h3 className="mt-4 text-lg font-semibold text-[#0f2b5b]">{title}</h3>
      <p className="mt-1 text-xs font-semibold text-[#b8860b]">{year}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
}

function ProvisionRow({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-6 rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b8860b]">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-blue-100/70">
          {description}
        </p>
      </div>
    </div>
  );
}

function ActionCard({
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
    <div className="rounded-xl border border-gray-200 bg-[#f8f9fc] p-6">
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

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-[#b8860b]">{number}</div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  );
}
