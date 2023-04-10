export type LanguagesConfig = "fr" | "en" | "es" | "ru" | undefined;

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
    | "about"
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
    | "undo"
    | "redo";
  variables?: { [key: string]: string | number };
  language?: LanguagesConfig;
}
