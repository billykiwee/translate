import fs from "fs";
import { createType } from "../models/generate.js";
import { upadteFiles } from "../models/update.js";

export function save() {
  upadteFiles();
  createType();
}

// Chemin du fichier à surveiller
const filePath = "src/language/language.json";

// Fonction de rappel (callback) appelée lorsque le fichier est modifié
const fileChangeCallback = (event: any, filename: string) => {
  console.log(event, filename, filePath);

  if (event === "change") {
    console.log(`Translations files is updating`);

    save();
  }
};

// Démarrer la surveillance du fichier
fs.watch(filePath, fileChangeCallback);

// Afficher un message pour indiquer que la surveillance a commencé
console.log(`Surveillance du fichier ${filePath} en cours...`);
