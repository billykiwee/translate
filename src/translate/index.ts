import { dataLanguages } from "./translations.js";

interface Translate {
  id: string | number;
  variables?: Object;
  force?: "en" | "fr";
}

export function translate(str: Translate): any {
  const variables: any = str?.variables;

  const id = str.id;

  const { fr, en } = dataLanguages;

  const languages: any = { fr, en };

  const userLang = window.navigator.language;

  const defaultLang = str.force ? str.force : userLang.split("-")[0] ?? "en";

  const value = languages[defaultLang][id];

  const regex = /{{\s*(\w+)\s*}}/g;

  if (!value) {
    return console.error(`The ID : "${id}" "not found in translations`);
  }
  if (variables) {
    // Pas de variable

    const errorVariables = () => {
      const mustVariables: string[] = [];

      value.replaceAll(regex, (key: string) => {
        const variables = key.replaceAll("{{", "").replaceAll("}}", "");

        mustVariables.push(variables);
      });
      throw new Error(
        `This translations must contains those variables : ${mustVariables.join(
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

    value.replaceAll(regex, (key: string) => {
      const variables = key.replaceAll("{{", "").replaceAll("}}", "");

      mustVariables.push(variables);
    });

    const ifVariablesDosentMatches = () => {
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
              ? '" ' + extraElements.join(", ") + ' " does not exit'
              : ""
          }  \n The variable " ${missingElements.join(
            ", "
          )} " is not asignable to this translation. It must contains : ${mustVariables.join(
            ", "
          )}`
        );
      }
      if (extraElements.length) {
        throw new Error(
          `The variable " ${extraElements.join(
            ", "
          )} " is not asignable to this translation. It must contains : ${mustVariables.join(
            ", "
          )}`
        );
      }
    };
    try {
      ifVariablesDosentMatches();
    } catch (err) {
      console.error(err);
    }
  }

  const removeBrace = (value: string) => {
    value.replaceAll("{{", "").replaceAll("}}", "");
  };

  if (variables) {
    return value.replaceAll(regex, (key: string) => {
      const getVariablesValues = key.replaceAll("{{", "").replaceAll("}}", "");

      return variables[getVariablesValues];
    });
  } else {
    return removeBrace(value);
  }
}

document.querySelector("html")!.innerHTML = translate({
  id: "hello",
  variables: {
    name: "Bob",
    age: "12",
    job: "Plombier",
  },
  force: "fr",
});
