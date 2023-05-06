import { getConfig } from "../config/config.js";
import { sucessMsg } from "../utils/handlers/handlers.js";
import { generateCLI } from "./cli/generate.js";
import { startCLI } from "./cli/start.js";
import { translateCLI } from "./cli/translate.js";

const args = process.argv.slice(2);

type cmdType = { [key: string]: string[] };

const commands: cmdType = {
  start: ["start", "s"],
  generate: ["generate", "g"],
  translate: ["translate", "t"],
};

const cli = (cmd: string): boolean => {
  return args.some((arg) => commands[cmd].includes(arg));
};

if (cli("start")) {
  startCLI();
}

if (cli("generate")) {
  generateCLI().then(() => {
    sucessMsg("   Translations files generated");
  });
}

if (cli("translate")) {
  translateCLI().then(() => {
    sucessMsg("   Translations files translated");
  });
}
