import fs from "fs";

const enJson = fs.readFileSync("./src/translate/translations/en.json");
const frJson = fs.readFileSync("./src/translate/translations/fr.json");

const en = JSON.parse(enJson);
const fr = JSON.parse(frJson);

const data = { en, fr };

const jsData = `export const dataLanguages = ${JSON.stringify(data, null, 2)};`;

fs.writeFileSync("./src/translate/translations.ts", jsData);

console.log("Le fichier a été créé avec succès.");
