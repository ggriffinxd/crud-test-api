"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.post("/livros", async (req, res) => {
    const { titulo, autor, ano, categoria } = req.body;
    try {
        const livro = await prisma.livro.create({
            data: { titulo, autor, ano, categoria },
        });
        res.status(201).json(livro);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao adicionar livro" });
    }
});
app.get("/livros", async (req, res) => {
    try {
        const livros = await prisma.livro.findMany();
        res.json(livros);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar livros" });
    }
});
app.get("/livros/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const livro = await prisma.livro.findUnique({
            where: { id: Number.parseInt(id, 10) },
        });
        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }
        res.json(livro);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar livro" });
    }
});
app.put("/livros/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, ano, categoria } = req.body;
    try {
        const livro = await prisma.livro.update({
            where: { id: Number.parseInt(id, 10) },
            data: { titulo, autor, ano, categoria },
        });
        res.json(livro);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar livro" });
    }
});
app.delete("/livros/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const livro = await prisma.livro.delete({
            where: { id: Number.parseInt(id, 10) },
        });
        res.json({ message: "Livro excluído com sucesso", livro });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao excluir livro" });
    }
});
app.listen(port, () => {
    console.log(`Rodando ${port}`);
});
