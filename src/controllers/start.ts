import fs from "fs";
import { getConfig } from "../config/config.js";
import { configChanged } from "../save/save.js";
import { createDir } from "../utils/functions/createDir.js";
import { createType } from "./create.js";
import { deleting } from "./delete.js";
import { generate } from "./generate.js";

export async function start() {
  // const qlee = await fs.promises.readdir("qlee").catch(() => []);

  // const isConfigChanged = await configChanged();

  createType();

  await generate();

  await output();
}

fs.watch(`qlee/config/translate.config.json`, configChange);

async function configChange() {
  const i18nFiles = await fs.promises.readdir(
    `qlee/${getConfig()["output-translations-files"]}`
  );

  console.log(i18nFiles);

  deleting(i18nFiles.filter((file) => !file.includes("default")));

  await generate();
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
