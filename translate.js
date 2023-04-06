import fs from "fs";
import translate from "translate-google";

const source = fs.readFileSync("./src/translate/en.json", "utf-8");

const sourceWithPlaceholders = source
  .replaceAll("{{", "[[")
  .replaceAll("}}", "]]");

const languages = ["es", "fr", "de"];

if (!fs.existsSync("./translations")) {
  fs.mkdirSync("./translations");
}

for (let i = 0; i < languages.length; i++) {
  const obj = JSON.parse(sourceWithPlaceholders);

  translate(obj, {
    to: "fr", //languages[i],
  })
    .then((translated) => {
      const values = JSON.parse(translated);

      fs.writeFileSync(
        `translations/${languages[i]}.json`,
        JSON.stringify(values, null, 2)
      );

      console.log(`La traduction ${languages[i]} est terminée.`);
    })
    .catch(function (err) {
      console.error("Une erreur est survenue lors de la traduction :", err);
    });
}
