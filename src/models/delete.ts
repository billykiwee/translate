import fs from "fs";
import { config } from "../config/config.js";

export function deleteTranslation() {
  const directotyFile = "src/translations/";

  fs.readdir(directotyFile, (err, files) => {
    if (err) {
      console.error(`Erreur at deleted : ${err}`);
      return;
    }

    const langaugesConfig = config.languages;

    const languagesInDirectory = files.map((e: any) =>
      e.replaceAll(".json", "")
    );

    function getLanguageToRemove() {
      let langRemoved: any[] = [];

      langRemoved = langaugesConfig.filter(
        (val: any) => !languagesInDirectory.includes(val)
      );

      langRemoved = languagesInDirectory.filter(
        (val: any) => !langaugesConfig.includes(val)
      );

      return langRemoved;
    }

    deleting(getLanguageToRemove());
  });
}

async function deleting(langToRemove: string[]) {
  if (!langToRemove.length) {
    return;
  }

  for (let i = 0; i < langToRemove.length; i++) {
    const filePath = `src/translations/${langToRemove[i]}.json`;

    fs.unlink(filePath, (err) => {});

    console.log(
      `     - ${langToRemove[i].toUpperCase().split(".")[0]} deleted`
    );
  }
}
