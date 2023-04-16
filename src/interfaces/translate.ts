export type LanguagesConfig = "fr" | "en" | undefined;

export interface Translate {
  id:
    | "you"
    | "hello"
    | "cool"
    | "good"
    | "thanks"
    | "please"
    | "sorry"
    | "yes"
    | "no"
    | "help"
    | "home"
    | "contact"
    | "settings"
    | "profile"
    | "search"
    | "submit"
    | "cancel"
    | "delete"
    | "edit"
    | "save"
    | "next"
    | "previous"
    | "accept"
    | "reject"
    | "view"
    | "download"
    | "upload"
    | "open"
    | "close"
    | "refresh"
    | "copy"
    | "paste"
    | "cut"
    | "redo"
    | "jobs"
    | "again";
  variables?: { [key: string]: string | number };
  language?: LanguagesConfig;
}
