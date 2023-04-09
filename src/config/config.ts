import fs from "fs";
import { formatJson } from "../functions/formatJson.js";

export const config = JSON.parse(
  fs.readFileSync("translate.config.json").toString()
);

const json = fs.readFileSync("src/language/language.json").toString();

// Create lang.json
const languages = config.languages;

for (const v in languages) {
  fs.writeFileSync(`src/translations/${languages[v]}.json`, json);
}
