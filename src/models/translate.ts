import translate from "translate-google";

export async function getTranslate(text: string, lang: string) {
  try {
    const translated = translate(text, { to: lang });

    return translated;
  } catch (err) {
    console.error("An error occurred while translating :", err);
  }
}

export async function googleTranslate(str: string, lang: string) {
  return await getTranslate(str, lang);
}
