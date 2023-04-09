import fs from "fs";
import { config } from "../config/config.js";
import { formatJson } from "../functions/formatJson.js";
import { getVariables } from "../functions/variables.js";

const json = JSON.parse(
  fs.readFileSync(`src/language/default.json`).toString()
);

export const createType = () => {
  const typeFile = `
  export interface Translate ${getVariables(json)} ;
    `;

  fs.writeFileSync("./src/interfaces/translate.ts", formatJson(typeFile));

  console.log("Interface generated");
};
