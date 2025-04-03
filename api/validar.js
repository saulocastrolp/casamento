const fs = require('fs');
const path = require('path');

function isValidBrazilianPhone(phone) {
    return /^[1-9]{2}9[0-9]{8}$/.test(phone);
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { telefone } = req.body;

    if (!telefone || !isValidBrazilianPhone(telefone)) {
        return res.status(400).json({ error: 'Telefone inválido. Use DDD + número (ex: 37998042803)' });
    }

    const jsonPath = path.join(__dirname, 'telefones.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const convidados = data.convidados;

    const encontrado = convidados.find(item => Object.keys(item)[0] === telefone);

    if (encontrado) {
        const info = encontrado[telefone];
        return res.status(200).json({ nome: info.nome, quantidade: info.quantidade });
    } else {
        return res.status(404).json({ error: 'Telefone não encontrado.' });
    }
};