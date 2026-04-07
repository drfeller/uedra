'use client';

import { useState } from 'react';
import { Heart, CheckCircle2, ArrowRight } from 'lucide-react';

const AMOUNTS = [25, 50, 100, 250];
const DEFAULT_AMOUNT = 50;

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount < 1 || !donorName || !donorEmail) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          donorName,
          donorEmail,
          recurring,
          // paymentToken will come from NMI Collect.js when integrated
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Donation failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-[#0f2b5b] mb-3">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your ${effectiveAmount} {recurring ? 'monthly ' : ''}donation helps UEDRA protect families
          through open standards for estate document registries.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f2b5b] text-white rounded-lg hover:bg-[#1a3d7a] transition-colors"
        >
          Return Home
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Heart className="w-12 h-12 text-[#b8860b] mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-[#0f2b5b] mb-2">Support UEDRA</h1>
        <p className="text-gray-600">
          Your donation funds the development of open standards that protect families nationwide.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Selection — Quick-select pills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => { setAmount(a); setIsCustom(false); }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  !isCustom && amount === a
                    ? 'bg-[#0f2b5b] text-white shadow-md'
                    : 'bg-[#f8f9fc] text-[#0f2b5b] border border-gray-200 hover:border-[#0f2b5b]'
                }`}
              >
                ${a}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsCustom(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isCustom
                  ? 'bg-[#0f2b5b] text-white shadow-md'
                  : 'bg-[#f8f9fc] text-[#0f2b5b] border border-gray-200 hover:border-[#0f2b5b]'
              }`}
            >
              Custom
            </button>
          </div>
          {isCustom && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input
                type="number"
                min="1"
                step="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b] focus:border-transparent"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Frequency Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              type="button"
              onClick={() => setRecurring(false)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                !recurring ? 'bg-white text-[#0f2b5b] shadow-sm' : 'text-gray-500'
              }`}
            >
              One-time
            </button>
            <button
              type="button"
              onClick={() => setRecurring(true)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                recurring ? 'bg-white text-[#0f2b5b] shadow-sm' : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Donor Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f2b5b] focus:border-transparent"
            />
          </div>
        </div>

        {/* Payment — placeholder for NMI Collect.js */}
        <div className="bg-[#f8f9fc] border border-gray-200 rounded-lg p-4 text-center text-sm text-gray-500">
          Payment processing will be enabled when NMI is configured.
          <br />
          <span className="text-xs text-gray-400">Secure payment via NMI/Ordr</span>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={effectiveAmount < 1 || !donorName || !donorEmail || loading}
          className={`w-full py-3.5 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
            effectiveAmount >= 1 && donorName && donorEmail && !loading
              ? 'bg-[#b8860b] hover:bg-[#9a7209] text-white shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Heart className="w-5 h-5" />
              Donate ${effectiveAmount || '...'}
              {recurring && ' / month'}
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-400">
          UEDRA is a standards organization. Donations support open standard development.
        </p>
      </form>
    </div>
  );
}
