import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Model-europa.de – Modelagenturen in Deutschland',
    template: '%s | Model-europa.de',
  },
  description:
    'Das größte Verzeichnis für Modelagenturen in Deutschland. 1786 Agenturen in Berlin, München, Hamburg und mehr. Jetzt kostenlos bewerben.',
  keywords: [
    'Modelagentur',
    'Model Agentur Deutschland',
    'Casting Agentur',
    'Talent Agentur',
    'Hostess Agentur',
    'Model werden',
  ],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://model-europa.de',
    siteName: 'Model-europa.de',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const runtime = 'edge';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-cream text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

