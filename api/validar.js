const indispensaveis = {
    "convidados": [
        { "31998042803": { "nome": "Indispensávél Grupo", "quantidade": 9999999 } },
        { "37999081594": { "nome": "Daniel", "quantidade": 5 } },
        { "37998620325": { "nome": "Mateus", "quantidade": 2 } },
        { "37998047765": { "nome": "Diêgo Diniz", "quantidade": 4 } },
        { "37999446750": { "nome": "Jonathan", "quantidade": 2 } },
        { "37999137368": { "nome": "Moizes Campos", "quantidade": 2 } },
        { "37999862429": { "nome": "Bruna", "quantidade": 2 } },
        { "37999232303": { "nome": "José Antônio", "quantidade": 6 } },
        { "31995926124": { "nome": "Felipe", "quantidade": 2 } },
        { "11953002322": { "nome": "Diêgo", "quantidade": 2 } },
        { "37991064645": { "nome": "Flávia", "quantidade": 6 } },
        { "37991304879": { "nome": "Eduardo", "quantidade": 4 } },
        { "37998123893": { "nome": "Fábio", "quantidade": 2 } },
        { "37998191067": { "nome": "Welder", "quantidade": 2 } },
        { "37999288633": { "nome": "Cleidimara", "quantidade": 2 } },
        { "19992694527": { "nome": "Mara", "quantidade": 2 } },
        { "37998399923": { "nome": "Pablo", "quantidade": 4 } },
        { "37999672878": { "nome": "TâniaMara", "quantidade": 2 } },
        { "37999362764": { "nome": "Jéssica", "quantidade": 2 } },
        { "37999990435": { "nome": "Joelma", "quantidade": 2 } },
        { "31997117601": { "nome": "Júlio Cesar", "quantidade": 2 } },
        { "37999187641": { "nome": "Aline Faria", "quantidade": 2 } },
        { "37999623881": { "nome": "Daniel Castro", "quantidade": 2 } },
        { "37998685041": { "nome": "Elen Nara", "quantidade": 3 } },
        { "37988048210": { "nome": "Fabiana", "quantidade": 2 } },
        { "3799845907": { "nome": "Jônatan Castro", "quantidade": 2 } },
        { "37988032788": { "nome": "Josiane Faria", "quantidade": 2 } },
        { "37999190371": { "nome": "Samuel Castro", "quantidade": 2 } },
        { "37999537498": { "nome": "Raíssa Castro", "quantidade": 2 } },
    ]
};

function isValidBrazilianPhone(phone) {
    return /^[1-9]{2}9[0-9]{8}$/.test(phone);
}

module.exports = async (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Método não permitido' });
        }

        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const rawBody = Buffer.concat(buffers).toString();

        if (!rawBody) {
            return res.status(400).json({ error: 'Body vazio' });
        }

        let telefone;
        try {
            const parsed = JSON.parse(rawBody);
            telefone = parsed.telefone;
        } catch (e) {
            return res.status(400).json({ error: 'JSON inválido' });
        }

        if (!telefone || !isValidBrazilianPhone(telefone)) {
            return res.status(400).json({ error: 'Telefone inválido. Use DDD + número (ex: 37998042803)' });
        }

        const encontrado = indispensaveis.convidados.find(item => { return Object.keys(item)[0] === telefone });

        if (encontrado) {
            const info = encontrado[telefone];
            return res.status(200).json({ nome: info.nome, quantidade: info.quantidade });
        } else {
            return res.status(404).json({ error: 'Telefone não encontrado.' });
        }

    } catch (err) {
        return res.status(500).json({ error: 'Erro interno', details: err.message });
    }
};
