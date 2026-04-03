import Link from 'next/link';
import { Newspaper, Calendar, Tag, ArrowRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News',
};

type Category = 'Announcements' | 'Policy' | 'Education' | 'Research';

interface Article {
  title: string;
  date: string;
  excerpt: string;
  category: Category;
  comingSoon?: boolean;
}

const CATEGORY_COLORS: Record<Category, string> = {
  Announcements: 'bg-blue-100 text-blue-700',
  Policy: 'bg-purple-100 text-purple-700',
  Education: 'bg-green-100 text-green-700',
  Research: 'bg-amber-100 text-amber-700',
};

const articles: Article[] = [
  {
    title: 'UEDRA Submits Study Committee Proposal to Uniform Law Commission',
    date: 'April 2026',
    excerpt:
      'UEDRA has formally submitted a proposal to the Uniform Law Commission requesting the formation of a study committee to examine the need for a uniform estate document registry act. The proposal outlines how existing state-level fragmentation leaves consumers vulnerable and argues for a coordinated national approach built on the EDRS-1.0 standard.',
    category: 'Policy',
  },
  {
    title: 'Why Estate Documents Need the Same Protection as Property Deeds',
    date: 'April 2026',
    excerpt:
      'Property deeds have enjoyed systematic registration and protection for centuries. Powers of attorney, advance directives, and wills have not. This article explores the stark gap in document security and why a modern registry infrastructure is overdue for estate planning documents.',
    category: 'Education',
  },
  {
    title: 'EDRS-1.0 Published: The First Open Standard for Estate Document Registries',
    date: 'March 2026',
    excerpt:
      'The Estate Document Registry Standard version 1.0 has been officially published, establishing the first open, interoperable technical standard for estate document registries. EDRS-1.0 defines requirements for document registration, verification, access control, and audit logging across providers.',
    category: 'Announcements',
  },
  {
    title: 'The $5 Billion Problem: Elder Financial Exploitation and Power of Attorney Fraud',
    date: 'Coming Soon',
    excerpt:
      'An in-depth look at the scale of elder financial exploitation in the United States, the role power of attorney abuse plays, and how document registry infrastructure can serve as a critical prevention tool. Drawing on GAO data, ABA reports, and state-level enforcement statistics.',
    category: 'Research',
    comingSoon: true,
  },
];

const categories: Category[] = ['Announcements', 'Policy', 'Education', 'Research'];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* Hero */}
      <section className="bg-[#0f2b5b] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-[#b8860b]" />
            <h1 className="text-4xl font-bold">News &amp; Updates</h1>
          </div>
          <p className="text-lg text-blue-200 max-w-3xl">
            The latest on UEDRA legislation, EDRS standards development, and estate document registry
            policy across the United States.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${CATEGORY_COLORS[cat]}`}
            >
              <Tag className="w-3.5 h-3.5" />
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-6xl mx-auto px-6 mt-10 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article, i) => (
            <article
              key={i}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-shadow hover:shadow-md ${
                article.comingSoon ? 'opacity-80' : ''
              }`}
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[article.category]}`}>
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    {article.comingSoon ? (
                      <Clock className="w-3.5 h-3.5" />
                    ) : (
                      <Calendar className="w-3.5 h-3.5" />
                    )}
                    {article.date}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#0f2b5b] mb-3 leading-tight">
                  {article.title}
                </h2>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                <div className="mt-5">
                  {article.comingSoon ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400">
                      <Clock className="w-4 h-4" />
                      Coming Soon
                    </span>
                  ) : (
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b8860b] hover:text-[#9a7209] transition-colors"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-[#0f2b5b] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Informed</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Get updates on UEDRA legislative progress, new EDRS standards releases, and estate
            document registry policy developments.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a7209] transition-colors"
          >
            Subscribe to Updates
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
