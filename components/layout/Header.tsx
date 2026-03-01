import Link from 'next/link';

const navItems = [
  { label: 'Modelagentur', href: '/agencies', highlight: true },
  { label: 'Talent Agentur', href: '/agencies?type=Talent%20Agentur' },
  { label: 'Casting Agentur', href: '/agencies?type=Casting%20Agentur' },
  { label: 'Hostess Agentur', href: '/agencies?type=Hostess%20Agentur' },
];

export function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-4">
        <Link href="/" className="text-2xl font-serif font-semibold tracking-wide text-navy">
          Model-europa.de
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative pb-1 transition-colors hover:text-navy ${
                item.highlight ? 'text-navy' : ''
              }`}
            >
              {item.label}
              {item.highlight && (
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 text-sm">
          <Link
            href="/bewerben"
            className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-navy/90"
          >
            Bewerben
          </Link>
          <Link
            href="mailto:datenschutz.agenturfinder@proton.me"
            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-800 hover:border-navy hover:text-navy"
          >
            Kontakt
          </Link>
          <Link
            href="/karte"
            className="hidden text-xs font-semibold text-slate-700 hover:text-navy sm:inline"
          >
            Karte
          </Link>
        </div>
      </div>
    </header>
  );
}

