import fs from "fs";
import { LanguagesConfig } from "../interfaces/translate.js";

export interface ConfigInt {
  defaultLang: string;
  languages: LanguagesConfig[];
  translate: boolean;
  generate: boolean;
}

export const getConfig = (): ConfigInt => {
  const config = JSON.parse(
    fs.readFileSync("translate.config.json").toString()
  );
  return config;
};
