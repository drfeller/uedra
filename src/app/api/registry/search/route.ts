import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { compareSSN4, toVerificationResult } from '@/lib/registry';

interface SearchBody {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  state: string;
  ssn_last4?: string;
}

export async function POST(request: Request) {
  try {
    const body: SearchBody = await request.json();
    const { first_name, last_name, date_of_birth, state, ssn_last4 } = body;

    // Require all 4 core fields (anti-enumeration)
    if (!first_name || !last_name || !date_of_birth || !state) {
      return NextResponse.json(
        { error: 'First name, last name, date of birth, and state are all required' },
        { status: 400 }
      );
    }

    // Search registrants
    let query = supabase
      .from('registrants')
      .select('id, first_name, middle_name, last_name, state, ssn_last4')
      .ilike('first_name', first_name.trim())
      .ilike('last_name', last_name.trim())
      .eq('date_of_birth', date_of_birth)
      .eq('state', state);

    const { data: registrants, error: regError } = await query;

    if (regError) {
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }

    if (!registrants || registrants.length === 0) {
      return NextResponse.json({ success: true, results: [] });
    }

    // If SSN last-4 provided, filter by hash comparison
    let filteredRegistrants = registrants;
    if (ssn_last4 && ssn_last4.length === 4) {
      const matched = [];
      for (const reg of registrants) {
        const isMatch = await compareSSN4(ssn_last4, reg.ssn_last4);
        if (isMatch) matched.push(reg);
      }
      filteredRegistrants = matched;
    }

    if (filteredRegistrants.length === 0) {
      return NextResponse.json({ success: true, results: [] });
    }

    // Get document registrations for all matched registrants
    const registrantIds = filteredRegistrants.map((r) => r.id);
    const { data: docs, error: docError } = await supabase
      .from('document_registrations')
      .select('*')
      .in('registrant_id', registrantIds)
      .order('created_at', { ascending: false });

    if (docError) {
      return NextResponse.json({ error: 'Document lookup failed' }, { status: 500 });
    }

    // Map to public verification results (never expose SSN, email, phone)
    const registrantMap = Object.fromEntries(
      filteredRegistrants.map((r) => [
        r.id,
        { first_name: r.first_name, middle_name: r.middle_name, last_name: r.last_name, state: r.state },
      ])
    );

    const results = (docs ?? []).map((doc) =>
      toVerificationResult(doc, registrantMap[doc.registrant_id])
    );

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error('Search error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
