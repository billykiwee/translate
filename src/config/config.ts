import fs from "fs";

export const config = JSON.parse(
  fs.readFileSync("translate.config.json").toString()
);
