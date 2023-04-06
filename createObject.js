import fs from "fs";
import prettier from "prettier";

// Chemin du dossier dont vous voulez récupérer les noms de fichiers
const path = "./src/translate";

const files = [];

// Lecture du dossier
fs.readdir(path, (err, fichiers) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier :", err);
    return;
  }

  const config = JSON.parse(
    fs.readFileSync("src/translate/translate.config.json")
  );

  const DATA = [];

  fichiers
    .filter((e) => e.includes(".json") && !e.includes(".config"))
    .map((file) => {
      const languagesJSON = fs.readFileSync(`src/translate/${file}`);
      const getFIleData = {
        [file.split(".json")[0]]: JSON.parse(languagesJSON),
      };

      DATA.push(getFIleData);

      function mergeJsonObjects(DATA) {
        let mergedObject = {};

        DATA.forEach((jsonObject) => {
          const key = Object.keys(jsonObject)[0];
          const value = jsonObject[key];

          mergedObject[key] = value;
        });

        return mergedObject;
      }

      const getLanguages = config.languages.map((lang) => {
        return `"${lang}"`;
      });

      const jsData = `

      export interface Translate {
        id: string | number;
        variables?: Object;
        language?: ${getLanguages.join(" | ")};
      }

      interface TranlationJSON {
        [key: string] : Object;
      }
      
      export const config = ${JSON.stringify(config)};
      
    export const dataLanguages: TranlationJSON = ${JSON.stringify(
      mergeJsonObjects(DATA)
    )};
`;

      const mergedObject = mergeJsonObjects(DATA);

      const formattedJsData = prettier.format(jsData, {
        parser: "babel",
        semi: true,
        trailingComma: "es5",
        singleQuote: true,
        tabWidth: 2,
      });

      fs.writeFileSync("./src/translate/translations.ts", formattedJsData);
    });
  console.log(`Le fichier translate a été mis à jour.`);
});
