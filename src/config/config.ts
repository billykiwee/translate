import fs from "fs";

interface ConfigInt {
  defaultLang: string;
  languages: string[];
  translate: boolean;
}

export const config: ConfigInt = JSON.parse(
  fs.readFileSync("translate.config.json").toString()
);
