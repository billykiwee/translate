import translate from "translate-google";
import { errorMsg } from "../utils/handlers/handlers.js";

export async function getTranslate(text: string, lang: string) {
  try {
    const translated = translate(text, { to: lang });

    return translated;
  } catch (err) {
    console.error("An error occurred while translating :", err);
  }
}

export async function googleTranslate(jsonParser: any, lang: string) {
  let obj = [];

  for (const key in jsonParser) {
    if (Object.prototype.hasOwnProperty.call(jsonParser, key)) {
      const element = jsonParser[key];

      const placeholder = element.match(/\[(.*?)\]/g);

      const emptyBraces = element.replace(/\[(.*?)\]/g, () => "[]");

      try {
        const afterTranslate = getTranslate(emptyBraces, lang);

        const getTranslateWithVariables = await afterTranslate.then(
          (translated: any) => {
            if (!placeholder) {
              return translated;
            }

            return translated.replace(/\[\]/g, () => placeholder.shift());
          }
        );

        obj.push({ [key]: getTranslateWithVariables });
      } catch (err: any) {
        throw new Error(err);
      }
    }
  }

  return Object.assign({}, ...obj);
}

const json = {
  bonjour: "ça va ? [name]",
  comment: "how ?",
};

googleTranslate(JSON.stringify(json), "es")
  .then((e) => {
    console.log(e);
  })
  .catch((e) => {
    errorMsg(e);
  });
