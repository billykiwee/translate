import fs from "fs";
import { config } from "../config/config.js";
import { createType } from "../models/generate.js";
import { upadteFiles } from "../models/update.js";

const filePath = ["src/language/default.json", "translate.config.json"];

const fileChangeCallback = (event: any, filename: string) => {
  if (event === "change") {
    console.log(`Translations files is updating`);

    save();
  }
};

for (const v in filePath) {
  fs.watch(filePath[v], fileChangeCallback);
}

export function save() {
  upadteFiles();
  createType();

  console.log(`Monitoring default.json in progress...`);
}
