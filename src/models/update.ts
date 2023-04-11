import fs from "fs";
import { config } from "../config/config.js";
import { areObjectsEqual } from "../functions/objectsEquals.js";
import { errorMsg, sucessMsg } from "../handlers/utils.js";
import { LanguagesConfig } from "../interfaces/translate.js";
import { push } from "./push.js";

export const upadteFiles = async () => {
  const json = fs.readFileSync(`src/language/default.json`).toString();

  const isConfigChanges = await configChanges();

  if (canUpdate() || isConfigChanges) {
    push(JSON.parse(json)).then(() => {
      sucessMsg(`     ✅ Translations updated`);
    });
  }
};

async function configChanges(): Promise<boolean> {
  const configLanguages = config.languages;

  return new Promise((resolve, reject) => {
    return fs.readdir("src/translations/", (err, files) => {
      if (err) {
        reject(false);
      }

      const getFileWithoutExt: LanguagesConfig[] = files.map((f: any) =>
        f.replace(".json", "")
      );

      const formToString = (array: LanguagesConfig[]) => {
        return array.sort().toString();
      };

      const isDefaultLangChange =
        formToString(configLanguages) !== formToString(getFileWithoutExt);

      if (isDefaultLangChange) {
        resolve(true);
      }
    });
  });
}

export function canUpdate() {
  const json = fs.readFileSync(`src/language/default.json`).toString();

  const defaultLangJson = fs
    .readFileSync(`src/translations/${config.defaultLang}.json`)
    .toString();

  const isDefaultLangChange = !areObjectsEqual(
    JSON.parse(json),
    JSON.parse(defaultLangJson)
  );

  return isDefaultLangChange;
}
