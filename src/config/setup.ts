import fs from "fs";
import { formatJson } from "../utils/functions/formatJson.js";
import { getConfig } from "./config.js";

const config = getConfig();

interface Files {
  path: string;
  content?: string | number | object | any[];
}

export const createDir = (path: string, files?: Files[]) => {
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) throw err;

    if (files) {
      for (const f in files) {
        const content = files[f].content;

        fs.writeFileSync(
          path + "/" + files[f].path,

          typeof content === "object"
            ? JSON.stringify(content, null, 2)
            : formatJson(content as string)
        );
      }
    }
  });
};

createDir("qlee/config/private", [
  {
    path: `google-translate.json`,
    content: {
      GOOGLE_TRANSLATE_PROJECT_ID: "XXXXXX",
      GOOGLE_TRANSLATE_API_KEY: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
  },
]);
createDir("qlee/config", [
  {
    path: `translate.config.json`,
    content: {
      defaultLang: "fr",
      languages: ["fr", "en", "es"],
      translate: true,
      generate: true,
    },
  },
]);

const languages = config.languages;

for (let i = 0; i < languages.length; i++) {
  createDir(config["output-translations-files"], [
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
}

createDir("qlee", [
  {
    path: `default-${getConfig().defaultLang}.json`,
    content: {
      qlee: `This is your default language translation file. You choose: ${getConfig().defaultLang.toUpperCase()}.`,
      variables:
        "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
    },
  },
]);
