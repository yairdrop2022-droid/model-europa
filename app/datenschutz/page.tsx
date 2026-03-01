import type { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Datenschutz – Model-europa.de',
};

export default function DatenschutzPage() {
  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-3xl px-6 text-sm text-slate-800">
        <h1 className="mb-4 font-serif text-2xl font-semibold text-slate-900">Datenschutzerklärung</h1>

        <section className="mb-6 space-y-1">
          <h2 className="font-serif text-base font-semibold text-slate-900">Verantwortlicher</h2>
          <p>
            Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
          <p className="mt-1">
            Model-europa.de
            <br />
            E-Mail:{' '}
            <a
              href="mailto:datenschutz.agenturfinder@proton.me"
              className="text-navy underline-offset-2 hover:underline"
            >
              datenschutz.agenturfinder@proton.me
            </a>
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">
            Welche Daten wir sammeln
          </h2>
          <p>
            Wenn Sie unsere Formulare nutzen, verarbeiten wir die von Ihnen eingegebenen Daten.
            Dies umfasst insbesondere:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Vor- und Nachname</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer (optional)</li>
            <li>weitere freiwillige Angaben im Bewerbungsformular (z. B. Stadt, Kategorie)</li>
          </ul>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">Zweck der Verarbeitung</h2>
          <p>
            Wir verarbeiten Ihre personenbezogenen Daten ausschließlich zum Zweck der Vermittlung an
            passende Modelagenturen. Ihre Angaben werden verwendet, um Agenturen zu identifizieren,
            die zu Ihrem Profil passen, und Ihre Bewerbung an diese Agenturen weiterzuleiten.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">Weitergabe der Daten</h2>
          <p>
            Ihre Daten werden ausschließlich an solche Modelagenturen weitergegeben, die für Ihr
            Profil relevant sind. Eine Weitergabe an sonstige Dritte oder zu Werbezwecken findet
            nicht statt.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">Speicherdauer</h2>
          <p>
            Wir speichern Ihre personenbezogenen Daten für maximal 30 Tage. Nach Ablauf dieses
            Zeitraums werden Ihre Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
            entgegenstehen.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">
            Ihre Rechte nach der DSGVO
          </h2>
          <p>Sie haben im Rahmen der gesetzlichen Vorgaben folgende Rechte:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Recht auf Auskunft über die von uns verarbeiteten personenbezogenen Daten</li>
            <li>Recht auf Berichtigung unrichtiger oder unvollständiger Daten</li>
            <li>Recht auf Löschung Ihrer Daten („Recht auf Vergessenwerden“)</li>
            <li>Recht auf Einschränkung der Verarbeitung</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung Ihrer Daten</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte können Sie uns jederzeit per E-Mail kontaktieren unter:{' '}
            <a
              href="mailto:datenschutz.agenturfinder@proton.me"
              className="text-navy underline-offset-2 hover:underline"
            >
              datenschutz.agenturfinder@proton.me
            </a>
            .
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">Cookies</h2>
          <p>
            Auf dieser Website setzen wir keine Tracking-Cookies (z. B. für Analyse- oder
            Werbezwecke) ein. Es können technisch notwendige Cookies eingesetzt werden, um den
            Betrieb der Website zu gewährleisten; diese enthalten jedoch keine Tracking-Informationen.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">
            Verarbeitung von Formularen via Formspree
          </h2>
          <p>
            Für den Versand und die Verarbeitung von Formularen nutzen wir den Dienst Formspree. Der
            Anbieter sitzt in den USA. Die Übermittlung Ihrer Daten erfolgt auf Grundlage sogenannter
            Standardvertragsklauseln (Standard Contractual Clauses), die ein angemessenes
            Datenschutzniveau gewährleisten sollen.
          </p>
          <p>
            Die von Ihnen in das Formular eingegebenen Daten werden an Formspree übermittelt und
            dort verarbeitet, um Ihre Anfrage an uns zuzustellen und an passende Modelagenturen
            weiterzugeben. Weitere Informationen zur Datenverarbeitung durch Formspree finden Sie in
            der Datenschutzerklärung des Anbieters.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-slate-900">
            Kontakt zum Datenschutz
          </h2>
          <p>
            Wenn Sie Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zu dieser
            Datenschutzerklärung haben, können Sie uns jederzeit kontaktieren unter:
          </p>
          <p>
            E-Mail:{' '}
            <a
              href="mailto:datenschutz.agenturfinder@proton.me"
              className="text-navy underline-offset-2 hover:underline"
            >
              datenschutz.agenturfinder@proton.me
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

