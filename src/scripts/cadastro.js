document.addEventListener('DOMContentLoaded', function() {
    const clearButton = document.getElementById('clearField-button');
    const formCadastro = document.getElementsByClassName('signup')[0];

    function limparCampos() {
        const inputs = formCadastro.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
        });
    }

    // Adiciona um ouvinte de evento para o botão "Limpar Lista"
    clearButton.addEventListener('click', function() {
        event.preventDefault();  // Evita que o checkbox seja marcado
        limparCampos();
    });
});
    