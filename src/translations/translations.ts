export interface Translate {
  id: 'hello' | 'cool' | 'why' | 'because' | 'obviously';
  variables?: {
    name: string,
    age: string,
    job: string,
  };
  language?: 'en' | 'fr' | 'es';
}

interface TranlationJSON {
  [key: string]: Object;
}

export const config = {
  defaultLang: 'en',
  languages: ['en', 'fr', 'es'],
  translate: 'auto',
};

export const dataLanguages: TranlationJSON = {
  en: {
    hello: "Good morning {{name}} you're {{age}} and your job is {{job}}",
    cool: 'Something goes wrong',
    why: 'why',
    because: 'because of you',
    obviously: 'Bien sur que oui',
  },
  es: {
    hello: 'Buen día {{name}} estoy {{age}} y tu trabajo es {{job}}',
    cool: 'Algo va mal',
    why: 'por qué',
    because: 'gracias a ti',
  },
  fr: {
    hello: 'Bonjour {{name}} tu as {{age}} et ton travail est {{job}}',
    cool: 'Quelque chose ne va pas',
    why: 'Pourquoi',
    because: 'à cause de toi',
  },
};
