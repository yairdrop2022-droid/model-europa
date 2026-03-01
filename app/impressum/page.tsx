import type { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Impressum – Model-europa.de',
};

export default function ImpressumPage() {
  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-3xl px-6 text-sm text-slate-800">
        <h1 className="mb-4 font-serif text-2xl font-semibold text-slate-900">Impressum</h1>

        <section className="mb-6 space-y-1">
          <p>
            <span className="font-semibold">Name:</span> Model-europa.de
          </p>
          <p>
            <span className="font-semibold">E-Mail:</span>{' '}
            <a
              href="mailto:datenschutz.agenturfinder@proton.me"
              className="text-navy underline-offset-2 hover:underline"
            >
              datenschutz.agenturfinder@proton.me
            </a>
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">Haftungsausschluss</h2>
          <p>
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
            Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr
            übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
            diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
            wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
            fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
            erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
            entfernen.
          </p>
          <p>
            Unsere Website enthält Verlinkungen zu externen Websites Dritter, auf deren Inhalte wir
            keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
            Betreiber der Seiten verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
            ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </section>
      </div>
    </div>
  );
}

