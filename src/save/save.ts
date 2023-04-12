import fs from "fs";
import { getConfig } from "../config/config.js";
import { sucessMsg } from "../utils/handlers/handlers.js";
import { createType } from "../controllers/create.js";
import { LanguagesConfig } from "../interfaces/translate.js";
import { areObjectsEqual } from "../utils/functions/objectsEquals.js";
import { upadteFiles } from "../controllers/update.js";

export async function configChanges(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const configLanguages = getConfig().languages;

    fs.readdir("src/translations/", (err, files) => {
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

      resolve(isDefaultLangChange);
    });
  });
}

export async function defaultLangChanges(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const json = fs.readFileSync(`src/language/default.json`).toString();

    const defaultLangJson = fs
      .readFileSync(`src/translations/${getConfig().defaultLang}.json`)
      .toString();

    const changes = !areObjectsEqual(
      JSON.parse(json),
      JSON.parse(defaultLangJson)
    );

    resolve(changes);
  });
}

export async function save() {
  const isConfigChanges = await configChanges();

  const isDefaultLangChanges = await defaultLangChanges();

  if (isConfigChanges || isDefaultLangChanges) {
    getConfig();

    upadteFiles().then(() => {
      sucessMsg("   ✅ Transations updated");
    });

    createType();
  }
}

const filePath = ["src/", "src/language/", "./translate.config.json"];

for (const v in filePath) {
  fs.watch(filePath[v], save);
}
