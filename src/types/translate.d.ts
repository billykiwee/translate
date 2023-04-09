declare module "translate-google" {
  const translate: (
    text: string,
    opts: { to: string; from?: string },
    gotopts?: any
  ) => void;

  export default translate;
}
