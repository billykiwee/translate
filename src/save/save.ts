import fs from "fs";
import { getConfig } from "../config/config.js";
import { LanguagesConfig } from "../interfaces/translate.js";
import { upadteFiles } from "../controllers/update.js";
import { start } from "../controllers/start.js";

const config = getConfig();

const filePath = `qlee/config`;

export async function configChanged(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        reject(false);
      }

      const getFileWithoutExt: LanguagesConfig[] = files.map((f: any) =>
        f.replace(".json", "")
      );

      const formToString = (array: LanguagesConfig[]) => {
        return array.sort().toString();
      };

      const isDefaultLangChange =
        formToString(config.languages) !== formToString(getFileWithoutExt);

      resolve(isDefaultLangChange);
    });
  });
}

//fs.watch(filePath, start);
