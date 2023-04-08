import express from "express";
import { getTranslate } from "./models/translate.js";
import {
  config,
  dataLanguages,
  Translate,
} from "./translations/translations.js";

const app = express();
const port = 3000; // Remplacez par le port souhaité

export function translate(str: Translate): any {
  const variables: any = str?.variables;
  const id = str.id;
  const languages: any = { ...dataLanguages };
  const userLang = "en"; // Remplacez par la logique pour obtenir la langue de l'utilisateur
  const defaultLang = str.language
    ? str.language
    : userLang.split("-")[0] ?? config.defaultLang;
  const value = languages[defaultLang][id];
  const regex = /{{\s*(\w+)\s*}}/g;

  if (!value) {
    console.error(`The ID : "${id}" "not found in translations`);
    return;
  }
  if (variables) {
    const errorVariables = () => {
      const mustVariables: string[] = [];

      value.replaceAll(regex, (key: any) => {
        const variable = key.replaceAll("{{", "").replaceAll("}}", "");
        mustVariables.push(variable);
      });
      throw new Error(
        `This translation must contain the following variables: ${mustVariables.join(
          ", "
        )}.`
      );
    };

    if (!Object.values(variables).length) {
      try {
        errorVariables();
      } catch (err) {
        console.error(err);
      }
    }

    const mustVariables: string[] = [];

    value.replaceAll(regex, (key: any) => {
      const variable = key.replaceAll("{{", "").replaceAll("}}", "");
      mustVariables.push(variable);
    });

    const ifVariablesDoNotMatch = () => {
      const missingElements = mustVariables.filter(
        (el) => !Object.keys(variables).includes(el)
      );

      const extraElements = Object.keys(variables).filter(
        (el) => !mustVariables.includes(el)
      );

      if (missingElements.length) {
        throw new Error(
          `${
            extraElements.length
              ? '"' + extraElements.join(", ") + '" does not exist. '
              : ""
          }The variable "${missingElements.join(
            ", "
          )}" is not assignable to this translation. It must contain: ${mustVariables.join(
            ", "
          )}`
        );
      }
      if (extraElements.length) {
        throw new Error(
          `The variable "${extraElements.join(
            ", "
          )}" is not assignable to this translation. It must contain: ${mustVariables.join(
            ", "
          )}`
        );
      }
    };
    try {
      ifVariablesDoNotMatch();
    } catch (err) {
      console.error(err);
    }
  }

  const removeBrace = (value: any) => {
    return value.replaceAll("{{", "").replaceAll("}}", "");
  };

  /*   if (variables) {
    return value.replaceAll(regex, (key: any) => {
      const variableValue = key.replaceAll("{{", "").replaceAll("}}", "");
      return variables[variableValue];
    });
  } else {
    if (value.includes("{{")) {
      return removeBrace(value);
    } else {
      return value;
    }
  } */
  if (str.language) {
    const t = getTranslate(str.language, value);
    return t;
  }
}

const t = translate({
  id: "hello",
  variables: { name: "Genail", age: "12", job: "garagiste" },
});

app.get("/", (req, res) => {
  res.send(t);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
