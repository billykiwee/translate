export interface Translate {
  id:
    | "hello"
    | "cool"
    | "why"
    | "because"
    | "saymyname"
    | "get"
    | "love"
    | "my-profil";
  variables?: {
    name: string | number,
    age: string | number,
    job: string | number,
  };
  language?: "en" | "fr";
}
