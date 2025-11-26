// Node-Hub/server.js — FINAL VERSION (this fixes everything)
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

app.listen(3001, () => {
  console.log("YOUR HUB IS LIVE → http://localhost:3001/apps/calculator/calculator_os.js");
});