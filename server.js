// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Rota para a Regra de 3
app.post("/api/regra3", (req, res) => {
  const { a, b, c } = req.body;

  if (!a || !b || !c) {
    return res.status(400).json({ erro: "Parâmetros inválidos. Envie a, b e c." });

  }

  const resultado = (b * c) / a;
  res.json({ resultado: resultado.toFixed(2) });
});


// Rota para remover caracteres especiais
app.post("/api/removeChars", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ erro: "Texto obrigatório." });
  
  const cleanedText = text.replace(/[^a-zA-Z0-9À-ÿ\s]/g, "");
  res.json({ resultado: cleanedText });
 
});

// Rota para formatar caracteres especiais
app.post("/api/textformat", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ erro: "Texto obrigatório." });

  const upper = text.toUpperCase();
  const lower = text.toLowerCase();
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
 

  res.json({
    caixaAlta: upper,
    caixaBaixa: lower,
    primeiraMaiuscula: capitalized,
    

  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
