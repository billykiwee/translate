import fs from "fs";
import { config } from "../config/config.js";
import { areObjectsEqual } from "../functions/objectsEquals.js";
import { sucessMsg } from "../handlers/utils.js";
import { googleTranslate } from "../models/translate.js";
import { deleteTranslation } from "./delete.js";
import { createTranslationFile } from "./generate.js";

export const upadteFiles = async () => {
  const json = fs.readFileSync(`src/language/default.json`).toString();

  const lang = config.languages;

  const jsonParser = JSON.parse(json);

  async function getT(lang: string) {
    let obj = [];

    for (const key in jsonParser) {
      if (Object.prototype.hasOwnProperty.call(jsonParser, key)) {
        const element = jsonParser[key];

        const placeholder = element.match(/\[(.*?)\]/g);

        const emptyBraces = element.replace(/\[(.*?)\]/g, () => "[]");

        const dontTranslateTheDefaultLang = lang !== config.defaultLang;

        if (dontTranslateTheDefaultLang) {
          return;
        }

        const afterTranslate = googleTranslate(emptyBraces, lang);

        const getTranslateWithVariables = await afterTranslate.then(
          (translated: any) => {
            if (placeholder) {
              const translatedSplit = translated.replace(/\[\]/g, () =>
                placeholder.shift()
              );

              return translatedSplit;
            } else {
              return translated;
            }
          }
        );

        obj.push({ [key]: getTranslateWithVariables });
      }
    }

    return Object.assign({}, ...obj);
  }

  if (canTranslate(json)) {
    async function push() {
      for (const l in lang) {
        const transaltions = await getT(lang[l]);

        async function pushTranslation() {
          return createTranslationFile(transaltions, lang[l]);
        }
        pushTranslation().then(() => {
          console.log(`     - ${lang[l].toUpperCase()} done`);
        });

        deleteTranslation(lang);
      }
    }
    push().then(() => {
      sucessMsg(`     ✅ Translations updated`);
      console.log(`Monitoring default.json in progress...`);
    });
  } else {
    sucessMsg(`     Translations up-to-date`);
  }

  function canTranslate(json: string) {
    const defaultLangJson = fs
      .readFileSync(`src/translations/${config.defaultLang}.json`)
      .toString();

    return (
      config.translate &&
      areObjectsEqual(JSON.parse(json), JSON.parse(defaultLangJson))
    );
  }
};
