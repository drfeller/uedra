import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, donorName, donorEmail, recurring, paymentToken } = body;

    if (!amount || !donorName || !donorEmail) {
      return Response.json(
        { error: 'Amount, name, and email are required' },
        { status: 400 },
      );
    }

    if (amount < 1) {
      return Response.json(
        { error: 'Minimum donation is $1' },
        { status: 400 },
      );
    }

    // Process payment via NMI Direct Post
    const nmiSecurityKey = process.env.NMI_SECURITY_KEY;
    let paymentId: string | null = null;

    if (nmiSecurityKey && paymentToken) {
      const nmiParams = new URLSearchParams({
        security_key: nmiSecurityKey,
        type: 'sale',
        amount: amount.toFixed(2),
        payment_token: paymentToken,
        first_name: donorName.split(' ')[0] || donorName,
        last_name: donorName.split(' ').slice(1).join(' ') || '',
        email: donorEmail,
        order_description: `UEDRA ${recurring ? 'Monthly' : 'One-time'} Donation`,
      });

      const nmiResponse = await fetch('https://secure.nmi.com/api/transact.php', {
        method: 'POST',
        body: nmiParams,
      });

      const nmiText = await nmiResponse.text();
      const nmiResult = Object.fromEntries(new URLSearchParams(nmiText));

      if (nmiResult.response !== '1') {
        return Response.json(
          { error: `Payment failed: ${nmiResult.responsetext || 'Unknown error'}` },
          { status: 402 },
        );
      }

      paymentId = nmiResult.transactionid || null;
    }

    // Save donation record
    const { error } = await supabase
      .from('donations')
      .insert({
        amount,
        donor_name: donorName,
        donor_email: donorEmail,
        recurring: recurring || false,
        payment_id: paymentId,
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return Response.json(
        { error: 'Failed to record donation' },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      paymentId,
      message: 'Thank you for your donation!',
    });
  } catch {
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 },
    );
  }
}
