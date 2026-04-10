import Link from 'next/link';
import {
  Megaphone,
  MapPin,
  FileText,
  ArrowRight,
  Shield,
  Mail,
  CheckCircle2,
  Copy,
} from 'lucide-react';

export const metadata = {
  title: 'Take Action — Help Pass UEDRA in Your State | UEDRA',
  description:
    'Write to your state legislator in support of the Uniform Estate Document Registry Act. Plain-language template, a tool to find your legislators, and the 31-page standard behind the law.',
};

export default function ActPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0f2b5b] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#b8860b] text-sm font-medium mb-6">
            <Megaphone className="w-4 h-4" />
            Take Action
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Help Pass UEDRA in Your State
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            Three paragraphs. Fifteen minutes. One letter that matters.
          </p>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            The Uniform Estate Document Registry Act is a voluntary, standards-based
            framework that protects families from estate document fraud and incapacity-
            related abuse. State legislators enact it state by state. You can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#letter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b8860b] text-white font-semibold rounded-lg hover:bg-[#a07608] transition-colors"
            >
              <FileText className="w-5 h-5" />
              Read the Letter Template
            </a>
            <a
              href="https://openstates.org/find_your_legislator/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <MapPin className="w-5 h-5" />
              Find Your Legislators
            </a>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-16 px-6 bg-[#f8f9fc] border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2b5b] mb-4">
            The problem, in plain terms
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Estate documents — wills, trusts, powers of attorney, advance directives —
              fail at the worst possible moment. Lost originals after a death. Contested
              powers of attorney during incapacity. &ldquo;New&rdquo; wills that surface
              from a caregiver or second spouse after the person who signed them can no
              longer speak for themselves.
            </p>
            <p>
              Under current law in most states, banks, hospitals, and other institutions
              honor documents that appear facially valid — properly signed, notarized,
              and witnessed — without an independent way to verify whether the document
              is the current version, whether it has been revoked, or whether a later
              document exists. Contesting a forged or replaced document typically
              requires litigation after the harm has already been done. The victims are
              usually elderly, incapacitated, or deceased, and they often cannot defend
              themselves.
            </p>
            <p>
              This is not a rare problem. It is a regular occurrence. And it is largely
              preventable.
            </p>
          </div>
        </div>
      </section>

      {/* The solution */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2b5b] mb-4">
            The solution UEDRA proposes
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            <p>
              The Uniform Estate Document Registry Act authorizes a voluntary,
              state-level registration system for estate documents, built on the
              published EDRS-1.0 open technical standard. Under UEDRA, a person
              executing estate documents can choose to register them through a
              certified registry provider. The registration creates an identity-
              verified, cryptographically timestamped record of the document, and
              institutions that rely on the document can verify against the registry.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Voluntary',
                body:
                  'Registration is a choice by the individual, not a mandate. No one is forced to use it, and existing estate documents remain fully valid whether or not they are registered.',
              },
              {
                title: 'Open standard',
                body:
                  'The technical standard (EDRS-1.0) is published openly. Multiple registry providers can be certified. No proprietary lock-in.',
              },
              {
                title: 'Supplemental',
                body:
                  'UEDRA does not replace existing probate, POA, or advance-directive statutes. It creates a verification pathway on top of them.',
              },
              {
                title: 'Interstate recognition',
                body:
                  'The standard contemplates cross-state recognition, addressing the portability problems of an increasingly mobile population.',
              },
              {
                title: 'Consumer protections',
                body:
                  'The act defines registry provider obligations, audit requirements, and consumer protections — including what happens to registered documents if a provider ceases to operate.',
              },
              {
                title: 'Preserves choice',
                body:
                  'UEDRA does not require anyone to use any particular provider, and it does not change the legal validity of unregistered documents.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 bg-[#f8f9fc] p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#b8860b] mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#0f2b5b]">{f.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to help */}
      <section className="py-16 px-6 bg-[#0f2b5b] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">How to help, in three steps</h2>
          <div className="grid gap-6 sm:grid-cols-3 mt-8">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#b8860b] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold">Find your legislators</h3>
              <p className="mt-2 text-sm text-blue-200 leading-relaxed">
                Use{' '}
                <a
                  href="https://openstates.org/find_your_legislator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#b8860b]"
                >
                  openstates.org
                </a>{' '}
                to look up your state senator and state representative by your
                address. Pick one or both.
              </p>
            </div>
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#b8860b] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold">Adapt the letter</h3>
              <p className="mt-2 text-sm text-blue-200 leading-relaxed">
                Copy the template below, replace the bracketed fields with your own
                information, and add one or two sentences about why estate
                protection matters to you personally.
              </p>
            </div>
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#b8860b] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold">Send it</h3>
              <p className="mt-2 text-sm text-blue-200 leading-relaxed">
                Email, paper mail, or the legislator&rsquo;s contact form — whichever
                the office prefers. Any of the three is better than not sending.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The letter */}
      <section id="letter" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f2b5b] mb-2">
            The constituent letter template
          </h2>
          <p className="text-gray-600 mb-8">
            Three paragraphs, plain language, no legalese. Replace everything in
            brackets with your own information.
          </p>

          <div className="rounded-xl border border-gray-200 bg-[#f8f9fc] p-8">
            <pre className="whitespace-pre-wrap font-serif text-[15px] leading-[1.7] text-gray-800">
{`[Your Full Name]
[Your Street Address]
[Your City, State ZIP]
[Your Email]

[Date]

The Honorable [Legislator's Full Name]
[State Senate / State House of Representatives]
[Office Address]
[Capitol City, State ZIP]

Re:  Please support the Uniform Estate Document Registry Act

Dear [Senator / Representative] [Last Name]:

I am writing as a constituent to ask you to support the
introduction of the Uniform Estate Document Registry Act
(UEDRA) in [State] during the [current / upcoming] legislative
session.

I am a [your profession or situation — "retired teacher," "small
business owner," "grandmother of three," whatever is true]. I
live in [your neighborhood or city], which is in your district.
Estate planning matters to me because [one or two short
sentences: your personal reason. Keep it brief and real].

Here is the problem UEDRA addresses. Under current law in
[State], estate documents that look valid on their face are
generally honored by banks, hospitals, and other institutions.
If someone produces a forged power of attorney, a "new" will
that surfaces after a family member dies, or a document that
was quietly replaced while an elderly person was cognitively
declining, the institution's usual response is to honor it.
Contesting a forged document takes years of litigation, costs
families tens of thousands of dollars, and often comes too late
to protect the person who was supposed to be protected.

UEDRA addresses this by authorizing a voluntary state registry
for estate documents. Under UEDRA, a person executing estate
documents can choose to register them through a certified
provider. The registration creates an identity-verified,
cryptographically timestamped record of what was signed and
when. Institutions that rely on the documents can verify
against the registry. Registration is voluntary, the underlying
documents are still governed by existing state law, and no one
is forced into the system.

I am asking you to [consider introducing / co-sponsor / support
a committee hearing on / speak publicly in favor of] UEDRA in
[State]. The full technical standard is publicly available at
https://uedra.org/standard, and additional information about
the model act itself is at https://uedra.org.

Thank you for your time and for your service to our district.

Respectfully,

[Your Printed Name]`}
            </pre>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://openstates.org/find_your_legislator/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0f2b5b] text-white font-semibold rounded-lg hover:bg-[#1a3d7a] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Find Your Legislators
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/standard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0f2b5b] font-semibold rounded-lg border border-[#0f2b5b] hover:bg-[#0f2b5b] hover:text-white transition-colors"
            >
              <Shield className="w-4 h-4" />
              Read EDRS-1.0
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0f2b5b] font-semibold rounded-lg border border-gray-300 hover:border-[#0f2b5b] transition-colors"
            >
              <Mail className="w-4 h-4" />
              Questions? Contact UEDRA
            </Link>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-6 bg-[#f8f9fc] border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f2b5b] mb-4">
            Tips for a stronger letter
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                good: 'Keep it under one page',
                reason:
                  'Staff read a lot of constituent mail. The letters that fit on a page get finished.',
              },
              {
                good: 'Mention your district',
                reason:
                  'Legislators care most about their own constituents. Saying you live in the district in the first paragraph makes the letter more likely to be read.',
              },
              {
                good: 'Be specific about the ask',
                reason:
                  '"Please support generally" is less effective than "please co-sponsor" or "please ask for a committee hearing."',
              },
              {
                good: 'Share a personal reason',
                reason:
                  'Even a short personal sentence makes the letter feel real. Form letters get counted; personal ones get read.',
              },
              {
                good: 'Don\u2019t exaggerate',
                reason:
                  'If you claim the registry eliminates all fraud, staff who look into it will find that\u2019s not quite true. Stick to the honest version.',
              },
              {
                good: 'Offer to follow up',
                reason:
                  'Legislators remember constituents who offered to be useful. Even a single line helps.',
              },
            ].map((t) => (
              <div
                key={t.good}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h3 className="font-semibold text-[#0f2b5b] flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#b8860b] mt-0.5" />
                  {t.good}
                </h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed pl-7">
                  {t.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="h-10 w-10 text-[#0f2b5b] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0f2b5b] mb-3">
            One constituent letter at a time
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            This is how the law changes. Quietly, one thoughtful constituent letter
            at a time, from people who have thought about estate planning and care
            about protecting families. Thank you for being one of them.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#letter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b8860b] text-white font-semibold rounded-lg hover:bg-[#a07608] transition-colors"
            >
              <Copy className="w-5 h-5" />
              Copy the Letter
            </a>
            <a
              href="https://openstates.org/find_your_legislator/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0f2b5b] font-semibold rounded-lg border border-[#0f2b5b] hover:bg-[#0f2b5b] hover:text-white transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Find Your Legislators
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
