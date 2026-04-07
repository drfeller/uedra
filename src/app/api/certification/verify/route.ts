import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const certNumber = searchParams.get('id');

  if (!certNumber) {
    return Response.json(
      { error: 'Certificate number is required' },
      { status: 400 },
    );
  }

  const { data: application } = await supabase
    .from('certification_applications')
    .select('company_name, certificate_number, certified_at, expires_at, percentage, status')
    .eq('certificate_number', certNumber)
    .single();

  if (!application) {
    return Response.json(
      { error: 'Certificate not found', valid: false },
      { status: 404 },
    );
  }

  const isExpired = application.expires_at
    ? new Date(application.expires_at) < new Date()
    : false;

  return Response.json({
    valid: application.status === 'approved' && !isExpired,
    data: {
      companyName: application.company_name,
      certificateNumber: application.certificate_number,
      certifiedAt: application.certified_at,
      expiresAt: application.expires_at,
      complianceScore: application.percentage,
      status: isExpired ? 'expired' : application.status,
    },
  });
}
