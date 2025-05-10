import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/livros', async (req: Request, res: Response) => {
  const { titulo, autor, ano, categoria } = req.body;

  try {
    const livro = await prisma.livro.create({
      data: { titulo, autor, ano, categoria },
    });
    res.status(201).json(livro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar livro' });
  }
});

app.get('/livros', async (req: Request, res: Response) => {
  try {
    const livros = await prisma.livro.findMany();
    res.json(livros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar livros' });
  }
});

app.get('/livros/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(id) },
    });

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json(livro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar livro' });
  }
});

app.put('/livros/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { titulo, autor, ano, categoria } = req.body;

  try {
    const livro = await prisma.livro.update({
      where: { id: parseInt(id) },
      data: { titulo, autor, ano, categoria },
    });

    res.json(livro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
});

app.delete('/livros/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const livro = await prisma.livro.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Livro excluído com sucesso', livro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir livro' });
  }
});

app.listen(port, () => {
  console.log(`Rodando ${port}`);
});
