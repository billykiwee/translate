import { translate } from "@vitalets/google-translate-api";

export async function getTranslate(lang: string, text: string) {
  try {
    const translated = await translate(text, {
      to: lang,
    });
    console.log(`La traduction ${lang} est terminée.`);
    return translated;
  } catch (err) {
    console.error("Une erreur est survenue lors de la traduction :", err);
  }
}
