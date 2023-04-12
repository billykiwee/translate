import fs from "fs";
import { getConfig } from "../config/config.js";
import { createDir } from "../config/setup.js";
import { getVariables } from "../utils/functions/variables.js";

const json = JSON.parse(
  fs.readFileSync(`src/language/default.json`).toString()
);

export function createType() {
  const typeFile = `
  export type LanguagesConfig =  "${Object.values(getConfig().languages).join(
    '" | "'
  )}"  | undefined;

  export interface Translate ${getVariables(json)} ;
    `;

  createDir("./src/interfaces/", [
    {
      path: `translate.ts`,
      content: typeFile,
    },
  ]);
}

export async function createTranslationFile(
  transaltions: string,
  lang: string
) {
  createDir("./src/translations/", [
    {
      path: `${lang}.json`,
      content: transaltions,
    },
  ]);
}
