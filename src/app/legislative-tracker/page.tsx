'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, Clock, ArrowRight, CheckCircle2, CircleDot, AlertCircle, Circle } from 'lucide-react';

const UEEPDA_STATES = [
  'Colorado', 'Florida', 'Idaho', 'Indiana', 'Iowa',
  'Massachusetts', 'Michigan', 'Minnesota', 'Montana',
  'North Dakota', 'South Dakota', 'Utah', 'Virginia', 'Washington',
];

const DC = 'District of Columbia';

const ALL_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida',
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin',
  'Wyoming',
];

type StatusKey = 'ueepda' | 'enacted' | 'introduced' | 'committee' | 'not_introduced';

interface StateEntry {
  name: string;
  status: StatusKey;
  note?: string;
}

const STATUS_CONFIG: Record<StatusKey, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  enacted: { label: 'Enacted', color: 'text-green-700', bg: 'bg-green-100', icon: <CheckCircle2 className="w-4 h-4 text-green-600" /> },
  ueepda: { label: 'UEEPDA Adopted', color: 'text-blue-700', bg: 'bg-blue-100', icon: <CircleDot className="w-4 h-4 text-blue-600" /> },
  introduced: { label: 'Introduced', color: 'text-sky-700', bg: 'bg-sky-100', icon: <CircleDot className="w-4 h-4 text-sky-600" /> },
  committee: { label: 'In Committee', color: 'text-yellow-700', bg: 'bg-yellow-100', icon: <AlertCircle className="w-4 h-4 text-yellow-600" /> },
  not_introduced: { label: 'Not Yet Introduced', color: 'text-gray-500', bg: 'bg-gray-100', icon: <Circle className="w-4 h-4 text-gray-400" /> },
};

const stateData: StateEntry[] = ALL_STATES.map((name) => {
  if (UEEPDA_STATES.includes(name) || name === DC) {
    return { name, status: 'ueepda' as StatusKey, note: 'UEEPDA adopted — natural first target for UEDRA' };
  }
  return { name, status: 'not_introduced' as StatusKey };
});

const MILESTONES = [
  { date: 'March 2026', title: 'EDRS-1.0 Published', description: 'First open standard for estate document registries released.' },
  { date: 'April 2026', title: 'ULC Study Committee Proposal', description: 'UEDRA proposal submitted to the Uniform Law Commission for consideration.' },
  { date: '2026 H2', title: 'Target: First State Introduction', description: 'Seeking legislative sponsors in UEEPDA-adopted jurisdictions.' },
  { date: '2027', title: 'ULC Annual Meeting', description: 'Goal: Study committee formation and drafting authorization.' },
  { date: '2028-2029', title: 'Drafting & Adoption', description: 'Uniform act drafting with stakeholder input, leading to first state enactments.' },
];

export default function LegislativeTrackerPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusKey | 'all'>('all');

  const filtered = stateData.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    ueepda: stateData.filter((s) => s.status === 'ueepda').length,
    enacted: stateData.filter((s) => s.status === 'enacted').length,
    introduced: stateData.filter((s) => s.status === 'introduced').length,
    committee: stateData.filter((s) => s.status === 'committee').length,
    not_introduced: stateData.filter((s) => s.status === 'not_introduced').length,
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* Hero */}
      <section className="bg-[#0f2b5b] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-[#b8860b]" />
            <h1 className="text-4xl font-bold">Legislative Tracker</h1>
          </div>
          <p className="text-lg text-blue-200 max-w-3xl">
            Track the progress of UEDRA legislation across all 50 states and the District of Columbia.
            States that have adopted the Uniform Electronic Estate Planning Documents Act (UEEPDA) are
            natural first targets for UEDRA adoption.
          </p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {([
            ['ueepda', counts.ueepda],
            ['enacted', counts.enacted],
            ['introduced', counts.introduced],
            ['committee', counts.committee],
            ['not_introduced', counts.not_introduced],
          ] as [StatusKey, number][]).map(([key, count]) => {
            const cfg = STATUS_CONFIG[key];
            return (
              <button
                key={key}
                onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
                className={`rounded-xl p-4 text-center shadow-sm border transition-all ${
                  statusFilter === key ? 'ring-2 ring-[#b8860b] border-[#b8860b]' : 'border-gray-200 hover:border-gray-300'
                } bg-white`}
              >
                <div className={`text-3xl font-bold ${cfg.color}`}>{count}</div>
                <div className="text-sm text-gray-600 mt-1">{cfg.label}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] bg-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusKey | 'all')}
              className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] bg-white appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="ueepda">UEEPDA Adopted</option>
              <option value="enacted">Enacted</option>
              <option value="introduced">Introduced</option>
              <option value="committee">In Committee</option>
              <option value="not_introduced">Not Yet Introduced</option>
            </select>
          </div>
        </div>
      </section>

      {/* State Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">State</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">UEDRA Status</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700 hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((state) => {
                  const cfg = STATUS_CONFIG[state.status];
                  return (
                    <tr key={state.name} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-[#0f2b5b]">{state.name}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${cfg.bg} ${cfg.color}`}>
                          {cfg.icon}
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 hidden md:table-cell">
                        {state.note || '\u2014'}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                      No states match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-6xl mx-auto px-6 mt-16 mb-8">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-6 h-6 text-[#b8860b]" />
          <h2 className="text-2xl font-bold text-[#0f2b5b]">Key Milestones</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#0f2b5b]/20" />
          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-2 top-1.5 w-5 h-5 rounded-full border-2 border-[#0f2b5b] bg-white flex items-center justify-center">
                  {i < 2 && <div className="w-2 h-2 rounded-full bg-[#b8860b]" />}
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                  <span className="text-sm font-semibold text-[#b8860b]">{m.date}</span>
                  <h3 className="text-lg font-bold text-[#0f2b5b] mt-1">{m.title}</h3>
                  <p className="text-gray-600 mt-1">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f2b5b] py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Help Bring UEDRA to Your State</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Whether you are a legislator, attorney, financial planner, or concerned citizen, you can
            help advance estate document registry protections in your state.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a7209] transition-colors"
            >
              Contact Legislative Affairs
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Download Legislative Brief
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
