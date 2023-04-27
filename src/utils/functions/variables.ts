export function getVariables(json: any) {
  return `export type Id = "${Object.keys(json).join('" | "')}"`;
}
