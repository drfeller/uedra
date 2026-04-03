import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Eye,
  BookOpen,
  Scale,
  Award,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About UEDRA",
  description:
    "Learn about UEDRA, the organization advocating for uniform legislation and open standards to protect families from estate document fraud, loss, and inaccessibility.",
};

const timelineEvents = [
  {
    year: "2019",
    title: "UEEPDA Approved by ULC",
    description:
      "The Uniform Electronic Estate Planning Documents Act is approved by the Uniform Law Commission, laying the groundwork for digital estate document standards.",
  },
  {
    year: "2025",
    title: "UEDRA Founded",
    description:
      "The Uniform Estate Document Registry Act organization is established to advocate for registry standards and model legislation nationwide.",
  },
  {
    year: "Mar 2026",
    title: "EDRS-1.0 Published",
    description:
      "The Estate Document Registry Standard version 1.0 is published as a free, open standard covering identity verification, encryption, blockchain anchoring, and more.",
  },
  {
    year: "Apr 2026",
    title: "ULC Study Committee Proposal",
    description:
      "A formal proposal is submitted to the Uniform Law Commission to establish a Study Committee on estate document registries.",
  },
];

const whatWeDo = [
  {
    icon: BookOpen,
    title: "Publish the EDRS Standard",
    description:
      "We maintain and publish the Estate Document Registry Standard -- a free, open specification that anyone can implement. No licensing fees, no vendor lock-in.",
  },
  {
    icon: Scale,
    title: "Advocate for Model Legislation",
    description:
      "We work with the Uniform Law Commission to develop model legislation that states can adopt to ensure consistent, interoperable estate document registries.",
  },
  {
    icon: Award,
    title: "Certify Compliant Providers",
    description:
      "Registry providers that meet the EDRS standard can earn certification, giving consumers confidence that their documents are stored and managed properly.",
  },
  {
    icon: Users,
    title: "Educate the Public & Institutions",
    description:
      "We produce educational resources for families, attorneys, financial institutions, and healthcare providers about the importance of secure estate document management.",
  },
];

const governancePrinciples = [
  {
    icon: Users,
    title: "Consensus-Driven",
    description:
      "All standard revisions require broad stakeholder consensus, including input from legal professionals, technologists, consumer advocates, and state regulators.",
  },
  {
    icon: Globe,
    title: "Public Comment",
    description:
      "Every proposed change goes through a public comment period. Anyone can review, critique, and suggest improvements before changes are ratified.",
  },
  {
    icon: Shield,
    title: "No Vendor Capture",
    description:
      "The standard is designed to prevent any single vendor from controlling the ecosystem. Interoperability and portability are core requirements.",
  },
  {
    icon: CheckCircle,
    title: "Independent Certification",
    description:
      "Compliance certification is conducted by independent third-party auditors, ensuring objectivity and trustworthiness of the process.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0f2b5b] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About UEDRA</h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            The Uniform Estate Document Registry Act organization advocates for
            uniform legislation and open standards to protect families from
            estate document fraud, loss, and inaccessibility.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-[#f8f9fc]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f2b5b] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#b8860b]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f2b5b]">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              UEDRA exists to protect families by establishing uniform
              legislation and open, interoperable standards for estate document
              registries. We believe that no family should lose access to
              critical documents -- wills, trusts, powers of attorney, advance
              directives -- due to fraud, disaster, or institutional failure.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f2b5b] flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#b8860b]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f2b5b]">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Every family in America should have confidence that their estate
              documents are secure, verifiable, and accessible when needed most.
              We envision a future where estate document registries are as
              trusted and ubiquitous as the systems that protect property deeds
              and financial records.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2b5b] text-center mb-4">
            What We Do
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            UEDRA operates at the intersection of law, technology, and consumer
            protection to build a trustworthy ecosystem for estate document
            management.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {whatWeDo.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-xl border border-gray-100 hover:border-[#b8860b]/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#b8860b]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#b8860b]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f2b5b] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 px-6 bg-[#f8f9fc]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2b5b] text-center mb-12">
            Our History
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[#0f2b5b]/20" />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 w-[19px] h-[19px] rounded-full bg-[#b8860b] border-4 border-[#f8f9fc] z-10" />

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:pr-0" : "md:pl-0"
                    }`}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#0f2b5b] text-white text-sm font-semibold mb-3">
                        {event.year}
                      </span>
                      <h3 className="text-lg font-bold text-[#0f2b5b] mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Governance */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2b5b] text-center mb-4">
            Leadership &amp; Governance
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            UEDRA is guided by a Standards Council operating under an open
            governance model. Our leadership draws from legal, technology,
            consumer advocacy, and regulatory backgrounds.
          </p>

          {/* Standards Council Placeholder */}
          <div className="bg-[#f8f9fc] rounded-2xl p-10 text-center mb-16 border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-[#0f2b5b] flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#b8860b]" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2b5b] mb-3">
              Standards Council
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-4">
              The Standards Council oversees the development and maintenance of
              the EDRS standard, certification processes, and legislative
              advocacy. Council membership and meeting minutes are published
              publicly.
            </p>
            <p className="text-sm text-[#b8860b] font-medium">
              Council member profiles coming soon
            </p>
          </div>

          {/* Open Governance Principles */}
          <h3 className="text-2xl font-bold text-[#0f2b5b] text-center mb-8">
            Open Governance Principles
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {governancePrinciples.map((principle) => (
              <div
                key={principle.title}
                className="flex gap-5 p-6 rounded-xl border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0f2b5b]/10 flex items-center justify-center flex-shrink-0">
                  <principle.icon className="w-6 h-6 text-[#0f2b5b]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#0f2b5b] mb-2">
                    {principle.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0f2b5b]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get Involved</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you are an attorney, technologist, policymaker, or concerned
            citizen, there are ways to contribute to the UEDRA mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/standard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b8860b] text-white font-semibold rounded-lg hover:bg-[#a07608] transition-colors"
            >
              Read the Standard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
