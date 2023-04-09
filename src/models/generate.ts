import fs from "fs";
import { formatJson } from "../functions/formatJson.js";
import { getVariables } from "../functions/variables.js";

const json = JSON.parse(
  fs.readFileSync("src/language/language.json").toString()
);

// Create json
/* export const createJSON = () => {
  const translationsFile = `export const translations : any = ${JSON.stringify(
    json
  )}`;

  fs.writeFileSync(
    "./src/translations/translations.ts",
    formatJson(translationsFile)
  );
}; */

export const createType = () => {
  const typeFile = `
  export interface Translate ${getVariables(json)} ;
    `;

  fs.writeFileSync("./src/interfaces/translate.ts", formatJson(typeFile));
};
