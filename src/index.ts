import express from "express";
import { config } from "./config/config.js";
import { Translate } from "./interfaces/translate.js";
import { getTranslate, googleTranslate } from "./models/translate.js";
import { translations } from "./translations/translations.js";

const app = express();

const port = 3000;

/* export async function t(str: Translate) {
  const variables: any = str?.variables;

  const id = str.id;

  const languages: any = { ...dataLanguages };

  const userLang = "en";

  const defaultLang = str.language.from
    ? str.language.from
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

  let textOut = "";

  if (variables) {
    textOut = value.replaceAll(regex, (key: any) => {
      const variableValue = key.replaceAll("{{", "").replaceAll("}}", "");

      return variables[variableValue];
    });
  } else {
    if (value.includes("{{")) {
      textOut = removeBrace(value);
    } else {
      textOut = value;
    }
  }

  const g = await googleTranslate(textOut, str.language.to);
  return g;
}
 */

function t(input: Translate): string {
  const regex = /\[(.*?)\]/g;

  const [getID, variables]: [string, any] = [input.id, input.variables];

  const getTranslattionJSON = translations[getID];

  if (variables) {
    const replaceVariables = getTranslattionJSON.replace(
      regex,
      (match: string, value: string) => {
        const placeholders = variables[value];

        return placeholders;
      }
    );

    return replaceVariables;
  }

  return getTranslattionJSON;
}

console.log(
  t({
    id: "hello",
    variables: { name: "Billy", age: "26", job: "Plombier" },
  })
);
