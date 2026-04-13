import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/ses';
import {
  hashSSN4,
  ssnHint,
  generateRegistryNumber,
  DOCUMENT_TYPES,
  STORAGE_LOCATIONS,
  type DocumentType,
  type StorageLocation,
} from '@/lib/registry';

interface DocumentInput {
  document_type: DocumentType;
  storage_location: StorageLocation | string;
  storage_location_other?: string;
  contact_name: string;
  contact_phone: string;
  contact_email?: string;
}

interface RegistrationBody {
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  state: string;
  ssn_last4: string;
  email: string;
  phone?: string;
  documents: DocumentInput[];
  emergency_contact: {
    full_name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  reminder_opt_in?: boolean;
}

export async function POST(request: Request) {
  try {
    const body: RegistrationBody = await request.json();

    // Validate required fields
    const { first_name, last_name, date_of_birth, state, ssn_last4, email, documents, emergency_contact } = body;

    if (!first_name || !last_name || !date_of_birth || !state || !ssn_last4 || !email) {
      return NextResponse.json({ error: 'Missing required identity fields' }, { status: 400 });
    }

    if (ssn_last4.length !== 4 || !/^\d{4}$/.test(ssn_last4)) {
      return NextResponse.json({ error: 'SSN last 4 must be exactly 4 digits' }, { status: 400 });
    }

    if (!documents || documents.length === 0) {
      return NextResponse.json({ error: 'At least one document is required' }, { status: 400 });
    }

    if (!emergency_contact?.full_name || !emergency_contact?.phone || !emergency_contact?.email) {
      return NextResponse.json({ error: 'Emergency contact is required' }, { status: 400 });
    }

    // Validate document types
    for (const doc of documents) {
      if (!(doc.document_type in DOCUMENT_TYPES)) {
        return NextResponse.json({ error: `Invalid document type: ${doc.document_type}` }, { status: 400 });
      }
      if (!doc.contact_name || !doc.contact_phone) {
        return NextResponse.json({ error: 'Each document requires a contact name and phone' }, { status: 400 });
      }
    }

    // Hash SSN last 4
    const ssnHash = await hashSSN4(ssn_last4);
    const hint = ssnHint(ssn_last4);

    // Upsert registrant (dedup on name+DOB+state)
    const { data: registrant, error: regError } = await supabase
      .from('registrants')
      .upsert(
        {
          first_name: first_name.trim(),
          middle_name: body.middle_name?.trim() || null,
          last_name: last_name.trim(),
          date_of_birth,
          state,
          ssn_last4: ssnHash,
          ssn_last4_hint: hint,
          email: email.trim().toLowerCase(),
          phone: body.phone?.trim() || null,
          reminder_opt_in: body.reminder_opt_in ?? true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'first_name,last_name,date_of_birth,state' }
      )
      .select('id')
      .single();

    if (regError || !registrant) {
      return NextResponse.json(
        { error: `Registration failed: ${regError?.message}` },
        { status: 500 }
      );
    }

    // Generate registry numbers and insert documents
    const registryNumbers: { document_type: string; registry_number: string; label: string }[] = [];

    for (const doc of documents) {
      const registryNumber = await generateRegistryNumber(state);
      const tier =
        doc.storage_location === 'verauth_vault' ? 'certified_vault' : 'self_registered';

      const { error: docError } = await supabase.from('document_registrations').insert({
        registrant_id: registrant.id,
        registry_number: registryNumber,
        document_type: doc.document_type,
        storage_location: doc.storage_location,
        storage_location_other: doc.storage_location_other || null,
        contact_name: doc.contact_name.trim(),
        contact_phone: doc.contact_phone.trim(),
        contact_email: doc.contact_email?.trim() || null,
        status: 'active',
        verification_tier: tier,
        certified_provider: tier === 'certified_vault' ? 'verauth' : null,
      });

      if (docError) {
        console.error('Document insert error:', docError);
        continue;
      }

      registryNumbers.push({
        document_type: doc.document_type,
        registry_number: registryNumber,
        label: DOCUMENT_TYPES[doc.document_type],
      });
    }

    // Upsert emergency contact
    await supabase
      .from('emergency_contacts')
      .upsert(
        {
          registrant_id: registrant.id,
          full_name: emergency_contact.full_name.trim(),
          relationship: emergency_contact.relationship,
          phone: emergency_contact.phone.trim(),
          email: emergency_contact.email.trim().toLowerCase(),
        },
        { onConflict: 'registrant_id' }
      );

    // Send confirmation email (best-effort)
    try {
      const docList = registryNumbers
        .map((d) => `  - ${d.label}: ${d.registry_number}`)
        .join('\n');

      const hasNonVault = documents.some((d) => d.storage_location !== 'verauth_vault');

      let emailBody = `Hello ${first_name},\n\n`;
      emailBody += `Thank you for registering your estate documents with the UEDRA National Registry.\n\n`;
      emailBody += `Your registry numbers:\n${docList}\n\n`;
      emailBody += `Important: Write these numbers on your physical documents and keep a copy in your wallet or phone.\n\n`;
      emailBody += `Institutions (banks, hospitals, attorneys) can verify your documents at https://uedra.org/verify\n\n`;

      if (hasNonVault) {
        emailBody += `---\n\n`;
        emailBody += `Want your family to access these documents instantly, without calling anyone? `;
        emailBody += `VerAuth offers encrypted vault storage with real-time delivery to authorized parties. `;
        emailBody += `Learn more at https://verauth.net\n\n`;
      }

      emailBody += `You will receive an annual reminder to confirm your documents are still current.\n\n`;
      emailBody += `- UEDRA Registry Team\nhttps://uedra.org`;

      await sendEmail({
        to: email,
        subject: 'UEDRA Registry: Your Documents Are Registered',
        bodyText: emailBody,
      });
    } catch (emailErr) {
      console.error('Confirmation email failed (non-fatal):', emailErr);
    }

    return NextResponse.json({
      success: true,
      registrant_id: registrant.id,
      registry_numbers: registryNumbers,
    });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
