import fs from "fs";
import { getConfig } from "../config/config.js";
import { googleTranslate } from "../modules/translate.js";
import { createDir } from "../utils/functions/createDir.js";
import { pendingMsg } from "../utils/handlers/handlers.js";

export async function Translate() {
  const json = fs.readFileSync(`src/language/default.json`).toString();

  const languages = getConfig().languages;

  pendingMsg("Translations in progress...");

  for (const l in languages) {
    const lang = languages[l];

    return googleTranslate(JSON.parse(json), lang as string)
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
