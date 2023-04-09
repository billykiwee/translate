import fs from "fs";
import { config } from "../config/config.js";
import { areObjectsEqual } from "../functions/objectsEquals.js";
import { googleTranslate } from "../models/translate.js";

export const upadteFiles = async () => {
  const json = fs.readFileSync("src/language/language.json").toString();

  const lang = config.languages;

  const jsonParser = JSON.parse(json);

  async function getT(lang: string) {
    let obj = [];
    for (const key in jsonParser) {
      if (Object.prototype.hasOwnProperty.call(jsonParser, key)) {
        const element = jsonParser[key];

        const placeholder = element.match(/\[(.*?)\]/g);

        const emptyBraces = element.replace(/\[(.*?)\]/g, () => "[]");

        const afterTranslate = googleTranslate(emptyBraces, lang);

        const getTranslateWithVariables = await afterTranslate.then(
          (translated: any) => {
            if (placeholder) {
              const translatedSplit = translated.split(" ");

              for (let i = 0; i < translatedSplit.length; i++) {
                if (translatedSplit[i] === "[]") {
                  translatedSplit[i] = placeholder.shift();
                }
              }
              return translatedSplit.join(" ");
            } else {
              return translated;
            }
          }
        );

        obj.push({ [key]: getTranslateWithVariables });
      }
    }

    return Object.assign({}, ...obj);
  }

  if (canTranslate(json)) {
    for (const l in lang) {
      const transaltions = await getT(lang[l]);

      async function pushTranslation() {
        return fs.writeFileSync(
          `./src/translations/${lang[l]}.json`,
          JSON.stringify(transaltions, null, 2)
        );
      }
      pushTranslation().then(() => {
        console.log(`✅ Translations ${lang[l].toUpperCase()} done`);
      });
    }
  } else {
    console.log(`✅ Translations up-to-date`);
  }

  function canTranslate(json: string) {
    const defaultLangJson = fs
      .readFileSync(`src/translations/${config.defaultLang}.json`)
      .toString();

    return (
      config.translate &&
      areObjectsEqual(JSON.parse(json), JSON.parse(defaultLangJson))
    );
  }

  const dossierPath = "src/translations/";

  fs.readdir(dossierPath, (err, fichiers) => {
    if (err) {
      console.error(`Erreur lors de la lecture du dossier : ${err}`);
      return;
    }

    const langaugesConfig = lang.map(
      (value: string) => value.toLowerCase() + ".json"
    );

    function getLang() {
      let langRemoved: string[] = [];

      langRemoved = langaugesConfig.filter(
        (val: string) => !fichiers.includes(val)
      );

      langRemoved = fichiers.filter(
        (val: string) => !langaugesConfig.includes(val)
      );

      return langRemoved;
    }

    fichiers.forEach((fichier) => {
      const languages = getLang();

      for (const v in languages) {
        const filePath = `src/translations/${languages[v]}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Erreur lors de la suppression du fichier : ${err}`);
            return;
          }
          console.log(`Le fichier ${filePath} a été supprimé avec succès`);
        });
      }
    });
  });
};
