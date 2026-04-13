import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

// --- Document types ---
export const DOCUMENT_TYPES = {
  will: 'Last Will and Testament',
  trust: 'Revocable Living Trust',
  financial_poa: 'Financial Power of Attorney',
  healthcare_poa: 'Healthcare Power of Attorney / Medical Directive',
  advance_directive: 'Advance Directive / Living Will',
  hipaa_authorization: 'HIPAA Authorization',
} as const;

export type DocumentType = keyof typeof DOCUMENT_TYPES;

// --- Storage locations ---
export const STORAGE_LOCATIONS = {
  attorney_office: "Attorney's office",
  safe_deposit_box: 'Safe deposit box (bank)',
  home_safe: 'Home safe or lockbox',
  county_clerk: 'Filed with county clerk / court',
  verauth_vault: 'VerAuth Vault (certified)',
  other: 'Other',
} as const;

export type StorageLocation = keyof typeof STORAGE_LOCATIONS;

// --- Relationships ---
export const RELATIONSHIPS = [
  'Spouse',
  'Child',
  'Sibling',
  'Parent',
  'Attorney',
  'Other',
] as const;

export type Relationship = (typeof RELATIONSHIPS)[number];

// --- US States + DC + territories ---
export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'GU', name: 'Guam' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'VI', name: 'U.S. Virgin Islands' },
] as const;

// --- SSN hashing ---
const SSN_SALT_ROUNDS = 10;

export async function hashSSN4(ssn4: string): Promise<string> {
  return bcrypt.hash(ssn4, SSN_SALT_ROUNDS);
}

export async function compareSSN4(
  input: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(input, hash);
}

export function ssnHint(ssn4: string): string {
  return ssn4.slice(-2);
}

// --- Registry number generation ---
export async function generateRegistryNumber(state: string): Promise<string> {
  const year = new Date().getFullYear();

  // Atomic increment via upsert + returning
  const { data, error } = await supabase.rpc('next_registry_seq', {
    p_state: state,
    p_year: year,
  });

  if (error) {
    // Fallback: manual upsert if RPC not available yet
    const { data: upserted, error: upsertErr } = await supabase
      .from('registry_sequences')
      .upsert(
        { state, year, last_seq: 1 },
        { onConflict: 'state,year', ignoreDuplicates: false }
      )
      .select('last_seq')
      .single();

    if (upsertErr) throw new Error(`Failed to generate registry number: ${upsertErr.message}`);

    // If upsert returned 1, that's our seq. Otherwise increment.
    const seq = upserted?.last_seq ?? 1;
    const padded = String(seq).padStart(6, '0');
    return `UEDRA-${state}-${year}-${padded}`;
  }

  const seq = data as number;
  const padded = String(seq).padStart(6, '0');
  return `UEDRA-${state}-${year}-${padded}`;
}

// --- TypeScript interfaces ---
export interface Registrant {
  id?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  state: string;
  ssn_last4: string; // bcrypt hash
  ssn_last4_hint: string; // last 2 digits only
  email: string;
  phone?: string;
  reminder_opt_in: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DocumentRegistration {
  id?: string;
  registrant_id: string;
  registry_number: string;
  document_type: DocumentType;
  storage_location: string;
  storage_location_other?: string;
  contact_name: string;
  contact_phone: string;
  contact_email?: string;
  status: 'active' | 'revoked' | 'updated';
  verification_tier: 'self_registered' | 'certified_vault';
  certified_provider?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EmergencyContact {
  id?: string;
  registrant_id: string;
  full_name: string;
  relationship: string;
  phone: string;
  email: string;
  created_at?: string;
}

export interface EditToken {
  id?: string;
  registrant_id: string;
  token: string;
  expires_at: string;
  used_at?: string;
  created_at?: string;
}

// --- Public verification result (never includes SSN, registrant email/phone) ---
export interface VerificationResult {
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

export function toVerificationResult(
  doc: DocumentRegistration,
  registrant: { first_name: string; middle_name?: string; last_name: string; state: string }
): VerificationResult {
  const fullName = [registrant.first_name, registrant.middle_name, registrant.last_name]
    .filter(Boolean)
    .join(' ');

  return {
    registry_number: doc.registry_number,
    document_type: doc.document_type,
    document_type_label: DOCUMENT_TYPES[doc.document_type] ?? doc.document_type,
    status: doc.status,
    storage_location: doc.storage_location,
    storage_location_label:
      STORAGE_LOCATIONS[doc.storage_location as StorageLocation] ?? doc.storage_location,
    storage_location_other: doc.storage_location_other,
    contact_name: doc.contact_name,
    contact_phone: doc.contact_phone,
    contact_email: doc.contact_email,
    verification_tier: doc.verification_tier,
    certified_provider: doc.certified_provider,
    registrant_name: fullName,
    registrant_state: registrant.state,
    registered_at: doc.created_at ?? '',
    updated_at: doc.updated_at ?? '',
  };
}
