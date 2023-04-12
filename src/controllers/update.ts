import fs from "fs";
import { getConfig } from "../config/config.js";
import { sucessMsg } from "../utils/handlers/handlers.js";
import { createTranslationFile } from "./create.js";
import { deleteTranslation, deleting } from "./delete.js";

export const upadteFiles = async () => {
  const json = fs.readFileSync(`src/language/default.json`).toString();

  const lang = getConfig().languages;

  for (const l in lang) {
    //const transaltions = await getT(lang[l]);

    const language = lang[l] as string;

    createTranslationFile(JSON.parse(json), language).then(() => {
      console.log(`     - ${language.toUpperCase()} updated`);
    });
  }

  // If [lang].json is not in config languages
  deleteTranslation()
    .then((files: any) => {
      deleting(files);
    })
    .catch((error) => {
      console.error(error);
    });
};
