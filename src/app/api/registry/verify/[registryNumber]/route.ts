import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { toVerificationResult } from '@/lib/registry';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ registryNumber: string }> }
) {
  try {
    const { registryNumber } = await params;

    if (!registryNumber) {
      return NextResponse.json({ error: 'Registry number is required' }, { status: 400 });
    }

    // Look up document registration
    const { data: doc, error: docError } = await supabase
      .from('document_registrations')
      .select('*')
      .eq('registry_number', registryNumber.toUpperCase())
      .single();

    if (docError || !doc) {
      return NextResponse.json({ error: 'No record found' }, { status: 404 });
    }

    // Get registrant (public fields only — never SSN, email, phone)
    const { data: registrant, error: regError } = await supabase
      .from('registrants')
      .select('first_name, middle_name, last_name, state')
      .eq('id', doc.registrant_id)
      .single();

    if (regError || !registrant) {
      return NextResponse.json({ error: 'Registrant not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      result: toVerificationResult(doc, registrant),
    });
  } catch (err) {
    console.error('Verify error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
