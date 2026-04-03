import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-[#0f2b5b]" />
              <span className="text-sm font-bold text-[#0f2b5b]">
                UEDRA
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
              Advocating for uniform legislation and open technical standards to
              protect families through secure, interoperable estate document
              registries. Free and fair standards for all.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Organization
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="transition hover:text-[#0f2b5b]">About UEDRA</Link></li>
              <li><Link href="/standard" className="transition hover:text-[#0f2b5b]">EDRS Standard</Link></li>
              <li><Link href="/certification" className="transition hover:text-[#0f2b5b]">Get Certified</Link></li>
              <li><Link href="/resources" className="transition hover:text-[#0f2b5b]">Resources</Link></li>
              <li><Link href="/news" className="transition hover:text-[#0f2b5b]">News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a href="mailto:info@uedra.org" className="transition hover:text-[#0f2b5b]">info@uedra.org</a></li>
              <li><a href="mailto:standards@uedra.org" className="transition hover:text-[#0f2b5b]">standards@uedra.org</a></li>
              <li><a href="mailto:certification@uedra.org" className="transition hover:text-[#0f2b5b]">certification@uedra.org</a></li>
              <li><Link href="/contact" className="transition hover:text-[#0f2b5b]">Contact Form</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} UEDRA &mdash; Uniform Estate Document Registry Act. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
