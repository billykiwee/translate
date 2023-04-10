import fs from "fs";
import { LanguagesConfig } from "../interfaces/translate.js";

export interface ConfigInt {
  defaultLang: string;
  languages: LanguagesConfig[];
  translate: boolean;
}

export let config: ConfigInt = JSON.parse(
  fs.readFileSync("translate.config.json").toString()
);

export const getConfig = () => {
  config = JSON.parse(fs.readFileSync("translate.config.json").toString());
};
