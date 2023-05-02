import { getConfig } from "../config/config.js";
import { generate } from "../controllers/generate.js";
import { start } from "../controllers/start.js";
import { Translate } from "../controllers/translate.js";
import { pendingMsg, sucessMsg } from "../utils/handlers/handlers.js";

const config = getConfig();

const args = process.argv.slice(2);

type cmdType = { [key: string]: string[] };

const commands: cmdType = {
  start: ["start", "s"],
  generate: ["generate", "g"],
  translate: ["translate", "t"],
  delete: ["delete", "d"],
};

const cli = (cmd: string): boolean => {
  return args.some((arg) => commands[cmd].includes(arg));
};

if (cli("start")) {
  pendingMsg(`Translation is running...`);

  start().then(() => {
    sucessMsg("   Translations files generated");
  });
}

if (cli("generate") && config.generate) {
  generate().then(() => {
    sucessMsg("   Translations files generated");
  });
}

if (cli("translate") && config.translate) {
  Translate().then(() => {
    sucessMsg("   Translations files translated");
  });
}
