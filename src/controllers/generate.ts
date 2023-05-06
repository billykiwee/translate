import { getConfig } from "../config/config.js";
import { createDir } from "../utils/functions/createDir.js";
import { errorMsg, pendingMsg } from "../utils/handlers/handlers.js";

export async function generate() {
  const languages = getConfig().languages;

  for (let i = 0; i < languages.length; i++) {
    const cretateI18nFiles = async () => {
      if (languages[i] === getConfig().defaultLang) {
        createDir("qlee/" + getConfig()["output-translations-files"], [
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

      return createDir("qlee/" + getConfig()["output-translations-files"], [
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
