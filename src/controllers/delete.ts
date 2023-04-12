import fs from "fs";
import { getConfig } from "../config/config.js";

export function deleteTranslation() {
  return new Promise((resolve, reject) => {
    fs.readdir("src/translations/", (err, files) => {
      if (err) {
        reject(`Erreur at readdir : ${err}`);
      } else {
        resolve(files);
      }
    });
  });
}

function getLanguageToRemove(files: string[]) {
  const langaugesConfig = getConfig().languages;

  const languagesInDirectory = files.map((e: any) => e.replaceAll(".json", ""));

  let langRemoved: any[] = [];

  langRemoved = langaugesConfig.filter(
    (val: any) => !languagesInDirectory.includes(val)
  );

  langRemoved = languagesInDirectory.filter(
    (val: any) => !langaugesConfig.includes(val)
  );

  return langRemoved;
}

export function deleting(files: string[]) {
  const langToRemove = getLanguageToRemove(files);

  if (!langToRemove.length) {
    return;
  }

  for (let i = 0; i < langToRemove.length; i++) {
    const filePath = `src/translations/${langToRemove[i]}.json`;

    fs.unlink(filePath, (err) => {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `     - ${langToRemove[i].toUpperCase()} deleted`
      );
    });
  }
}
