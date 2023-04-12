import fs from "fs";
import { getConfig } from "../config/config.js";
import { formatJson } from "../utils/functions/formatJson.js";
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
  fs.writeFileSync("./src/interfaces/translate.ts", formatJson(typeFile));
}

export async function createTranslationFile(
  transaltions: string,
  lang: string
) {
  return fs.writeFileSync(
    `./src/translations/${lang}.json`,
    JSON.stringify(transaltions, null, 2)
  );
}
