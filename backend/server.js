const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const convidados = require('./telefones.json').convidados;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

function isValidBrazilianPhone(phone) {
    return /^[1-9]{2}9[0-9]{8}$/.test(phone);
}

app.post('/validar', (req, res) => {
    const telefone = req.body.telefone;

    if (!telefone || !isValidBrazilianPhone(telefone)) {
        return res.status(400).json({ error: 'Telefone inválido. Use DDD + número (ex: 37998042803)' });
    }

    const encontrado = convidados.find(item => {
        return Object.keys(item)[0] == telefone
    });
    if (encontrado) {
        const data = encontrado[telefone];
        return res.json({ nome: data.nome, quantidade: data.quantidade });
    } else {
        return res.status(404).json({ error: 'Telefone não encontrado.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});