import Link from 'next/link';
import {
  Award,
  ClipboardCheck,
  Search,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Clock,
  DollarSign,
  Users,
  Lock,
  TrendingUp,
  Building2,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Certified',
};

const steps = [
  {
    number: '01',
    title: 'Self-Assessment',
    icon: ClipboardCheck,
    description:
      'Complete the EDRS-1.0 Annex C compliance checklist to evaluate your registry against all mandatory and recommended requirements. The self-assessment covers document registration, verification protocols, access control, audit logging, and interoperability.',
    details: [
      'Download the Annex C self-assessment checklist',
      'Evaluate your registry against each requirement',
      'Identify gaps and remediation steps',
      'Document your compliance evidence',
    ],
  },
  {
    number: '02',
    title: 'Third-Party Audit',
    icon: Search,
    description:
      'Engage an independent auditor approved by UEDRA to conduct a comprehensive technical and operational review of your registry. The auditor verifies your self-assessment findings and tests your implementation against the EDRS-1.0 standard.',
    details: [
      'Select from approved independent auditors',
      'Schedule on-site or remote audit sessions',
      'Provide technical access and documentation',
      'Receive detailed audit findings report',
    ],
  },
  {
    number: '03',
    title: 'Certification',
    icon: ShieldCheck,
    description:
      'Upon successful audit completion, receive EDRS-1.0 certification valid for two years. Certification includes a midpoint surveillance review at one year to ensure continued compliance and access to the certified provider directory.',
    details: [
      '2-year certification validity period',
      'Midpoint surveillance review at 12 months',
      'Listed in certified provider directory',
      'Authorized to display EDRS certification mark',
    ],
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Consumer Trust',
    description:
      'Demonstrate to consumers, attorneys, and financial planners that your registry meets the highest industry standard for security and interoperability.',
  },
  {
    icon: Lock,
    title: 'Legislative Compliance Readiness',
    description:
      'Position your registry for compliance as states adopt UEDRA legislation that may require or reference EDRS-1.0 certification.',
  },
  {
    icon: Building2,
    title: 'Institutional API Access',
    description:
      'Certified providers gain access to institutional API integrations with courts, financial institutions, and healthcare systems.',
  },
  {
    icon: TrendingUp,
    title: 'Marketing Differentiation',
    description:
      'Stand out in a growing market with third-party verified certification that validates your registry\'s quality and reliability.',
  },
];

export default function CertificationPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* Hero */}
      <section className="bg-[#0f2b5b] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-[#b8860b]" />
            <h1 className="text-4xl font-bold">Get Certified</h1>
          </div>
          <p className="text-lg text-blue-200 max-w-3xl">
            EDRS-1.0 certification validates that your estate document registry meets the open
            standard for security, interoperability, and consumer protection.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-[#0f2b5b] mb-4">Certification Overview</h2>
          <p className="text-gray-600 leading-relaxed max-w-4xl">
            The EDRS-1.0 certification program establishes a rigorous, transparent process for
            verifying that estate document registries meet the requirements of the Estate Document
            Registry Standard. Certification demonstrates that a provider has been independently
            audited against all mandatory requirements covering document registration, verification,
            access control, audit logging, and interoperability.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-6 mt-14">
        <h2 className="text-2xl font-bold text-[#0f2b5b] mb-8">Certification Process</h2>
        <div className="space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-[#0f2b5b] flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#b8860b]">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-6 h-6 text-[#b8860b]" />
                    <h3 className="text-xl font-bold text-[#0f2b5b]">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 mt-14">
        <h2 className="text-2xl font-bold text-[#0f2b5b] mb-8">Benefits of Certification</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-[#b8860b]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#b8860b]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f2b5b] text-lg">{b.title}</h3>
                  <p className="text-gray-600 mt-1 text-sm leading-relaxed">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certified Providers */}
      <section className="max-w-6xl mx-auto px-6 mt-14">
        <h2 className="text-2xl font-bold text-[#0f2b5b] mb-8">Certified Providers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* VerAuth */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-[#b8860b] p-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                First Certified
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#0f2b5b]">VerAuth</h3>
            <p className="text-sm text-gray-500 mt-1">Certified March 2026</p>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              First EDRS-1.0 certified estate document registry provider. Full compliance with all
              mandatory requirements for document registration, verification, and interoperability.
            </p>
            <a
              href="https://verauth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b8860b] hover:text-[#9a7209] transition-colors mt-4"
            >
              Visit verauth.com
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Placeholder slots */}
          <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center">
            <Award className="w-10 h-10 text-gray-300 mb-3" />
            <h3 className="font-semibold text-gray-400">Your Registry Here</h3>
            <p className="text-sm text-gray-400 mt-1">
              Become the next EDRS-1.0 certified provider
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center">
            <Award className="w-10 h-10 text-gray-300 mb-3" />
            <h3 className="font-semibold text-gray-400">Your Registry Here</h3>
            <p className="text-sm text-gray-400 mt-1">
              Become the next EDRS-1.0 certified provider
            </p>
          </div>
        </div>
      </section>

      {/* Cost & Timeline */}
      <section className="max-w-6xl mx-auto px-6 mt-14 pb-8">
        <h2 className="text-2xl font-bold text-[#0f2b5b] mb-8">Cost &amp; Timeline</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-[#b8860b]" />
              <h3 className="text-lg font-semibold text-[#0f2b5b]">Certification Fees</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Certification fees are structured to be accessible for providers of all sizes. Detailed
              pricing is available upon request and depends on registry complexity and scope. Contact
              our certification team for a personalized quote.
            </p>
            <a
              href="mailto:certification@uedra.org"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b8860b] hover:text-[#9a7209] transition-colors mt-4"
            >
              Request pricing details
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-[#b8860b]" />
              <h3 className="text-lg font-semibold text-[#0f2b5b]">Typical Timeline</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0f2b5b] mt-0.5 flex-shrink-0" />
                <span><strong>Self-Assessment:</strong> 2-4 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0f2b5b] mt-0.5 flex-shrink-0" />
                <span><strong>Remediation (if needed):</strong> 4-8 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0f2b5b] mt-0.5 flex-shrink-0" />
                <span><strong>Third-Party Audit:</strong> 2-3 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0f2b5b] mt-0.5 flex-shrink-0" />
                <span><strong>Certification Decision:</strong> 1-2 weeks</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f2b5b] py-16 mt-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Award className="w-10 h-10 text-[#b8860b] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Certification Journey</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Ready to demonstrate that your registry meets the EDRS-1.0 standard? Begin with the
            self-assessment checklist or contact our certification team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a7209] transition-colors"
            >
              Download Self-Assessment Checklist
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Contact Certification Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
