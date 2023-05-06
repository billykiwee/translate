import fs from "fs";
import { ConfigInt, getConfig } from "../../config/config.js";
import { createConfig, createType } from "../../controllers/create.js";
import { deleting } from "../../controllers/delete.js";
import { createDir } from "../../utils/functions/createDir.js";
import { errorMsg, pendingMsg } from "../../utils/handlers/handlers.js";
import { generateCLI } from "./generate.cli.js";

export const qleeExists = fs.existsSync("qlee");

export async function startCLI() {
  pendingMsg(`[${new Date().toLocaleTimeString()}] Qlee in running`);

  if (qleeExists) {
    return;
  }

  createType();

  await createConfig().then(async () => {
    await generateCLI();
  });
}

if (qleeExists) {
  fs.watch(`qlee/config/qlee.config.json`, configChange);
}

async function configChange() {
  const i18nFiles = await fs.promises.readdir(
    `qlee/${getConfig()?.["output-translations-files"]}`
  );

  const getI18nFilesArray = i18nFiles
    .map((file) => file.replace(".json", "").replace("default-", ""))
    .sort();

  const languagesConfig = getConfig()?.languages.sort();

  if (languagesConfig !== getI18nFilesArray) {
    // deleting(getI18nFilesArray);

    await generateCLI();
  } else {
    await createConfig();
  }
}
