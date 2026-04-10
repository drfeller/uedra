import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/ses';
import { getAutoReplyBody, getAutoReplySubject } from '@/lib/contact-auto-reply';

const FORWARD_TO = process.env.CONTACT_FORWARD_TO || 'drgrin373@yahoo.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    // 1. Audit log — save every submission to Supabase. This is the source
    //    of truth; email sends are best-effort on top.
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ name, email, subject, message });

    if (dbError) {
      console.error('[contact] Supabase insert error:', dbError);
      return Response.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    // 2. Forward to UEDRA inbox via SES. ReplyTo is set to the submitter so
    //    hitting "Reply" in the inbox threads naturally back to them.
    try {
      await sendEmail({
        to: FORWARD_TO,
        replyTo: email,
        subject: `[UEDRA Contact] ${subject} — ${name}`,
        bodyText:
          `New contact form submission from uedra.org\n\n` +
          `Name:    ${name}\n` +
          `Email:   ${email}\n` +
          `Subject: ${subject}\n\n` +
          `Message:\n${message}\n\n` +
          `---\nReply directly to this email to respond to the submitter.`,
      });
    } catch (err) {
      // Non-fatal: submission is saved, we just couldn't notify. Log loudly.
      console.error('[contact] SES forward failed:', err);
    }

    // 3. Auto-reply to the submitter — subject-aware template so they get an
    //    immediate, contextually useful acknowledgment instead of silence.
    try {
      await sendEmail({
        to: email,
        subject: getAutoReplySubject(subject),
        bodyText: getAutoReplyBody(subject, name),
      });
    } catch (err) {
      // Non-fatal. Submission is already saved; submitter saw a success state.
      console.error('[contact] SES auto-reply failed:', err);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[contact] unhandled error:', err);
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
