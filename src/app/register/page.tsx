'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  Shield,
  FileText,
  UserCheck,
  ClipboardCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Copy,
  ExternalLink,
} from 'lucide-react';

// --- Constants (mirrored from lib/registry.ts for client use) ---
const DOCUMENT_TYPES = {
  will: 'Last Will and Testament',
  trust: 'Revocable Living Trust',
  financial_poa: 'Financial Power of Attorney',
  healthcare_poa: 'Healthcare Power of Attorney / Medical Directive',
  advance_directive: 'Advance Directive / Living Will',
  hipaa_authorization: 'HIPAA Authorization',
} as const;

type DocumentType = keyof typeof DOCUMENT_TYPES;

const STORAGE_LOCATIONS = {
  attorney_office: "Attorney's office",
  safe_deposit_box: 'Safe deposit box (bank)',
  home_safe: 'Home safe or lockbox',
  county_clerk: 'Filed with county clerk / court',
  verauth_vault: 'VerAuth Vault (certified)',
  other: 'Other',
} as const;

const RELATIONSHIPS = ['Spouse', 'Child', 'Sibling', 'Parent', 'Attorney', 'Other'] as const;

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
  { code: 'WY', name: 'Wyoming' }, { code: 'AS', name: 'American Samoa' },
  { code: 'GU', name: 'Guam' }, { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'PR', name: 'Puerto Rico' }, { code: 'VI', name: 'U.S. Virgin Islands' },
];

// --- Types ---
interface DocumentEntry {
  document_type: DocumentType;
  storage_location: string;
  storage_location_other: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
}

interface RegistryResult {
  document_type: string;
  registry_number: string;
  label: string;
}

// --- Steps config ---
const STEPS = [
  { label: 'Identity', icon: Shield },
  { label: 'Documents', icon: FileText },
  { label: 'Emergency Contact', icon: UserCheck },
  { label: 'Review', icon: ClipboardCheck },
  { label: 'Confirmation', icon: CheckCircle2 },
];

// Input classes
const inputCls =
  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] bg-white';
const labelCls = 'block text-sm font-medium text-gray-700 mb-1';

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<RegistryResult[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // Step 1: Identity
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [state, setState] = useState('');
  const [ssn4, setSsn4] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2: Documents
  const [selectedTypes, setSelectedTypes] = useState<Set<DocumentType>>(new Set());
  const [documents, setDocuments] = useState<Record<DocumentType, DocumentEntry>>(
    {} as Record<DocumentType, DocumentEntry>
  );
  const [sameContact, setSameContact] = useState(false);

  // Step 3: Emergency Contact
  const [ecName, setEcName] = useState('');
  const [ecRelationship, setEcRelationship] = useState('');
  const [ecPhone, setEcPhone] = useState('');
  const [ecEmail, setEcEmail] = useState('');
  const [ecIsDocContact, setEcIsDocContact] = useState(false);

  // Step 4: Review options
  const [reminderOptIn, setReminderOptIn] = useState(true);
  const [tosAccepted, setTosAccepted] = useState(false);

  // --- Handlers ---
  function toggleDocType(type: DocumentType) {
    const next = new Set(selectedTypes);
    if (next.has(type)) {
      next.delete(type);
    } else {
      next.add(type);
      if (!documents[type]) {
        documents[type] = {
          document_type: type,
          storage_location: '',
          storage_location_other: '',
          contact_name: '',
          contact_phone: '',
          contact_email: '',
        };
        setDocuments({ ...documents });
      }
    }
    setSelectedTypes(next);
  }

  function updateDoc(type: DocumentType, field: keyof DocumentEntry, value: string) {
    documents[type] = { ...documents[type], [field]: value };
    setDocuments({ ...documents });
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        return !!(firstName && lastName && dob && state && ssn4.length === 4 && email);
      case 1:
        if (selectedTypes.size === 0) return false;
        for (const type of selectedTypes) {
          const doc = documents[type];
          if (!doc?.storage_location || !doc?.contact_name || !doc?.contact_phone) return false;
        }
        return true;
      case 2:
        return !!(ecName && ecRelationship && ecPhone && ecEmail);
      case 3:
        return tosAccepted;
      default:
        return true;
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canAdvance()) return;
    setSubmitting(true);

    // Apply emergency contact as document contact if checked
    const docList = Array.from(selectedTypes).map((type) => {
      const doc = documents[type];
      const entry: Record<string, string | undefined> = {
        document_type: type,
        storage_location: doc.storage_location,
        storage_location_other: doc.storage_location_other || undefined,
        contact_name: ecIsDocContact ? ecName : doc.contact_name,
        contact_phone: ecIsDocContact ? ecPhone : doc.contact_phone,
        contact_email: ecIsDocContact ? ecEmail : doc.contact_email || undefined,
      };
      return entry;
    });

    try {
      const res = await fetch('/api/registry/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          middle_name: middleName || undefined,
          last_name: lastName,
          date_of_birth: dob,
          state,
          ssn_last4: ssn4,
          email,
          phone: phone || undefined,
          documents: docList,
          emergency_contact: {
            full_name: ecName,
            relationship: ecRelationship,
            phone: ecPhone,
            email: ecEmail,
          },
          reminder_opt_in: reminderOptIn,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResults(data.registry_numbers);
        setStep(4);
      }
    } catch {
      // best-effort
    } finally {
      setSubmitting(false);
    }
  }

  function copyNumber(num: string) {
    navigator.clipboard.writeText(num);
    setCopied(num);
    setTimeout(() => setCopied(null), 2000);
  }

  const hasNonVault = Array.from(selectedTypes).some(
    (t) => documents[t]?.storage_location !== 'verauth_vault'
  );

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* Hero */}
      <section className="bg-[#0f2b5b] py-16 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#b8860b]" />
            <h1 className="text-4xl font-bold">Register Your Documents</h1>
          </div>
          <p className="max-w-3xl text-lg text-blue-200">
            Record your estate documents in the free UEDRA National Registry so hospitals,
            banks, and attorneys can verify they exist and know who to contact.
          </p>
        </div>
      </section>

      {/* Progress bar */}
      <div className="mx-auto max-w-4xl px-6 pt-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={s.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                      isDone
                        ? 'border-green-500 bg-green-500 text-white'
                        : isActive
                          ? 'border-[#0f2b5b] bg-[#0f2b5b] text-white'
                          : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`mt-1 text-xs font-medium ${
                      isActive ? 'text-[#0f2b5b]' : 'text-gray-400'
                    } hidden sm:block`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      i < step ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form card */}
      <div className="mx-auto max-w-4xl px-6 py-8 pb-20">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Step 1: Identity */}
          {step === 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-[#0f2b5b]">Your Information</h2>
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className={labelCls}>First Name *</label>
                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} placeholder="First" />
                  </div>
                  <div>
                    <label className={labelCls}>Middle Name</label>
                    <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} className={inputCls} placeholder="Middle" />
                  </div>
                  <div>
                    <label className={labelCls}>Last Name *</label>
                    <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} placeholder="Last" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Date of Birth *</label>
                    <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>State of Residence *</label>
                    <select required value={state} onChange={(e) => setState(e.target.value)} className={inputCls + ' appearance-none'}>
                      <option value="">Select state...</option>
                      {US_STATES.map((s) => (
                        <option key={s.code} value={s.code}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Last 4 Digits of SSN *</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    required
                    value={ssn4}
                    onChange={(e) => setSsn4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className={inputCls + ' max-w-[160px]'}
                    placeholder="••••"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Used only to distinguish people with the same name. Never displayed or shared.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Email Address *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="(555) 123-4567" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 1 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-[#0f2b5b]">Your Documents</h2>
              <p className="mb-6 text-sm text-gray-600">
                Select each document type you have, then tell us where it&apos;s stored and who to contact.
              </p>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {(Object.entries(DOCUMENT_TYPES) as [DocumentType, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleDocType(key)}
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition ${
                      selectedTypes.has(key)
                        ? 'border-[#0f2b5b] bg-[#0f2b5b]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded border-2 ${
                        selectedTypes.has(key)
                          ? 'border-[#0f2b5b] bg-[#0f2b5b] text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedTypes.has(key) && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </button>
                ))}
              </div>

              {/* Same contact toggle */}
              {selectedTypes.size > 1 && (
                <label className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={sameContact}
                    onChange={(e) => setSameContact(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Use the same contact person for all documents
                </label>
              )}

              {/* Document detail cards */}
              <div className="space-y-4">
                {Array.from(selectedTypes).map((type, idx) => {
                  const doc = documents[type];
                  if (!doc) return null;
                  const showContact = idx === 0 || !sameContact;
                  return (
                    <div key={type} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                      <h3 className="mb-4 font-semibold text-[#0f2b5b]">
                        {DOCUMENT_TYPES[type]}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className={labelCls}>Where is this document stored? *</label>
                          <select
                            value={doc.storage_location}
                            onChange={(e) => updateDoc(type, 'storage_location', e.target.value)}
                            className={inputCls + ' appearance-none'}
                          >
                            <option value="">Select location...</option>
                            {Object.entries(STORAGE_LOCATIONS).map(([k, v]) => (
                              <option key={k} value={k}>{v}</option>
                            ))}
                          </select>
                        </div>
                        {doc.storage_location === 'other' && (
                          <div>
                            <label className={labelCls}>Describe location</label>
                            <input
                              type="text"
                              value={doc.storage_location_other}
                              onChange={(e) => updateDoc(type, 'storage_location_other', e.target.value)}
                              className={inputCls}
                              placeholder="Where is the document stored?"
                            />
                          </div>
                        )}
                        {showContact && (
                          <>
                            <div>
                              <label className={labelCls}>Contact Person Name *</label>
                              <input
                                type="text"
                                value={doc.contact_name}
                                onChange={(e) => {
                                  updateDoc(type, 'contact_name', e.target.value);
                                  if (sameContact) {
                                    for (const t of selectedTypes) {
                                      if (t !== type) updateDoc(t, 'contact_name', e.target.value);
                                    }
                                  }
                                }}
                                className={inputCls}
                                placeholder="Person who can provide this document"
                              />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label className={labelCls}>Contact Phone *</label>
                                <input
                                  type="tel"
                                  value={doc.contact_phone}
                                  onChange={(e) => {
                                    updateDoc(type, 'contact_phone', e.target.value);
                                    if (sameContact) {
                                      for (const t of selectedTypes) {
                                        if (t !== type) updateDoc(t, 'contact_phone', e.target.value);
                                      }
                                    }
                                  }}
                                  className={inputCls}
                                  placeholder="(555) 123-4567"
                                />
                              </div>
                              <div>
                                <label className={labelCls}>Contact Email</label>
                                <input
                                  type="email"
                                  value={doc.contact_email}
                                  onChange={(e) => {
                                    updateDoc(type, 'contact_email', e.target.value);
                                    if (sameContact) {
                                      for (const t of selectedTypes) {
                                        if (t !== type) updateDoc(t, 'contact_email', e.target.value);
                                      }
                                    }
                                  }}
                                  className={inputCls}
                                  placeholder="contact@example.com"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Emergency Contact */}
          {step === 2 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-[#0f2b5b]">Emergency Contact</h2>
              <p className="mb-6 text-sm text-gray-600">
                The primary person who should be contacted about your estate documents.
              </p>
              <div className="space-y-5">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input type="text" required value={ecName} onChange={(e) => setEcName(e.target.value)} className={inputCls} placeholder="Full name" />
                </div>
                <div>
                  <label className={labelCls}>Relationship *</label>
                  <select required value={ecRelationship} onChange={(e) => setEcRelationship(e.target.value)} className={inputCls + ' appearance-none'}>
                    <option value="">Select relationship...</option>
                    {RELATIONSHIPS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input type="tel" required value={ecPhone} onChange={(e) => setEcPhone(e.target.value)} className={inputCls} placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input type="email" required value={ecEmail} onChange={(e) => setEcEmail(e.target.value)} className={inputCls} placeholder="contact@example.com" />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={ecIsDocContact}
                    onChange={(e) => setEcIsDocContact(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Use this person as the contact for all documents above
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 3 && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-[#0f2b5b]">Review Your Registration</h2>

              {/* Identity summary */}
              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Identity</h3>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <div><span className="text-gray-500">Name:</span> {firstName} {middleName} {lastName}</div>
                  <div><span className="text-gray-500">Date of Birth:</span> {dob}</div>
                  <div><span className="text-gray-500">State:</span> {US_STATES.find((s) => s.code === state)?.name}</div>
                  <div><span className="text-gray-500">Email:</span> {email}</div>
                </div>
              </div>

              {/* Documents summary */}
              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Documents ({selectedTypes.size})</h3>
                <div className="space-y-3">
                  {Array.from(selectedTypes).map((type) => {
                    const doc = documents[type];
                    const loc = STORAGE_LOCATIONS[doc.storage_location as keyof typeof STORAGE_LOCATIONS] ?? doc.storage_location_other ?? doc.storage_location;
                    return (
                      <div key={type} className="flex items-start gap-3 text-sm">
                        <FileText className="mt-0.5 h-4 w-4 text-[#0f2b5b]" />
                        <div>
                          <div className="font-medium">{DOCUMENT_TYPES[type]}</div>
                          <div className="text-gray-500">Stored at: {loc}</div>
                          <div className="text-gray-500">Contact: {ecIsDocContact ? ecName : doc.contact_name}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Emergency contact summary */}
              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Emergency Contact</h3>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <div><span className="text-gray-500">Name:</span> {ecName}</div>
                  <div><span className="text-gray-500">Relationship:</span> {ecRelationship}</div>
                  <div><span className="text-gray-500">Phone:</span> {ecPhone}</div>
                  <div><span className="text-gray-500">Email:</span> {ecEmail}</div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={reminderOptIn}
                    onChange={(e) => setReminderOptIn(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Send me an annual reminder to review my documents
                </label>
                <label className="flex items-start gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={tosAccepted}
                    onChange={(e) => setTosAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300"
                  />
                  <span>
                    I understand that this registry records the existence and location of my
                    documents. UEDRA does not store, verify, or guarantee the validity of the
                    documents themselves. I confirm the information above is accurate.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 4 && (
            <div className="text-center">
              <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
              <h2 className="mb-2 text-2xl font-bold text-[#0f2b5b]">Registration Complete</h2>
              <p className="mb-8 text-gray-600">
                Your documents have been registered in the UEDRA National Registry.
                A confirmation email has been sent to {email}.
              </p>

              {/* Registry numbers */}
              <div className="mx-auto max-w-lg text-left">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Your Registry Numbers
                </h3>
                <div className="space-y-3">
                  {results.map((r) => (
                    <div
                      key={r.registry_number}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                      <div>
                        <div className="text-sm text-gray-500">{r.label}</div>
                        <div className="font-mono text-lg font-bold text-[#0f2b5b]">
                          {r.registry_number}
                        </div>
                      </div>
                      <button
                        onClick={() => copyNumber(r.registry_number)}
                        className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-200"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copied === r.registry_number ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
                  <strong>Important:</strong> Write these numbers on your physical documents
                  and keep a copy in your wallet or phone. Institutions can verify your
                  documents at{' '}
                  <Link href="/verify" className="font-medium underline">
                    uedra.org/verify
                  </Link>
                  .
                </div>

                {/* VerAuth upsell */}
                {hasNonVault && (
                  <div className="mt-6 rounded-lg border border-[#b8860b]/30 bg-[#b8860b]/5 p-5">
                    <div className="flex items-start gap-3">
                      <Shield className="mt-0.5 h-6 w-6 text-[#b8860b]" />
                      <div>
                        <h4 className="font-semibold text-[#0f2b5b]">
                          Want instant, verified access?
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          Your documents are registered, but your family still needs to call
                          someone and hope the documents are where you said they are. VerAuth
                          stores your actual documents in an encrypted vault with real-time
                          delivery to authorized hospitals, banks, and attorneys.
                        </p>
                        <a
                          href="https://verauth.net"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#b8860b] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d4991a]"
                        >
                          Learn About VerAuth
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => { setStep(step - 1); window.scrollTo(0, 0); }}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  disabled={!canAdvance()}
                  onClick={() => { setStep(step + 1); window.scrollTo(0, 0); }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0f2b5b] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a3d7a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canAdvance() || submitting}
                  onClick={(e) => handleSubmit(e as unknown as FormEvent)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#b8860b] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#d4991a] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    'Registering...'
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Register My Documents (Free)
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
