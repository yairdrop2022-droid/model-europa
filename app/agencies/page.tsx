import agencies from '@/data/agencies';
import { FilterSidebar } from '@/components/agencies/FilterSidebar';
import { AgencyGrid } from '@/components/agencies/AgencyGrid';

export const runtime = 'edge';

type Props = {
  searchParams?: { q?: string };
};

export default function AgenciesPage({ searchParams }: Props) {
  const initialQuery = searchParams?.q ?? null;

  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-6 font-serif text-2xl font-semibold text-slate-900">
          Modelagenturen in Deutschland
        </h1>
        <div className="flex flex-col gap-6 lg:flex-row">
          <FilterSidebar agencies={agencies} />
          <AgencyGrid agencies={agencies} initialQuery={initialQuery} />
        </div>
      </div>
    </div>
  );
}

