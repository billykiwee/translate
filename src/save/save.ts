import fs from "fs";
import { config } from "../config/config.js";
import { createType } from "../models/generate.js";
import { upadteFiles } from "../models/update.js";

export function save() {
  upadteFiles();
  createType();
}

// Chemin du fichier à surveiller
const filePath = `src/language/default.json`;

const fileChangeCallback = (event: any, filename: string) => {
  console.log(event, filename, filePath);

  if (event === "change") {
    console.log(`Translations files is updating`);

    save();
  }
};

fs.watch(filePath, fileChangeCallback);

console.log(`Monitoring default.json in progress...`);
