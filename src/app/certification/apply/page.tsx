'use client';

import { useState } from 'react';
import { Shield, CheckCircle2, XCircle, Clock, ArrowRight, ArrowLeft, Building2, ClipboardCheck, Upload, CreditCard, FileSearch } from 'lucide-react';
import { EDRS_SECTIONS, type SelfAssessmentSection, type SelfAssessmentItem } from '@/lib/certification-engine';

type Step = 1 | 2 | 3 | 4 | 5;

export default function CertificationApplyPage() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  // Step 1: Company Info
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState('');
  const [yearsOperating, setYearsOperating] = useState('');

  // Step 2: Self-Assessment
  const [sections, setSections] = useState<SelfAssessmentSection[]>(
    EDRS_SECTIONS.map((s) => ({
      ...s,
      items: s.items.map((item) => ({ ...item })),
    })),
  );

  // Calculate live score
  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const answeredItems = sections.reduce(
    (acc, s) => acc + s.items.filter((i) => i.answer !== 'no').length,
    0,
  );
  const score = sections.reduce(
    (acc, s) =>
      acc + s.items.reduce((a, i) => a + (i.answer === 'yes' ? 1 : i.answer === 'partial' ? 0.5 : 0), 0),
    0,
  );
  const percentage = totalItems > 0 ? Math.round((score / totalItems) * 100) : 0;

  const updateAnswer = (sectionIdx: number, itemIdx: number, answer: 'yes' | 'partial' | 'no') => {
    const updated = [...sections];
    updated[sectionIdx] = {
      ...updated[sectionIdx],
      items: updated[sectionIdx].items.map((item, i) =>
        i === itemIdx ? { ...item, answer } : item,
      ),
    };
    setSections(updated);
  };

  // Step 5: Submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/certification/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactName,
          contactEmail,
          website,
          state,
          yearsOperating: parseInt(yearsOperating) || 0,
          selfAssessment: sections,
          evidenceUrls: [],
        }),
      });

      const data = await res.json();
      setResult(data.data || data);
    } catch {
      setResult({ status: 'error', error: 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Result page
  if (result) {
    const status = result.status as string;
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {status === 'approved' ? (
          <>
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#0f2b5b] mb-3">Certification Approved!</h1>
            <p className="text-gray-600 mb-2">
              <strong>{companyName}</strong> has been certified as EDRS-1.0 compliant
              with a score of <strong>{result.percentage as number}%</strong>.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Certificate: <code className="bg-gray-100 px-2 py-0.5 rounded">{result.certificateNumber as string}</code>
            </p>
            {result.certificateUrl && (
              <a
                href={result.certificateUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f2b5b] text-white rounded-lg hover:bg-[#1a3d7a] transition mb-4"
              >
                Download Certificate
              </a>
            )}
          </>
        ) : status === 'review' ? (
          <>
            <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#0f2b5b] mb-3">Application Under Review</h1>
            <p className="text-gray-600 mb-6">
              Your application scored <strong>{result.percentage as number}%</strong> and will be reviewed
              by the UEDRA Standards Council. We&apos;ll notify you within 5 business days.
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Requirements Not Met</h1>
            <p className="text-gray-600 mb-4">
              Score: <strong>{(result.percentage as number) || 0}%</strong> (minimum 80% required with all mandatory items).
            </p>
            {Array.isArray(result.recommendations) && (result.recommendations as string[]).length > 0 && (
              <div className="text-left bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-red-800 mb-2">Recommendations:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
                  {(result.recommendations as string[]).map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        <a href="/certification" className="text-[#0f2b5b] font-medium hover:underline">
          ← Back to Certification
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <Shield className="w-10 h-10 text-[#0f2b5b] mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-[#0f2b5b]">EDRS-1.0 Certification Application</h1>
        <p className="text-gray-500 mt-1">$2,500 annual certification fee</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
        {[
          { n: 1, label: 'Company', icon: Building2 },
          { n: 2, label: 'Assessment', icon: ClipboardCheck },
          { n: 3, label: 'Evidence', icon: Upload },
          { n: 4, label: 'Payment', icon: CreditCard },
          { n: 5, label: 'Review', icon: FileSearch },
        ].map((s) => (
          <div key={s.n} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= s.n ? 'bg-[#0f2b5b] text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              {step > s.n ? '✓' : s.n}
            </div>
            <span className="text-[10px] text-gray-500 mt-1">{s.label}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: Company Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website *</label>
              <input type="url" required value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
              <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
              <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. CA"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years Operating</label>
              <input type="number" value={yearsOperating} onChange={(e) => setYearsOperating(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b]" />
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!companyName || !contactName || !contactEmail || !website}
            className="mt-4 w-full py-3 bg-[#0f2b5b] text-white rounded-xl font-semibold hover:bg-[#1a3d7a] disabled:bg-gray-200 disabled:text-gray-400 transition flex items-center justify-center gap-2"
          >
            Continue to Self-Assessment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Self-Assessment */}
      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Self-Assessment Checklist</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#0f2b5b]">{percentage}%</div>
              <div className="text-xs text-gray-500">{answeredItems}/{totalItems} items</div>
            </div>
          </div>

          {/* Score bar */}
          <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                percentage >= 80 ? 'bg-green-500' : percentage >= 70 ? 'bg-amber-500' : 'bg-red-400'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="space-y-6">
            {sections.map((section, si) => (
              <div key={section.sectionId} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-sm text-gray-900">{section.sectionName}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.items.map((item, ii) => (
                    <div key={item.id} className="px-4 py-3 flex items-start gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">
                          {item.mandatory && <span className="text-red-500 font-bold mr-1">⚠️</span>}
                          {item.question}
                        </p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {(['yes', 'partial', 'no'] as const).map((answer) => (
                          <button
                            key={answer}
                            onClick={() => updateAnswer(si, ii, answer)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                              item.answer === answer
                                ? answer === 'yes'
                                  ? 'bg-green-100 text-green-700 ring-1 ring-green-300'
                                  : answer === 'partial'
                                    ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-300'
                                    : 'bg-red-100 text-red-600 ring-1 ring-red-300'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            {answer === 'yes' ? 'Yes' : answer === 'partial' ? 'Partial' : 'No'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(3)} className="flex-1 py-3 bg-[#0f2b5b] text-white rounded-xl font-semibold hover:bg-[#1a3d7a] transition flex items-center justify-center gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Evidence Upload */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Supporting Evidence</h2>
          <p className="text-sm text-gray-500 mb-6">
            Upload any supporting documentation: architecture diagrams, security audit reports,
            compliance certifications, or API documentation. (Optional but strengthens your application.)
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mb-6">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Evidence upload will be available when Supabase Storage is configured.</p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOCX — up to 20MB each</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(4)} className="flex-1 py-3 bg-[#0f2b5b] text-white rounded-xl font-semibold hover:bg-[#1a3d7a] transition flex items-center justify-center gap-2">
              Continue to Payment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Payment */}
      {step === 4 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Certification Fee</h2>
          <div className="bg-[#f8f9fc] border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-medium">EDRS-1.0 Certification</span>
              <span className="text-2xl font-bold text-[#0f2b5b]">$2,500</span>
            </div>
            <p className="text-sm text-gray-500">Annual fee. Covers evaluation, certification mark, directory listing, and 12-month validity with midpoint review.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-sm text-gray-500 mb-6">
            Payment processing will be enabled when NMI is configured.
            <br />
            <span className="text-xs text-gray-400">Secure payment via NMI/Ordr</span>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(5)} className="flex-1 py-3 bg-[#0f2b5b] text-white rounded-xl font-semibold hover:bg-[#1a3d7a] transition flex items-center justify-center gap-2">
              Review Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Review & Submit */}
      {step === 5 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Review Your Application</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Company</h3>
              <p className="font-bold text-gray-900">{companyName}</p>
              <p className="text-sm text-gray-500">{website} · {contactName} ({contactEmail})</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Self-Assessment Score</h3>
              <div className="flex items-center gap-4">
                <div className={`text-3xl font-bold ${
                  percentage >= 80 ? 'text-green-600' : percentage >= 70 ? 'text-amber-600' : 'text-red-500'
                }`}>
                  {percentage}%
                </div>
                <div className="text-sm text-gray-500">
                  {score}/{totalItems} points · {percentage >= 80 ? 'Likely to pass' : percentage >= 70 ? 'Borderline — may require review' : 'Below minimum threshold'}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Fee</h3>
              <p className="text-xl font-bold text-[#0f2b5b]">$2,500 <span className="text-sm font-normal text-gray-400">annual</span></p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(4)} className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 bg-[#b8860b] text-white rounded-xl font-semibold hover:bg-[#9a7209] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Submit Application <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
