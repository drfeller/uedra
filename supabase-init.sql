-- UEDRA Database Tables

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount NUMERIC(10,2) NOT NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  recurring BOOLEAN DEFAULT false,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS certification_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  website TEXT NOT NULL,
  state TEXT,
  years_operating INTEGER DEFAULT 0,
  document_types_supported TEXT[] DEFAULT '{}',
  monthly_active_users INTEGER DEFAULT 0,
  self_assessment JSONB DEFAULT '{}',
  score NUMERIC(5,1) DEFAULT 0,
  max_score NUMERIC(5,1) DEFAULT 0,
  percentage INTEGER DEFAULT 0,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'approved', 'denied')),
  mandatory_passed BOOLEAN DEFAULT false,
  failed_items TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',
  evidence_urls TEXT[] DEFAULT '{}',
  payment_id TEXT,
  certificate_number TEXT UNIQUE,
  certificate_url TEXT,
  certified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS certified_providers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES certification_applications(id),
  company_name TEXT NOT NULL,
  website TEXT NOT NULL,
  certified_date TIMESTAMPTZ NOT NULL,
  expiry_date TIMESTAMPTZ NOT NULL,
  certificate_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create storage bucket for certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('uedra-certificates', 'uedra-certificates', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- FREE REGISTRY TABLES
-- ============================================================

-- Core registrant identity
CREATE TABLE IF NOT EXISTS registrants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  state TEXT NOT NULL,
  ssn_last4 TEXT NOT NULL,
  ssn_last4_hint TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  reminder_opt_in BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(first_name, last_name, date_of_birth, state)
);

-- Registry number sequence counter
CREATE TABLE IF NOT EXISTS registry_sequences (
  state TEXT NOT NULL,
  year INTEGER NOT NULL,
  last_seq INTEGER DEFAULT 0,
  PRIMARY KEY (state, year)
);

-- Atomic sequence increment function
CREATE OR REPLACE FUNCTION next_registry_seq(p_state TEXT, p_year INTEGER)
RETURNS INTEGER AS $$
DECLARE
  v_seq INTEGER;
BEGIN
  INSERT INTO registry_sequences (state, year, last_seq)
  VALUES (p_state, p_year, 1)
  ON CONFLICT (state, year)
  DO UPDATE SET last_seq = registry_sequences.last_seq + 1
  RETURNING last_seq INTO v_seq;
  RETURN v_seq;
END;
$$ LANGUAGE plpgsql;

-- One row per registered document
CREATE TABLE IF NOT EXISTS document_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registrant_id UUID REFERENCES registrants(id) ON DELETE CASCADE,
  registry_number TEXT UNIQUE NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN (
    'will', 'trust', 'financial_poa', 'healthcare_poa',
    'advance_directive', 'hipaa_authorization'
  )),
  storage_location TEXT NOT NULL,
  storage_location_other TEXT,
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'updated')),
  verification_tier TEXT DEFAULT 'self_registered' CHECK (
    verification_tier IN ('self_registered', 'certified_vault')
  ),
  certified_provider TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Emergency contact (one per registrant)
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registrant_id UUID REFERENCES registrants(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Edit tokens for passwordless updates
CREATE TABLE IF NOT EXISTS edit_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registrant_id UUID REFERENCES registrants(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Annual reminder tracking
CREATE TABLE IF NOT EXISTS reminder_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registrant_id UUID REFERENCES registrants(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ DEFAULT now(),
  email_message_id TEXT,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ
);

-- Indexes for verification lookups
CREATE INDEX IF NOT EXISTS idx_doc_reg_registry_number ON document_registrations(registry_number);
CREATE INDEX IF NOT EXISTS idx_doc_reg_registrant ON document_registrations(registrant_id);
CREATE INDEX IF NOT EXISTS idx_registrants_lookup ON registrants(last_name, first_name, date_of_birth, state);
CREATE INDEX IF NOT EXISTS idx_registrants_email ON registrants(email);
