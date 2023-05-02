import fs from "fs";
import { LanguagesConfig } from "../interfaces/translate.js";

export interface ConfigInt {
  defaultLang: string;
  languages: LanguagesConfig[];
  translate: {
    active: boolean;
    "google-translate": {
      GOOGLE_TRANSLATE_PROJECT_ID: string;
      GOOGLE_TRANSLATE_API_KEY: string;
    };
  };
  generate: boolean;
  "output-translations-files": string;
}

export const getConfig = (): ConfigInt => {
  const config = JSON.parse(
    fs.readFileSync("qlee/config/translate.config.json").toString()
  );
  return config;
};
