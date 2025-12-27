// Node-Hub/server.js — FINAL VERSION (dec 2025)
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());

// Serve static files from public/
app.use(express.static(join(__dirname, "public"), {
  setHeaders: (res, path) => {
    if (path.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }
  }
}));

app.use('/NAXUS', express.static(join(__dirname, 'public', 'NAXUS')));

app.get('/polygon', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'POLYGON', 'polygon.css'));
});

app.listen(3000, () => {
  console.log("YOUR ALL-MIND HUB IS LIVE → http://localhost:3000/apps/calculator/calculator_os.js");
});