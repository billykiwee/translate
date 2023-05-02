import fs from "fs";
import { getConfig } from "../config/config.js";
import { createDir } from "../utils/functions/createDir.js";

const json = JSON.parse(
  fs.readFileSync(`src/language/default.json`).toString()
);

export function createType() {
  const typeFile = `
  export type LanguagesConfig =  "${Object.values(getConfig().languages).join(
    '" | "'
  )}"  | undefined;

  export type Variables = { [key: string]: string | number };
  
  export type Ids = "${Object.keys(json).join('" | "')}";

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
