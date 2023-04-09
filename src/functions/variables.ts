import { config } from "../config/config.js";

export function getVariables(json: any) {
  return `
  {
      id: "${Object.keys(json).join('" | "')}",
      variables?: { [key: string] : string | number },
      language?: "${config.languages.join('" | "')}"
  }
  `;
}
