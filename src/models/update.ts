import fs from "fs";
import { config } from "../config/config.js";
import { areObjectsEqual } from "../functions/objectsEquals.js";
import { errorMsg, sucessMsg } from "../handlers/utils.js";
import { LanguagesConfig } from "../interfaces/translate.js";
import { push } from "./push.js";

const json = fs.readFileSync(`src/language/default.json`).toString();

const jsonParser = JSON.parse(json);

const configLanguages = config.languages;

type CheckUpdate = "withCheck" | "withoutCheck";

export const upadteFiles = async (withCheck: CheckUpdate) => {
  if (withCheck === "withCheck") {
    canUpdate(json)
      .then((updateNeeded) => {
        if (!updateNeeded) return;

        push(jsonParser).then(() => {
          sucessMsg(`     ✅ Translations updated`);
        });
      })
      .catch((err) => {
        errorMsg(err);
      });
  }

  // If transaltions files has not languages in config
  fs.readdir("src/translations/", (err, files) => {
    files.forEach((file: any) => {
      if (
        !configLanguages.includes(file.replace(".json", "")) ||
        configLanguages.includes(file.replace(".json", ""))
      ) {
        push(jsonParser).then(() => {
          sucessMsg(`     ✅ Translations updated`);
        });
      }
    });
  });
};

export async function canUpdate(json: string) {
  const defaultLangJson = fs
    .readFileSync(`src/translations/${config.defaultLang}.json`)
    .toString();

  return (
    config.translate &&
    areObjectsEqual(JSON.parse(json), JSON.parse(defaultLangJson))
  );
}
