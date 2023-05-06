import fs from "fs";
import { getConfig } from "../config/config.js";
import { createDir } from "../utils/functions/createDir.js";
import { pendingMsg } from "../utils/handlers/handlers.js";
import { createType } from "./create.js";
import { deleting } from "./delete.js";
import { generate } from "./generate.js";

fs.watch(`qlee/config/translate.config.json`, configChange);

export async function start() {
  pendingMsg("Generate in progress...");

  createType();
  await generate();
}

async function configChange() {
  const i18nFiles = await fs.promises.readdir(
    `qlee/${getConfig()["output-translations-files"]}`
  );

  const getI18nFilesArray = i18nFiles
    .map((file) => file.replace(".json", "").replace("default-", ""))
    .sort();

  const languagesConfig = getConfig().languages.sort();

  if (languagesConfig !== getI18nFilesArray) {
    deleting(getI18nFilesArray);

    await generate();
  } else {
    await output();
  }
}

async function output() {
  createDir("qlee/config", [
    {
      path: `translate.config.json`,
      content: {
        defaultLang: "fr",
        languages: ["fr", "en", "es"],
        translate: true,
        generate: true,
        "output-translations-files": "i18n",
      },
    },
  ]);

  createDir("qlee/config/private", [
    {
      path: `google-translate.json`,
      content: {
        GOOGLE_TRANSLATE_PROJECT_ID: "XXXXXX",
        GOOGLE_TRANSLATE_API_KEY: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      },
    },
  ]);
}
