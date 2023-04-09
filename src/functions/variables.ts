export function getVariables(json: any) {
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      const element = json[key];

      const regex = /\[([\w:]+)\]/g;
      const matches = element.match(regex);

      if (matches) {
        return `{
            id: "${Object.keys(json).join('" | "')}",
            variables: {${matches
              .map((match: string) => match.slice(1, -1))
              .join(": string;")} : string;
            }
          }`;
      } else
        return {
          key,
        };
    }
  }
}
