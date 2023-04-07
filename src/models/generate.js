import fs from "fs";
import prettier from "prettier";

const path = "./src/translations";

fs.readdir(path, (err, fichiers) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier :", err);
    return;
  }

  const config = JSON.parse(
    fs.readFileSync("src/config/translate.config.json").toString()
  );

  const DATA = [];

  const ref = fs
    .readFileSync(`src/translations/${config.defaultLang}.json`)
    .toString();
  function getIDs() {
    const keys = Object.keys(JSON.parse(ref));

    return keys;
  }

  const IDs = getIDs();

  function getVariables() {
    const object = JSON.parse(ref);

    const variables = [];

    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];

        const pattern = /{{(.*?)}}/g;

        // Utilisation de la méthode match pour trouver tous les motifs correspondants dans la chaîne de caractères
        const matches = element.match(pattern);

        // Affichage des résultats
        if (matches) {
          for (const match of matches) {
            // Suppression des balises "{{}}" autour de la valeur
            const value = match.replace(/{{|}}/g, "");
            variables.push(value);
          }
        }
      }
    }

    return variables;
  }

  const variables = getVariables();

  console.log(fichiers);

  fichiers
    .filter((e) => e.includes(".json"))
    .map((file) => {
      const languagesJSON = fs
        .readFileSync(`src/translations/${file}`)
        .toString();
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

      const getIDs = IDs.map((id) => {
        return `"${id}"`;
      });

      const jsData = `

      export interface Translate {
        id: ${getIDs.join(" | ")};
        variables?: { 
          ${variables.join(": string;")} : string;
        },
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

      const formattedJsData = prettier.format(jsData, {
        parser: "babel",
        semi: true,
        trailingComma: "es5",
        singleQuote: true,
        tabWidth: 2,
      });

      fs.writeFileSync("./src/translations/translations.ts", formattedJsData);
    });
  console.log(`Le fichier translate a été mis à jour.`);
});
