import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Définition du middleware pour servir les fichiers statiques depuis /dist
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(port, () => {
  console.log(`Application en cours d'exécution sur http://localhost:${port}`);
});
