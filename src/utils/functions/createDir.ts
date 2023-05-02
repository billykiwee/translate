import fs from "fs";
import { formatJson } from "./formatJson.js";

interface Files {
  path: string;
  content?: string | number | object | any[];
}

export const createDir = (path: string, files?: Files[]) => {
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) throw err;

    if (files) {
      for (const f in files) {
        const content = files[f].content;

        fs.writeFileSync(
          path + "/" + files[f].path,

          typeof content === "object"
            ? JSON.stringify(content, null, 2)
            : formatJson(content as string)
        );
      }
    }
  });
};
