import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client with service role (for API routes)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Types matching our Supabase tables
export interface CertificationApplication {
  id?: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  website: string;
  state: string;
  years_operating: number;
  document_types_supported: string[];
  monthly_active_users: number;
  self_assessment: Record<string, unknown>;
  score: number;
  max_score: number;
  percentage: number;
  status: 'submitted' | 'reviewing' | 'approved' | 'denied';
  mandatory_passed: boolean;
  failed_items: string[];
  recommendations: string[];
  evidence_urls: string[];
  payment_id: string | null;
  certificate_number: string | null;
  certificate_url: string | null;
  certified_at: string | null;
  expires_at: string | null;
  created_at?: string;
}

export interface CertifiedProvider {
  id?: string;
  application_id: string;
  company_name: string;
  website: string;
  certified_date: string;
  expiry_date: string;
  certificate_url: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface Donation {
  id?: string;
  amount: number;
  donor_name: string;
  donor_email: string;
  recurring: boolean;
  payment_id: string | null;
  created_at?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}
