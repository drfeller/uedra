'use client';

import { useState, FormEvent } from 'react';
import {
  Mail,
  Send,
  Building2,
  Shield,
  Award,
  Scale,
  Newspaper,
  CheckCircle2,
} from 'lucide-react';

const departments = [
  { name: 'General Inquiries', email: 'info@uedra.org', icon: Building2, description: 'General questions about UEDRA and estate document registries' },
  { name: 'Standards', email: 'standards@uedra.org', icon: Shield, description: 'EDRS-1.0 technical standards and API specifications' },
  { name: 'Certification', email: 'certification@uedra.org', icon: Award, description: 'EDRS certification process, audits, and compliance' },
  { name: 'Legislative Affairs', email: 'legislative@uedra.org', icon: Scale, description: 'State legislation, ULC proposal, and policy questions' },
  { name: 'Media', email: 'media@uedra.org', icon: Newspaper, description: 'Press inquiries, interviews, and media resources' },
];

const subjectOptions = [
  'General Inquiry',
  'Standards & Technical',
  'Certification',
  'Legislative Affairs',
  'Media & Press',
  'Partnership Opportunity',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true); // Still show success — best effort
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* Hero */}
      <section className="bg-[#0f2b5b] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-8 h-8 text-[#b8860b]" />
            <h1 className="text-4xl font-bold">Contact Us</h1>
          </div>
          <p className="text-lg text-blue-200 max-w-3xl">
            Reach out to our team for questions about UEDRA legislation, EDRS standards,
            certification, or partnership opportunities.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-12 pb-20">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-[#0f2b5b] mb-6">Send a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#0f2b5b] mb-2">Message Sent</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. Our team will respond within 1-2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-[#b8860b] font-semibold hover:text-[#9a7209] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] bg-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] bg-white"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] bg-white appearance-none"
                    >
                      <option value="">Select a subject...</option>
                      {subjectOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5b] bg-white resize-vertical"
                      placeholder="How can we help?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a7209] transition-colors w-full justify-center"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Department Contacts */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#0f2b5b] mb-6">Department Contacts</h2>
            <div className="space-y-4">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <div
                    key={dept.name}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0f2b5b]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#0f2b5b]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0f2b5b]">{dept.name}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{dept.description}</p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-sm font-medium text-[#b8860b] hover:text-[#9a7209] transition-colors mt-2 inline-block"
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
