$('#telefone').mask('(00) 00000-0000');

function limparTelefone(valor) {
    return valor.replace(/\D/g, '');
}

function validarFormato(telefone) {
    return /^[1-9]{2}9[0-9]{8}$/.test(telefone);
}

document.addEventListener("DOMContentLoaded", function() {

    $('#telefoneForm').on('submit', function (e) {
        e.preventDefault();
        const input = $('#telefone').val();
        const telefone = limparTelefone(input);

        if (!validarFormato(telefone)) {
            swal('Erro', 'Telefone inválido. Use DDD + número (ex: 37998042803)', 'error');
            return;
        }

        fetch('/validar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({telefone})
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    swal('Erro', data.error, 'error');
                } else {
                    swal('Bem vindo!', `Nome: ${data.nome}\nQuantidade de pessoas adultas: ${data.quantidade}`, 'success');
                }
            })
            .catch(() => {
                swal('Erro', 'Erro ao conectar com o servidor.', 'error');
            });
    });

});