import { Shield, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export default async function VerifyCertificationPage({ params }: VerifyPageProps) {
  const { id } = await params;

  // Fetch verification from our API
  let verification = null;
  let error = false;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://uedra.org';
    const res = await fetch(`${baseUrl}/api/certification/verify?id=${encodeURIComponent(id)}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      verification = await res.json();
    } else {
      error = true;
    }
  } catch {
    error = true;
  }

  if (error || !verification) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificate Not Found</h1>
        <p className="text-gray-600 mb-6">
          No certification was found for certificate number <strong>{id}</strong>.
          Please check the number and try again.
        </p>
        <a href="/certification" className="text-[#0f2b5b] font-medium hover:underline">
          View Certified Providers →
        </a>
      </div>
    );
  }

  const isValid = verification.valid === true;
  const data = verification.data;

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <Shield className="w-10 h-10 text-[#0f2b5b] mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-[#0f2b5b]">Certificate Verification</h1>
      </div>

      <div className={`border-2 rounded-xl p-8 text-center ${
        isValid ? 'border-green-500 bg-green-50' : 'border-red-300 bg-red-50'
      }`}>
        {isValid ? (
          <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
        ) : data?.status === 'expired' ? (
          <Clock className="w-14 h-14 text-amber-500 mx-auto mb-4" />
        ) : (
          <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
        )}

        <h2 className={`text-xl font-bold mb-2 ${isValid ? 'text-green-800' : 'text-red-800'}`}>
          {isValid ? 'Valid Certification' : data?.status === 'expired' ? 'Certification Expired' : 'Invalid'}
        </h2>

        {data && (
          <div className="mt-6 space-y-3 text-left">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-500">Company</span>
              <span className="text-sm font-semibold text-gray-900">{data.companyName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-500">Certificate</span>
              <span className="text-sm font-mono text-gray-900">{data.certificateNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-500">Compliance Score</span>
              <span className="text-sm font-semibold text-gray-900">{data.complianceScore}%</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-500">Certified</span>
              <span className="text-sm text-gray-900">
                {data.certifiedAt ? new Date(data.certifiedAt).toLocaleDateString() : '—'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-500">Expires</span>
              <span className="text-sm text-gray-900">
                {data.expiresAt ? new Date(data.expiresAt).toLocaleDateString() : '—'}
              </span>
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-center text-gray-400">
        Verified by the Universal Estate Document Registry Association (UEDRA)
      </p>
    </div>
  );
}
