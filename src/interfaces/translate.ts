export interface Translate {
  id: "hello" | "cool" | "why" | "because" | "saymyname" | "project";
  variables?: { name: string, age: string, job: string };
  language?: "en" | "fr" | "es" | "de";
}
