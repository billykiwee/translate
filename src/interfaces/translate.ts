export interface Translate {
  id: "you-default-language" | "hello";
  variables?: { [key: string]: string | number };
  language?: "en" | "fr";
}
