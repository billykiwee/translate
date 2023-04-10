import fs from "fs";
import { config } from "./config/config.js";
import { errorMsg } from "./handlers/utils.js";
import { LanguagesConfig, Translate } from "./interfaces/translate.js";
import { save } from "./save/save.js";

save();

const getLanguage = (lang: string): any => {
  return JSON.parse(
    fs.readFileSync(`src/translations/${lang}.json`).toString()
  );
};

export function t(input: Translate): string | any {
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

console.log(
  t({ id: "hello", variables: { name: "Billy", age: 21 }, language: "fr" })
);
