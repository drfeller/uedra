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
