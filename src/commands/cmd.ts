import { getConfig } from "../config/config.js";
import { pendingMsg, sucessMsg } from "../utils/handlers/handlers.js";
import { generateCLI } from "./cli/generate.cli.js";
import { startCLI } from "./cli/start.cli.js";
import { translateCLI } from "./cli/translate.cli.js";

const config = getConfig();

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
  startCLI().then(() => {
    sucessMsg("   Translations files generated");
  });
}

if (cli("generate") && config.generate) {
  generateCLI().then(() => {
    sucessMsg("   Translations files generated");
  });
}

if (cli("translate") && config.translate) {
  translateCLI().then(() => {
    sucessMsg("   Translations files translated");
  });
}
