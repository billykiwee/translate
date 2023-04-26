import fs from "fs";
import { getConfig } from "../config/config.js";
import { createDir } from "../config/setup.js";
import { googleTranslate } from "../modules/translate.js";
import { pendingMsg, sucessMsg } from "../utils/handlers/handlers.js";

const config = getConfig();

const args = process.argv.slice(2);

interface Commands {
  [key: string]: string[];
}

const commands: Commands = {
  generate: ["generate", "g"],
  translate: ["translate", "t"],
};

const cli = (cmd: string): boolean => {
  return args.some((arg) => commands[cmd].includes(arg));
};

if (cli("generate") && config.generate) {
  generate();
}

if (cli("translate") && config.translate) {
  translations();
}

function generate() {
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

    console.log(`${languages[lang]?.toUpperCase()} generated`);
  }
}

async function translations() {
  const json = fs.readFileSync(`src/language/default.json`).toString();

  const languages = getConfig().languages;

  pendingMsg("Translations in progress...");

  for (const l in languages) {
    const lang = languages[l];

    googleTranslate(JSON.parse(json), lang as string)
      .then((translated) => {
        createDir("./src/translations", [
          {
            path: `${lang}.json`,
            content: translated,
          },
        ]);
      })
      .then(() => {
        console.log(`${lang?.toUpperCase()} translated`);
      });
  }
}
