'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  Search,
  Shield,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  User,
  Hash,
} from 'lucide-react';

// Client-side constants
const DOCUMENT_TYPES: Record<string, string> = {
  will: 'Last Will and Testament',
  trust: 'Revocable Living Trust',
  financial_poa: 'Financial Power of Attorney',
  healthcare_poa: 'Healthcare Power of Attorney / Medical Directive',
  advance_directive: 'Advance Directive / Living Will',
  hipaa_authorization: 'HIPAA Authorization',
};

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' }, { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' }, { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' }, { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' }, { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' }, { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

interface VerificationResult {
  registry_number: string;
  document_type: string;
  document_type_label: string;
  status: string;
  storage_location: string;
  storage_location_label: string;
  storage_location_other?: string;
  contact_name: string;
  contact_phone: string;
  contact_email?: string;
  verification_tier: string;
  certified_provider?: string;
  registrant_name: string;
  registrant_state: string;
  registered_at: string;
  updated_at: string;
}

const inputCls =
  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] bg-white';
const labelCls = 'block text-sm font-medium text-gray-700 mb-1';

export default function VerifyPage() {
  const [tab, setTab] = useState<'number' | 'person'>('number');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [error, setError] = useState('');

  // Registry number search
  const [regNumber, setRegNumber] = useState('');

  // Person search
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [state, setState] = useState('');
  const [ssn4, setSsn4] = useState('');

  async function searchByNumber(e: FormEvent) {
    e.preventDefault();
    if (!regNumber.trim()) return;
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await fetch(`/api/registry/verify/${encodeURIComponent(regNumber.trim())}`);
      const data = await res.json();
      if (data.success) {
        setResults([data.result]);
      } else {
        setResults([]);
      }
    } catch {
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function searchByPerson(e: FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !dob || !state) return;
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await fetch('/api/registry/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dob,
          state,
          ssn_last4: ssn4 || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch {
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function statusColor(status: string) {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      case 'updated':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* Hero */}
      <section className="bg-[#0f2b5b] py-16 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 flex items-center gap-3">
            <Search className="h-8 w-8 text-[#b8860b]" />
            <h1 className="text-4xl font-bold">Verify Documents</h1>
          </div>
          <p className="max-w-3xl text-lg text-blue-200">
            Look up estate documents registered in the UEDRA National Registry.
            Search by registry number for instant results, or search by name.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-8 pb-20">
        {/* Search card */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => { setTab('number'); setSearched(false); setResults([]); setError(''); }}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                tab === 'number'
                  ? 'border-b-2 border-[#0f2b5b] text-[#0f2b5b]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Hash className="h-4 w-4" />
                Registry Number
              </div>
            </button>
            <button
              type="button"
              onClick={() => { setTab('person'); setSearched(false); setResults([]); setError(''); }}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
                tab === 'person'
                  ? 'border-b-2 border-[#0f2b5b] text-[#0f2b5b]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                Person Search
              </div>
            </button>
          </div>

          {/* Search forms */}
          <div className="p-8">
            {tab === 'number' ? (
              <form onSubmit={searchByNumber}>
                <label className={labelCls}>UEDRA Registry Number</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                    className={inputCls + ' font-mono'}
                    placeholder="UEDRA-NV-2026-000142"
                  />
                  <button
                    type="submit"
                    disabled={!regNumber.trim() || loading}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#0f2b5b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3d7a] disabled:opacity-40"
                  >
                    <Search className="h-4 w-4" />
                    Look Up
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={searchByPerson} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>First Name *</label>
                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} placeholder="First name" />
                  </div>
                  <div>
                    <label className={labelCls}>Last Name *</label>
                    <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} placeholder="Last name" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className={labelCls}>Date of Birth *</label>
                    <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>State *</label>
                    <select required value={state} onChange={(e) => setState(e.target.value)} className={inputCls + ' appearance-none'}>
                      <option value="">Select state...</option>
                      {US_STATES.map((s) => (
                        <option key={s.code} value={s.code}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Last 4 SSN</label>
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={ssn4}
                      onChange={(e) => setSsn4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className={inputCls}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!firstName || !lastName || !dob || !state || loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0f2b5b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3d7a] disabled:opacity-40"
                >
                  <Search className="h-4 w-4" />
                  {loading ? 'Searching...' : 'Search Registry'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mb-1 inline h-4 w-4" /> {error}
          </div>
        )}

        {/* Results */}
        {searched && !loading && !error && (
          <div className="mt-8">
            {results.length > 0 ? (
              <>
                <h2 className="mb-4 text-lg font-bold text-[#0f2b5b]">
                  {results.length} Document{results.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="space-y-4">
                  {results.map((r) => (
                    <div
                      key={r.registry_number}
                      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      {/* Header row */}
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[#0f2b5b]" />
                            <h3 className="text-lg font-bold text-[#0f2b5b]">
                              {r.document_type_label}
                            </h3>
                          </div>
                          <div className="mt-1 font-mono text-sm text-gray-500">
                            {r.registry_number}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor(r.status)}`}
                          >
                            {r.status}
                          </span>
                          {/* Verification tier badge */}
                          {r.verification_tier === 'certified_vault' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#b8860b]/10 px-3 py-1 text-xs font-semibold text-[#b8860b]">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              Certified Vault
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                              <Shield className="h-3.5 w-3.5" />
                              Self-Registered
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details grid */}
                      <div className="grid gap-4 text-sm sm:grid-cols-2">
                        <div className="flex items-start gap-2">
                          <User className="mt-0.5 h-4 w-4 text-gray-400" />
                          <div>
                            <div className="text-gray-500">Registrant</div>
                            <div className="font-medium">{r.registrant_name}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                          <div>
                            <div className="text-gray-500">Storage Location</div>
                            <div className="font-medium">
                              {r.storage_location_label}
                              {r.storage_location_other && ` — ${r.storage_location_other}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                          <div>
                            <div className="text-gray-500">Contact Person</div>
                            <div className="font-medium">{r.contact_name}</div>
                            <div className="text-gray-500">{r.contact_phone}</div>
                          </div>
                        </div>
                        {r.contact_email && (
                          <div className="flex items-start gap-2">
                            <Mail className="mt-0.5 h-4 w-4 text-gray-400" />
                            <div>
                              <div className="text-gray-500">Contact Email</div>
                              <div className="font-medium">{r.contact_email}</div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <Calendar className="mt-0.5 h-4 w-4 text-gray-400" />
                          <div>
                            <div className="text-gray-500">Registered</div>
                            <div className="font-medium">
                              {r.registered_at
                                ? new Date(r.registered_at).toLocaleDateString()
                                : '—'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Certified Vault callout */}
                      {r.verification_tier === 'certified_vault' && (
                        <div className="mt-4 rounded-lg border border-[#b8860b]/20 bg-[#b8860b]/5 p-3 text-sm text-gray-700">
                          <ShieldCheck className="mr-1 inline h-4 w-4 text-[#b8860b]" />
                          This document is stored in a UEDRA-certified registry. Contact the
                          certified provider for verified, instant access.
                        </div>
                      )}

                      {/* Self-registered note */}
                      {r.verification_tier === 'self_registered' && (
                        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-500">
                          <Shield className="mr-1 inline h-4 w-4" />
                          Self-registered: The registrant stated this document exists at the
                          location above. Contact the listed person to retrieve it.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* No results */
              <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <AlertCircle className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 text-lg font-bold text-[#0f2b5b]">No Records Found</h3>
                <p className="mx-auto mb-6 max-w-md text-sm text-gray-600">
                  No documents matching your search were found in the UEDRA National Registry.
                  The person may not have registered their documents yet.
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#b8860b] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d4991a]"
                  >
                    Register Documents for Free
                  </Link>
                  <Link
                    href="/for-institutions"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Learn About Verified Access
                  </Link>
                </div>
                <p className="mt-6 text-xs text-gray-400">
                  For comprehensive, verified access to estate documents, certified registrars
                  like{' '}
                  <a
                    href="https://verauth.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#b8860b] hover:underline"
                  >
                    VerAuth
                  </a>{' '}
                  offer encrypted vault storage and instant delivery to authorized institutions.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Verification tier explainer */}
        {!searched && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-500" />
                <h3 className="font-semibold text-gray-700">Self-Registered</h3>
              </div>
              <p className="text-sm text-gray-500">
                The registrant stated this document exists and provided storage and contact
                information. UEDRA has not verified the document itself.
              </p>
            </div>
            <div className="rounded-xl border border-[#b8860b]/20 bg-[#b8860b]/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#b8860b]" />
                <h3 className="font-semibold text-[#0f2b5b]">Certified Vault</h3>
              </div>
              <p className="text-sm text-gray-600">
                This document is stored in a UEDRA-certified registry. The document&apos;s
                existence, integrity, and chain of custody are verified.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
