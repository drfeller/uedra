import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    // Save to Supabase
    const { error } = await supabase
      .from('contact_submissions')
      .insert({ name, email, subject, message });

    if (error) {
      console.error('Supabase insert error:', error);
      return Response.json(
        { error: 'Failed to save submission' },
        { status: 500 },
      );
    }

    // Send notification email via Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'UEDRA <noreply@uedra.org>',
            to: ['info@uedra.org'],
            subject: `[UEDRA Contact] ${subject} — from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          }),
        });
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr);
        // Don't fail the request — submission was saved
      }
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 },
    );
  }
}
