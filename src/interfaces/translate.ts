export type LanguagesConfig = "en" | "fr" | "es" | undefined;

export type Variables = { [key: string]: string | number };

export type Ids =
  | "you"
  | "hello"
  | "cool"
  | "contact"
  | "jobs"
  | "again"
  | "good"
  | "boy";

export interface Translate {
  id: Ids;
  variables?: Variables;
  language?: LanguagesConfig;
}
