export interface Translate {
  id:
    | "hello"
    | "cool"
    | "why"
    | "because"
    | "saymyname"
    | "project"
    | "my-profil";
  variables?: {
    name: string | number,
    age: string | number,
    job: string | number,
  };
  language?: "en" | "fr" | "es" | "de";
}
