import fs from "fs";
import { getConfig } from "../config/config.js";
import { createDir } from "../config/setup.js";
import { googleTranslate } from "../modules/translate.js";
import { pendingMsg, sucessMsg } from "../utils/handlers/handlers.js";

const config = getConfig();

const args = process.argv.slice(2);

type cmdType = { [key: string]: string[] };

const commands: cmdType = {
  generate: ["generate", "g"],
  translate: ["translate", "t"],
  delete: ["delete", "d"],
};

const cli = (cmd: string): boolean => {
  return args.some((arg) => commands[cmd].includes(arg));
};

if (cli("generate") && config.generate) {
  generate().then(() => {
    sucessMsg("   Translations files generated");
  });
}

if (cli("translate") && config.translate) {
  translations().then(() => {
    sucessMsg("   Translations files translated");
  });
}

async function generate() {
  const json = fs.readFileSync(`src/language/default.json`).toString();

  const languages = getConfig().languages;

  pendingMsg("Generate in progress...");

  for (const lang in languages) {
    createDir("./src/translations", [
      {
        path: `${languages[lang]}.json`,
        content: JSON.parse(json),
      },
    ]);

    return console.log(`${languages[lang]?.toUpperCase()} generated`);
  }
}

async function translations() {
  const json = fs.readFileSync(`src/language/default.json`).toString();

  const languages = getConfig().languages;

  pendingMsg("Translations in progress...");

  for (const l in languages) {
    const lang = languages[l];

    return googleTranslate(JSON.parse(json), lang as string)
      .then((translated) => {
        createDir("./src/translations", [
          {
            path: `${lang}.json`,
            content: translated,
          },
        ]);
      })
      .then(() => {
        return console.log(`${lang?.toUpperCase()} translated`);
      });
  }
}
