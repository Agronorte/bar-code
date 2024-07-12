const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { order, barcode } = req.body;
    console.log(`Order: ${order}, Barcode: ${barcode}`);

    // Aqui você pode adicionar código para salvar os dados no banco de dados

    res.send('Dados recebidos com sucesso!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
