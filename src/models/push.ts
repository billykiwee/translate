import { config } from "../config/config.js";
import { deleteTranslation } from "./delete.js";
import { createTranslationFile } from "./generate.js";

export async function push(jsonParser: string) {
  const lang = config.languages;

  for (const l in lang) {
    //const transaltions = await getT(lang[l]);

    const language = lang[l] as string;

    async function pushTranslation() {
      return createTranslationFile(jsonParser, language);
    }
    pushTranslation().then(() => {
      console.log(`     - ${language.toUpperCase()} updated`);
    });
  }
  // If [lang].json is not in config languages
  deleteTranslation();
}
