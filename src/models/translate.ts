import translate from "translate-google";

export async function getTranslate(text: string, lang: string) {
  try {
    const translated = translate(text, { to: lang });

    // console.log(`La traduction ${lang} est terminée.`);

    return translated;
  } catch (err) {
    console.error("Une erreur est survenue lors de la traduction :", err);
  }
}

export async function googleTranslate(str: string, lang: string) {
  return await getTranslate(str, lang);
}
