import fs from "fs";
import { formatJson } from "../utils/functions/formatJson.js";
import { getConfig } from "./config.js";

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

createDir("qlee/config", [
  {
    path: `qlee.config.ts`,
    content: `const config: Config = {
        defaultLang: "fr",
        languages: ["fr", "en"],
        translate: true,
    }
    `,
  },
]);

/* createDir("qlee/", [
  {
    path: `default.${getConfig().defaultLang}.json`,
    content: {
      qlee: `Welcome to your default langauge ${
        getConfig().defaultLang
      } translation file.`,
      variables:
        "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
    },
  },
]);

for (let i = 0; i < getConfig().languages.length; i++) {
  createDir("qlee/languages", [
    {
      path: `${getConfig().languages[i]}.json`,
      content: {
        qlee: `Welcome to your ${getConfig().languages[
          i
        ]?.toUpperCase()} translation file.`,
        variables:
          "To put variables in your translation file, you only have to put his name in an array. Exemple: Welcome [name] to our app !",
      },
    },
  ]);
} */
