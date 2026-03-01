import type { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
  variant?: 'default' | 'compact' | 'contact-cta';
};

export function BlurredBlock({ children, variant = 'default' }: Props) {
  if (variant === 'contact-cta') {
    return (
      <div className="blurred-block relative rounded-xl bg-slate-100/80">
        <div className="blurred-block-content p-3 text-sm text-slate-700">
          <p className="mb-3">Erhalten Sie die vollständigen Kontaktdaten per E-Mail – kostenlos und sofort.</p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white hover:bg-navy/90"
          >
            Kontaktdaten anfordern →
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="blurred-block relative rounded-xl bg-slate-100/80">
      <div className="blurred-block-content p-3 text-sm text-slate-700">{children}</div>
    </div>
  );
}

