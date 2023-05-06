import { debug } from "console";
import fs, { rename } from "fs";
import { ConfigInt, getConfig } from "../../config/config.js";
import { createConfig, createType } from "../../controllers/create.js";
import { deleting } from "../../controllers/delete.js";
import { createDir } from "../../utils/functions/createDir.js";
import { errorMsg, pendingMsg } from "../../utils/handlers/handlers.js";
import { generateCLI } from "./generate.js";

export const qleeExists = fs.existsSync("qlee");

export async function startCLI() {
  const date = new Date().toLocaleTimeString();

  if (qleeExists) {
    pendingMsg(`[${date}] Qlee is running`);
    return;
  }

  pendingMsg(`[${date}] Qlee is ready`);

  createType();

  await createConfig().then(async () => {
    await generateCLI();
  });
}

if (qleeExists) {
  fs.watch(`qlee/config/qlee.config.json`, configChange);
}

async function configChange() {
  const config = getConfig();

  fs.readdir(
    `qlee/${config?.["output-translations-files"]}`,
    async (err, files) => {
      if (err) throw err;

      const getDefaultLang = files.find((file) => file.includes("default"));

      if (getDefaultLang) {
        fs.rename(
          `qlee/${
            getConfig()?.["output-translations-files"]
          }/${getDefaultLang}`,

          `qlee/${getConfig()?.["output-translations-files"]}/default-${
            getConfig()?.defaultLang
          }.json`,

          (err) => {}
        );
      }
    }
  );

  const i18nFiles = await fs.promises.readdir(
    `qlee/${getConfig()?.["output-translations-files"]}`
  );

  const getI18nFilesArray = i18nFiles
    .filter((file) => !file.includes("default-"))
    .map((file) => file.replace(".json", ""))
    .sort();

  const languagesConfig = getConfig()?.languages.sort();

  if (languagesConfig !== getI18nFilesArray) {
    deleting(getI18nFilesArray);

    //await generateCLI();
  } else {
    await createConfig();
  }
}
