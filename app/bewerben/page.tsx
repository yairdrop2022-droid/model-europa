export const runtime = 'edge';

const FORM_ENDPOINT = 'https://formspree.io/f/mkovannb';

export default function BewerbenPage() {
  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="mb-2 text-center font-serif text-2xl font-semibold text-slate-900">
          Bewerbung für Modelagenturen
        </h1>
        <p className="mb-6 text-center text-sm text-slate-700">
          Stellen Sie sich einmal zentral vor – wir leiten Ihr Profil an passende Agenturen
          aus unserem Netzwerk weiter.
        </p>

        <form
          action={FORM_ENDPOINT}
          method="POST"
          encType="multipart/form-data"
          className="space-y-4 rounded-3xl bg-white p-6 shadow-card text-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Vorname
              </label>
              <input
                name="vorname"
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Nachname
              </label>
              <input
                name="nachname"
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Telefon
            </label>
            <input
              type="tel"
              name="telefon"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Instagram (optional)
            </label>
            <input
              type="url"
              name="instagram"
              placeholder="https://instagram.com/..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Foto hochladen (optional)
            </label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              className="w-full text-sm text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-navy/90"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Stadt
              </label>
              <input
                name="stadt"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Kategorie
              </label>
              <select
                name="kategorie"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-navy"
                defaultValue=""
              >
                <option value="" disabled>
                  Bitte auswählen
                </option>
                <option value="Fashion">Fashion</option>
                <option value="Commercial">Commercial</option>
                <option value="Fitness">Fitness</option>
                <option value="Kids">Kids</option>
                <option value="Plus Size">Plus Size</option>
                <option value="Events">Events</option>
                <option value="Acting">Acting</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Portfolio (Google Drive Link, optional)
            </label>
            <input
              type="url"
              name="portfolio"
              placeholder="https://drive.google.com/..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
            />
          </div>

          <p className="pt-2 text-[11px] leading-relaxed text-slate-600">
            Ihre Daten werden ausschließlich an die passende Modelagentur weitergeleitet und nicht für
            andere Zwecke verwendet. Sie können jederzeit die Löschung Ihrer Daten beantragen unter:
            <span className="font-semibold"> datenschutz.agenturfinder@proton.me</span> — gemäß DSGVO.
          </p>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-navy/90"
          >
            Bewerbung absenden
          </button>
        </form>
      </div>
    </div>
  );
}

