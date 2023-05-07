import fs from "fs";
import { LanguagesConfig } from "../interfaces/translate.js";

export const qleeExists = fs.existsSync("qlee");

export interface ConfigInt {
  defaultLang: string;
  languages: LanguagesConfig[];
  "output-translations-files": string;
}

export const getConfig = (): ConfigInt | void => {
  if (!qleeExists) {
    return;
  }

  const config = JSON.parse(
    fs.readFileSync("qlee/config/qlee.config.json").toString()
  );
  return config;
};
