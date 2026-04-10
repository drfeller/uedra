import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const region = process.env.AWS_REGION || 'us-west-2';

// Single shared client — AWS SDK handles pooling internally.
export const sesClient = new SESClient({ region });

export const FROM_ADDRESS = 'UEDRA <contact@uedra.org>';

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  bodyText: string;
  bodyHtml?: string;
  replyTo?: string;
  from?: string;
}

/**
 * Thin wrapper around SES SendEmailCommand. Throws on failure so the caller
 * can decide whether to fail the request or swallow (e.g. auto-reply is
 * best-effort, primary notification is required).
 */
export async function sendEmail({
  to,
  subject,
  bodyText,
  bodyHtml,
  replyTo,
  from,
}: SendEmailInput) {
  const toArray = Array.isArray(to) ? to : [to];

  const command = new SendEmailCommand({
    Source: from || FROM_ADDRESS,
    Destination: { ToAddresses: toArray },
    ReplyToAddresses: replyTo ? [replyTo] : undefined,
    Message: {
      Subject: { Data: subject, Charset: 'UTF-8' },
      Body: {
        Text: { Data: bodyText, Charset: 'UTF-8' },
        ...(bodyHtml ? { Html: { Data: bodyHtml, Charset: 'UTF-8' } } : {}),
      },
    },
  });

  return sesClient.send(command);
}
