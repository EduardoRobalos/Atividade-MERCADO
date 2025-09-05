const path = require('path');
const express = require('express');
const app = express();

// Middleware para JSON
app.use(express.json());

// Dados simulados em memória
let avaliacoes = [
    { id: 1, desc: "Bom produto" },
    { id: 2, desc: "Entrega rápida" }
];

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

// Rotas
app.get('/avaliacao', (req, res) => {
    res.json(avaliacoes);
});

app.post('/avaliacao', (req, res) => {
    const { av } = req.body;
    if (!av) return res.status(400).json({ erro: "Descrição obrigatória" });
    const novo = { id: avaliacoes.length + 1, desc: av };
    avaliacoes.push(novo);
    res.status(201).json(novo);
});

app.put('/avaliacao/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { desc } = req.body;
    const avaliacao = avaliacoes.find(av => av.id === id);
    if (!avaliacao) return res.status(404).json({ erro: "Não encontrado" });
    avaliacao.desc = desc || avaliacao.desc;
    res.json(avaliacao);
});

app.delete('/avaliacao/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const antes = avaliacoes.length;
    avaliacoes = avaliacoes.filter(av => av.id !== id);
    if (avaliacoes.length === antes) return res.status(404).json({ erro: "Não encontrado" });
    res.json({ mensagem: `Avaliação ${id} removida` });
});

// Start
app.listen(8080, () => {
    console.log("Servidor rodando em http://localhost:8080");
});
