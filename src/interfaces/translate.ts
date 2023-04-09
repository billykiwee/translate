export interface Translate {
  id: "you-default-language" | "hello" | "cool";
  variables?: { [key: string]: string | number };
  language?: "en" | "fr";
}
