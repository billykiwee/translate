import fs from "fs";
import translate from "translate-google";
const source = fs.readFileSync("./src/translate/en.json", "utf-8");

const placeholderRegex = /\{\{([^\}]+)\}\}/g;
const keyRegex = /"([\w-]+)":/g;

const placeholders = [];

const sourceWithPlaceholders = source.replace(
  placeholderRegex,
  (match, placeholder) => {
    placeholders.push(placeholder);
    return "{{" + placeholder + "}}";
  }
);

const languages = ["es", "fr", "de"];

if (!fs.existsSync("./translations")) {
  fs.mkdirSync("./translations");
}

for (let i = 0; i < languages.length; i++) {
  const target = sourceWithPlaceholders.replace(
    placeholderRegex,
    (_, index) => {
      return `{{${placeholders.splice(0, 1)}}}`;
    }
  );

  translate(target, { to: languages[i] })
    .then((targetWithoutPlaceholders) => {
      fs.writeFileSync(
        `translations/${languages[i]}.json`,
        targetWithoutPlaceholders
      );

      console.log(`La traduction ${languages[i]} est terminée.`);
    })
    .catch(function (err) {
      console.error("Une erreur est survenue lors de la traduction :", err);
    });
}
