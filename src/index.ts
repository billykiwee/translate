import fs from "fs";
import { getConfig } from "./config/config.js";
import { errorMsg, pendingMsg } from "./utils/handlers/handlers.js";
import { LanguagesConfig, Translate } from "./interfaces/translate.js";
import { save } from "./save/save.js";

save();
pendingMsg(`Translation is running...`);

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
    const getTranslattionJSON = getLanguage(
      language ?? getConfig().defaultLang
    )[getID];

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
