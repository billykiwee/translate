export type LanguagesConfig = "fr" | "en" | "es" | undefined;

export interface Translate {
  id: "you" | "hello" | "cool" | "contact" | "jobs" | "again";
  variables?: { [key: string]: string | number };
  language?: LanguagesConfig;
}
