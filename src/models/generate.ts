import fs from "fs";
import { formatJson } from "../functions/formatJson.js";
import { getVariables } from "../functions/variables.js";

const json = JSON.parse(
  fs.readFileSync("src/language/language.json").toString()
);

export const createType = () => {
  const typeFile = `
  export interface Translate ${getVariables(json)} ;
    `;

  fs.writeFileSync("./src/interfaces/translate.ts", formatJson(typeFile));
};
