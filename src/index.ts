import fs from "fs";
import { config } from "./config/config.js";
import { Translate } from "./interfaces/translate.js";
import { createType } from "./models/generate.js";

//createJSON();
createType();

const getLanguage = (lang: string): any => {
  return JSON.parse(
    fs.readFileSync(`src/translations/${lang}.json`).toString()
  );
};

function t(input: Translate): string {
  const regex = /\[(.*?)\]/g;

  const [getID, variables]: [string, any] = [input.id, input.variables];

  const getTranslattionJSON = getLanguage(config.defaultLang)[getID];

  if (variables) {
    const replaceVariables = getTranslattionJSON.replace(
      regex,
      (match: string, value: string) => {
        const placeholders = variables[value];

        return placeholders;
      }
    );

    return replaceVariables;
  }

  return getTranslattionJSON;
}

t({
  id: "my-profil",
  variables: {
    name: "John",
    age: 25,
    job: "software egineer",
  },
  language: "en",
});

// Hello, My name is John, I am 25 and I am software egineer.
