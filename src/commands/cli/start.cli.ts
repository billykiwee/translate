import fs from "fs";
import { getConfig } from "../../config/config.js";
import { createType } from "../../controllers/create.js";
import { deleting } from "../../controllers/delete.js";
import { createDir } from "../../utils/functions/createDir.js";
import { pendingMsg } from "../../utils/handlers/handlers.js";
import { generateCLI } from "./generate.cli.js";

export async function startCLI() {
  pendingMsg("Qlee in running");

  const qleeExists = await fs.promises.readdir("qlee");

  if (qleeExists) {
    return;
  }

  createType();
  await generateCLI();
}

fs.watch(`qlee/config/translate.config.json`, configChange);

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

    await generateCLI();
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
