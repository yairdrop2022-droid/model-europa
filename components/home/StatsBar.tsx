export function StatsBar() {
  const stats = [
    { value: '1.786', label: 'AGENTUREN' },
    { value: '50+', label: 'STÄDTE' },
    { value: '6', label: 'KATEGORIEN' },
    { value: '1.265', label: 'MIT FOTOS' },
  ];

  return (
    <section className="w-full bg-navy py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-white">
        {stats.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center text-center">
            <span className="font-serif text-lg font-semibold tracking-wide">{item.value}</span>
            <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

