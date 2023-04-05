import fs from "fs";
import translate from "translate-google";

const source = fs.readFileSync("./src/translate/en.json", "utf-8");

const placeholderRegex = /\{\{([^\}]+)\}\}/g;

const placeholders = [];

const sourceWithPlaceholders = source.replace(
  placeholderRegex,
  (match, placeholder) => {
    placeholders.push(placeholder);
    return "{{" + placeholder + "}}";
  }
);

const languages = ["fr", "es", "ru"];

fs.mkdirSync("./translations");

for (let i = 0; i < languages.length; i++) {
  translate(sourceWithPlaceholders, { to: languages[i] })
    .then((targetWithoutPlaceholders) => {
      const target = targetWithoutPlaceholders.replace(
        placeholderRegex,
        (_, index) => {
          return `{{${placeholders.splice(0, 1)}}}`;
        }
      );

      fs.writeFileSync(
        `translations/${languages[i]}.json`,
        JSON.stringify(target, null, 2)
      );

      console.log("La traduction est terminée.");
    })
    .catch(function (err) {
      console.error("Une erreur est survenue lors de la traduction :", err);
    });
}
