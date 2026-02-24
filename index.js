const express = require('express');
const app = express();
app.use(express.json());

let produtos = [
    {id: 1, nome: "Temaki Completo", preco: 35.50, categoria: "temakis"},
    {id: 2, nome: "Combinado 20 Peças", preco: 85.00, categoria: "sushi"},
];
//listar produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

//adicionar produtos
app.post('/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body;
    const novoProduto = {id: produtos.length + 1, nome, preco, categoria};
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

//atualizar produtos
app.put("/produtos/:id", (req, res) => {
    const {id} = req.params;
    const {nome, preco} = req.body;
    const produtoIndex = produtos.findIndex(p => p.id === parseInt(id));
    if (produtoIndex !== -1) {
        produtos[produtoIndex] = {id: parseInt(id), nome, preco};
        res.json(produtos[produtoIndex]);
    } else {
        res.status(404).json({message: "Produto não encontrado"});
    }
});
//deletar produtos
app.delete("/produtos/:id", (req, res) => {
    const {id} = req.params;
    const produtoIndex = produtos.findIndex(p => p.id === parseInt(id));
    if (produtoIndex !== -1) {
        produtos.splice(produtoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({message: "Produto não encontrado"});
    }
});
app.listen(3000, () => console.log("http://localhost:3000"));

//ARRAY
let sobremesa = ["Mochi de Morango", "Mochi de Matchá", "Dorayaki"];
let bebidas = ["Água Mineral", "Refrigerante", "Chá verde"];
let sushi = ["Combinado Sushi", "Sushi Hot", "Niguiri Variado (10 un)"];
let temakis = ["Temaki Salmão", "Temaki Filadélfia", "Temaki Camarão"];

//GET Categorias
let categorias = ["sobremesa", "bebidas", "sushi", "temakis"];

app.get('/categorias', (req, res) => {
    res.json(categorias);
});

//POST Categorias
app.post('/categorias', (req, res) => {
    const { nome } = req.body;
    categorias.push(nome);
    res.status(201).json({ nome });
});

// Rota para filtrar produtos por categoria
app.get('/produtos/categoria/:nome', (req, res) => {
    const { nome } = req.params;
    const filtrados = produtos.filter(p => p.categoria === nome);
    res.json(filtrados);
});