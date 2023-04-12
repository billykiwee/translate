export function getVariables(json: any) {
  return `
  {
      id: "${Object.keys(json).join('" | "')}",
      variables?: { [key: string] : string | number },
      language?: LanguagesConfig
  }
  `;
}
