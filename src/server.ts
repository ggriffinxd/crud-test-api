import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API da Biblioteca funcionando!" });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
