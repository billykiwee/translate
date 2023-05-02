import fs from "fs";
import { getConfig } from "./config/config.js";
import { errorMsg, pendingMsg } from "./utils/handlers/handlers.js";
import { LanguagesConfig, Translate } from "./interfaces/translate.js";
import { start } from "./controllers/start.js";

const config = getConfig();

const getLanguage = (lang: string): any => {
  return JSON.parse(
    fs
      .readFileSync(config["output-translations-files"] + `/${lang}.json`)
      .toString()
  );
};

export function qlee(input: Translate): string | any {
  const regex = /\[(.*?)\]/g;

  const [getID, variables, language]: [string, any, LanguagesConfig] = [
    input.id,
    input.variables,
    input.language,
  ];

  try {
    const getTranslattionJSON = getLanguage(language ?? config.defaultLang)[
      getID
    ];

    if (getTranslattionJSON) {
      const replaceVariables = getTranslattionJSON.replace(
        regex,
        (match: string, value: string) => {
          const placeholders = variables[value];

          return placeholders;
        }
      );

      return replaceVariables;
    } else {
      throw new Error(`❌ The id: "${getID}" does not exists on default.json`);
    }
  } catch (err: any) {
    errorMsg(err);
  }
}

console.log(qlee({ id: "jobs", variables: { jobs: "cool" }, language: "en" }));
