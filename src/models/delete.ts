import fs from "fs";

export function deleteTranslation(lang: string[]) {
  const dossierPath = "src/translations/";

  fs.readdir(dossierPath, (err, fichiers) => {
    if (err) {
      console.error(`Erreur at deleted : ${err}`);

      return;
    }

    const langaugesConfig = lang.map(
      (value: string) => value.toLowerCase() + ".json"
    );

    function getLang() {
      let langRemoved: string[] = [];

      langRemoved = langaugesConfig.filter(
        (val: string) => !fichiers.includes(val)
      );

      langRemoved = fichiers.filter(
        (val: string) => !langaugesConfig.includes(val)
      );

      return langRemoved;
    }

    fichiers.forEach((fichier) => {
      const languages = getLang();

      for (const v in languages) {
        const filePath = `src/translations/${languages[v]}`;

        fs.unlink(filePath, (err) => {
          console.log(
            `     - ${languages[v].toUpperCase().split(".")[0]} deleted`
          );
        });
      }
    });
  });
}
