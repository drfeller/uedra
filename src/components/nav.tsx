'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X } from 'lucide-react';

const registryLinks = [
  { href: '/register', label: 'Register (Free)', accent: true },
  { href: '/verify', label: 'Verify' },
];

const links = [
  { href: '/about', label: 'About' },
  { href: '/standard', label: 'The Standard' },
  { href: '/certification', label: 'Get Certified' },
  { href: '/for-families', label: 'For Families' },
  { href: '/for-attorneys', label: 'For Attorneys' },
  { href: '/for-institutions', label: 'For Institutions' },
  { href: '/for-legislators', label: 'For Legislators' },
  { href: '/legislative-tracker', label: 'Tracker' },
  { href: '/resources', label: 'Resources' },
  { href: '/news', label: 'News' },
  { href: '/donate', label: 'Donate' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Shield className="h-7 w-7 text-[#0f2b5b]" />
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-[#0f2b5b]">
              UEDRA
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-gray-500">
              Uniform Estate Document Registry Act
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 lg:flex">
          {registryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                l.accent
                  ? 'font-semibold text-[#b8860b] transition hover:text-[#d4991a]'
                  : 'transition hover:text-[#0f2b5b]'
              }
            >
              {l.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-gray-300" />
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-[#0f2b5b]">
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-[#0f2b5b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a3d7a]"
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#0f2b5b]">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-6 pb-6 pt-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
            {/* Registry links at top, visually separated */}
            {registryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={
                  l.accent
                    ? 'py-1 font-semibold text-[#b8860b] transition hover:text-[#d4991a]'
                    : 'py-1 transition hover:text-[#0f2b5b]'
                }
              >
                {l.label}
              </Link>
            ))}
            <div className="my-1 border-t border-gray-100" />
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1 transition hover:text-[#0f2b5b]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-[#0f2b5b] px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
