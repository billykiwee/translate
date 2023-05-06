import { getConfig } from "../../config/config.js";
import { cretateI18nFiles } from "../../controllers/create.js";
import { createDir } from "../../utils/functions/createDir.js";
import { errorMsg } from "../../utils/handlers/handlers.js";

export async function generateCLI() {
  const languages = getConfig()?.languages || [];

  for (let i = 0; i < languages.length; i++) {
    cretateI18nFiles(languages[i])
      .then(() => {
        console.log(`${languages[i]?.toUpperCase()} generated`);
      })
      .catch((err) => {
        errorMsg(err);
      });
  }
}
