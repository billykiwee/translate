import fs from "fs";
import { config } from "./config/config.js";
import { Translate } from "./interfaces/translate.js";
import { save } from "./save/save.js";

save();

const getLanguage = (lang: string): any => {
  return JSON.parse(
    fs.readFileSync(`src/translations/${lang}.json`).toString()
  );
};

function t(input: Translate): string | any {
  const regex = /\[(.*?)\]/g;

  const [getID, variables]: [string, any] = [input.id, input.variables];

  const getTranslattionJSON = getLanguage(config.defaultLang)[getID];

  try {
    if (variables) {
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
        throw new Error("❌ This ID does not exists on default.json");
      }
    } else {
      return getTranslattionJSON;
    }
  } catch (err) {
    console.log(err);
  }
}

/* console.log(
  t({
    id: "contact",
    variables: {
      number: "069384993",
    },
  })
);
 */
