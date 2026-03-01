import agencies from "@/data/agencies";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { TopCitiesSection } from "@/components/home/TopCitiesSection";
import { AgencyGrid } from "@/components/agencies/AgencyGrid";
import { KarteSection } from "@/components/karte/KarteSection";

export const runtime = 'edge';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist eine Modelagentur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine Modelagentur vermittelt Models an Kunden aus Mode, Werbung und Entertainment. Sie übernimmt Buchungen, Vertragsverhandlungen und die Karriereberatung ihrer Talente.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie bewirbt man sich bei einer Modelagentur in Deutschland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Über Model-europa.de können Sie sich zentral bei passenden Modelagenturen bewerben. Füllen Sie das Bewerbungsformular aus – wir leiten Ihr Profil an geeignete Agenturen weiter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Modelagenturen gibt es in Berlin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Berlin verfügt über zahlreiche Modelagenturen. Nutzen Sie unsere Karte oder Filter, um Agenturen in Berlin zu finden und sich direkt zu bewerben.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist der Unterschied zwischen Modelagentur und Casting Agentur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Modelagenturen betreuen Models dauerhaft und vermitteln sie an Kunden. Casting Agenturen organisieren Castings für einzelne Projekte wie Werbespots oder Filme – oft ohne langfristige Vertretung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie viel verdient man als Model in Deutschland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das Einkommen variiert stark nach Erfahrung, Einsatz und Branche. Festgelegte Tagessätze gibt es für kommerzielle Aufträge; Fashion und Laufsteg können anders vergütet werden. Die Agentur berät Sie individuell.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="bg-cream pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <TopCitiesSection />
      <StatsBar />

      <KarteSection />

      <section className="border-t border-slate-200 bg-cream py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 font-serif text-xl font-semibold text-slate-900">
            Modelagenturen in Deutschland
          </h2>
          <AgencyGrid agencies={agencies} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-cream py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 font-serif text-xl font-semibold text-slate-900">
            Häufig gestellte Fragen
          </h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-semibold text-slate-900">
                Was ist eine Modelagentur?
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                Eine Modelagentur vermittelt Models an Kunden aus Mode, Werbung und Entertainment.
                Sie übernimmt Buchungen, Vertragsverhandlungen und die Karriereberatung ihrer
                Talente.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">
                Wie bewirbt man sich bei einer Modelagentur in Deutschland?
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                Über Model-europa.de können Sie sich zentral bei passenden Modelagenturen bewerben.
                Füllen Sie das Bewerbungsformular aus – wir leiten Ihr Profil an geeignete
                Agenturen weiter.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">
                Welche Modelagenturen gibt es in Berlin?
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                Berlin verfügt über zahlreiche Modelagenturen. Nutzen Sie unsere Karte oder Filter,
                um Agenturen in Berlin zu finden und sich direkt zu bewerben.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">
                Was ist der Unterschied zwischen Modelagentur und Casting Agentur?
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                Modelagenturen betreuen Models dauerhaft und vermitteln sie an Kunden. Casting
                Agenturen organisieren Castings für einzelne Projekte wie Werbespots oder Filme –
                oft ohne langfristige Vertretung.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">
                Wie viel verdient man als Model in Deutschland?
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-700">
                Das Einkommen variiert stark nach Erfahrung, Einsatz und Branche. Festgelegte
                Tagessätze gibt es für kommerzielle Aufträge; Fashion und Laufsteg können anders
                vergütet werden. Die Agentur berät Sie individuell.
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}

