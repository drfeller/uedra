import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legislative Tracker',
};

export default function LegislativeTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
