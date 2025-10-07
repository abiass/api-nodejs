// server/server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Necessário para usar __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧮 Rota da Regra de 3
app.post("/api/regra3", (req, res) => {
  const { a, b, c } = req.body;

  // Validação dos valores
  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  const cNum = parseFloat(c);

  if ([aNum, bNum, cNum].some(isNaN)) {
    return res.status(400).json({ error: "Valores inválidos." });
  }

  if (aNum === 0) {
    return res.status(400).json({ error: "A não pode ser zero." });
  }

  const resultado = (bNum * cNum) / aNum;
  res.json({ resultado: resultado.toFixed(2) });
});

// 🪄 Servir o frontend buildado (React)
const clientPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientPath));

// Redirecionar qualquer rota desconhecida para o React
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
