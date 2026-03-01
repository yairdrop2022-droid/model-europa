import { QuizClient } from './QuizClient';

export const runtime = 'edge';

export default function QuizPage() {
  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="mb-2 font-serif text-2xl font-semibold text-slate-900">
          Ihr persönlicher Agentur-Matching-Quiz
        </h1>
        <p className="mb-6 text-sm text-slate-700">
          Beantworten Sie ein paar kurze Fragen, und wir stellen für Sie eine kuratierte
          Liste passender Modelagenturen zusammen.
        </p>
        <QuizClient />
      </div>
    </div>
  );
}

