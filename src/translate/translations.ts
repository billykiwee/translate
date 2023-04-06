interface TranslateJSON {
  [key: string]: {
    hello: string;
    cool: string;
    why: string;
    because: string;
  };
}

export const config = {
  defaultLang: "en",
  languages: ["en", "fr", "es", "de"],
};
export const dataLanguages: TranslateJSON = {
  en: {
    hello: "Good morning {{name}} you're {{age}} and your job is {{job}}",
    cool: "Something goes wrong",
    why: "why",
    because: "because of you",
  },
  es: {
    hello: "Buen día {{name}} estoy {{age}} y tu trabajo es {{job}}",
    cool: "Algo va mal",
    why: "por qué",
    because: "gracias a ti",
  },
  fr: {
    hello: "Bonjour {{name}} tu as {{age}} et ton travail est {{job}}",
    cool: "Quelque chose ne va pas",
    why: "Pourquoi",
    because: "à cause de toi",
  },
};
