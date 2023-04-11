import fs from "fs";
import { getConfig } from "../config/config.js";

import { pendingMsg } from "../handlers/utils.js";
import { createType } from "../models/generate.js";
import { upadteFiles } from "../models/update.js";

const filePath = ["src/", "src/language/", "./translate.config.json"];

const fileChangeCallback = (event: any, filename: string) => {
  if (event === "change") {
    save();
  }
};

for (const v in filePath) {
  fs.watch(filePath[v], fileChangeCallback);
}

export function save() {
  getConfig();

  upadteFiles();

  createType();

  pendingMsg(`Translation is running...`);
}
