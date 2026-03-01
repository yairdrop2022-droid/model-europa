import Link from 'next/link';

const MAIN_CITIES = [
  { name: 'Berlin', param: 'Berlin' },
  { name: 'München', param: 'München' },
  { name: 'Hamburg', param: 'Hamburg' },
  { name: 'Frankfurt', param: 'Frankfurt' },
  { name: 'Köln', param: 'Köln' },
  { name: 'Stuttgart', param: 'Stuttgart' },
] as const;

export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-800 bg-black py-6 text-xs text-slate-400">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">© 2026 Model-europa.de</div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <span className="h-3 w-px bg-slate-700" />
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
          </div>
          <div className="text-center sm:text-right">
            <a
              href="mailto:datenschutz.agenturfinder@proton.me"
              className="hover:text-white"
            >
              Kontakt
            </a>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-slate-800 pt-4 text-[11px] text-slate-500">
          {MAIN_CITIES.map((city) => (
            <Link
              key={city.param}
              href={`/?city=${encodeURIComponent(city.param)}`}
              className="hover:text-white"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

