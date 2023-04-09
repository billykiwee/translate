import { config } from "../config/config.js";

export function getVariables(json: any) {
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      const element = json[key];

      const regex = /\[([\w:]+)\]/g;
      const matches = element.match(regex);

      return `
  {
      id: "${Object.keys(json).join('" | "')}",
      variables?: { [key: string] : string | number },
      language?: "${config.languages.join('" | "')}"
  }
  `;
    }
  }
}
