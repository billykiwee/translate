import fs from "fs";
import { getConfig } from "../../config/config.js";
import { defaultLanguageJSON } from "../../controllers/create.js";
import { googleTranslate } from "../../modules/translate.js";
import { createDir } from "../../utils/functions/createDir.js";
import { pendingMsg } from "../../utils/handlers/handlers.js";

export async function translateCLI() {
  const languages = getConfig()?.languages || [];

  pendingMsg("Translations in progress...");

  for (const l in languages) {
    const lang = languages[l];

    return googleTranslate(defaultLanguageJSON, lang as string)
      .then((translated) => {
        createDir("./src/translations", [
          {
            path: `${lang}.json`,
            content: translated,
          },
        ]);
      })
      .then(() => {
        return console.log(`${lang?.toUpperCase()} translated`);
      });
  }
}
