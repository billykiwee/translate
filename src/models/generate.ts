import fs from "fs";
import { formatJson } from "../functions/formatJson.js";
import { getVariables } from "../functions/variables.js";

const json = JSON.parse(
  fs.readFileSync("src/language/language.json").toString()
);

const translationsFile = `export const translations : any = ${JSON.stringify(
  json
)}`;

// Create json
fs.writeFileSync(
  "./src/translations/translations.ts",
  formatJson(translationsFile)
);

const typeFile = `
export interface Translate ${getVariables(json)} ;
  `;
// Create type
fs.writeFileSync("./src/interfaces/translate.ts", formatJson(typeFile));
