import fs from "fs";
import { ConfigInt, getConfig } from "../config/config.js";
import { LanguagesConfig } from "../interfaces/translate.js";
import { createDir } from "../utils/functions/createDir.js";
import { errorMsg } from "../utils/handlers/handlers.js";

export const defaultLanguageJSON = JSON.parse(
  fs
    .readFileSync(
      `qlee/${getConfig()?.["output-translations-files"]}/default-${
        getConfig()?.defaultLang
      }.json`
    )
    .toString()
);

export function createType() {
  const configL = getConfig()?.languages;

  if (configL) {
    const typeFile = `
  export type LanguagesConfig =  "${Object.values(configL).join(
    '" | "'
  )}"  | undefined;

  export type Variables = { [key: string]: string | number };
  
  export type Ids = "${Object.keys(defaultLanguageJSON).join('" | "')}";

  export interface Translate {
    id : Ids;
    variables?: Variables,
    language?: LanguagesConfig
  };
`;

    createDir("./src/interfaces/", [
      {
        path: `translate.ts`,
        content: typeFile,
      },
    ]);
  }
}

export async function cretateI18nFiles(lang: LanguagesConfig) {
  if (lang === getConfig()?.defaultLang) {
    createDir("qlee/" + getConfig()?.["output-translations-files"], [
      {
        path: `default-${lang}.json`,
        content: {
          qlee: `Welcome to your ${lang?.toUpperCase()} translation file.`,
          variables:
            "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
        },
      },
    ]);

    return;
  }

  createDir("qlee/" + getConfig()?.["output-translations-files"], [
    {
      path: `${lang}.json`,
      content: {
        qlee: `Welcome to your ${lang?.toUpperCase()} translation file.`,
        variables:
          "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
      },
    },
  ]);
}

export async function createConfig() {
  const preConfig: ConfigInt = {
    defaultLang: "en",
    languages: ["en", "fr", "es"],
    "output-translations-files": "i18n",
    translation: {
      "google-translate": {
        GOOGLE_TRANSLATE_PROJECT_ID: "env",
        GOOGLE_TRANSLATE_API_KEY: "env",
      },
    },
  };

  createDir("qlee/config", [
    {
      path: `qlee.config.json`,
      content: preConfig,
    },
  ]);

  const languages = preConfig.languages || [];

  for (let i = 0; i < languages.length; i++) {
    const cretateI18nFiles = async () => {
      if (languages[i] === preConfig.defaultLang) {
        createDir("qlee/" + preConfig["output-translations-files"], [
          {
            path: `default-${languages[i]}.json`,
            content: {
              qlee: `Welcome to your ${languages[
                i
              ]?.toUpperCase()} translation file.`,
              variables:
                "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
            },
          },
        ]);

        return;
      }

      return createDir("qlee/" + preConfig["output-translations-files"], [
        {
          path: `${languages[i]}.json`,
          content: {
            qlee: `Welcome to your ${languages[
              i
            ]?.toUpperCase()} translation file.`,
            variables:
              "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
          },
        },
      ]);
    };

    cretateI18nFiles()
      .then(() => {
        console.log(`${languages[i]?.toUpperCase()} generated`);
      })
      .catch((err) => {
        errorMsg(err);
      });
  }
}
