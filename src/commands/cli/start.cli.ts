import fs from "fs";
import { ConfigInt, getConfig } from "../../config/config.js";
import { createType } from "../../controllers/create.js";
import { deleting } from "../../controllers/delete.js";
import { createDir } from "../../utils/functions/createDir.js";
import { errorMsg, pendingMsg } from "../../utils/handlers/handlers.js";
import { generateCLI } from "./generate.cli.js";

export const qleeExists = fs.existsSync("qlee");

export async function startCLI() {
  pendingMsg("Qlee in running");

  /*   if (qleeExists) {
    return;
  } */

  createType();

  await generateConfig().then(async () => {
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
    await generateConfig();
  }
}

async function generateConfig() {
  const preConfig: ConfigInt = {
    defaultLang: "en",
    languages: ["en", "fr", "es"],
    "output-translations-files": "i18n",
    translation: {
      "google-translate": {
        GOOGLE_TRANSLATE_PROJECT_ID: "env",
        GOOGLE_TRANSLATE_API_KEY: "env",
      },
    },
  };

  createDir("qlee/config", [
    {
      path: `qlee.config.json`,
      content: preConfig,
    },
  ]);

  const languages = preConfig.languages || [];

  for (let i = 0; i < languages.length; i++) {
    const cretateI18nFiles = async () => {
      if (languages[i] === preConfig.defaultLang) {
        createDir("qlee/" + preConfig["output-translations-files"], [
          {
            path: `default-${languages[i]}.json`,
            content: {
              qlee: `Welcome to your ${languages[
                i
              ]?.toUpperCase()} translation file.`,
              variables:
                "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
            },
          },
        ]);

        return;
      }

      return createDir("qlee/" + preConfig["output-translations-files"], [
        {
          path: `${languages[i]}.json`,
          content: {
            qlee: `Welcome to your ${languages[
              i
            ]?.toUpperCase()} translation file.`,
            variables:
              "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
          },
        },
      ]);
    };

    cretateI18nFiles()
      .then(() => {
        console.log(`${languages[i]?.toUpperCase()} generated`);
      })
      .catch((err) => {
        errorMsg(err);
      });
  }
}
