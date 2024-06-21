document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    const passwordField = form.querySelector('input[name="pswd"]');
    const confirmPasswordField = form.querySelector('input[name="Senha2"]');
    const clearButton = document.getElementById('clearField-button');

    form.addEventListener('submit', function (event) {
        // Verifica se as senhas são iguais
        if (passwordField.value !== confirmPasswordField.value) {
            alert('As senhas não coincidem.');
            event.preventDefault();
            return;
        }

        // Armazena os dados no Local Storage
        const formData = {
            name: form.querySelector('input[name="name"]').value,
            date: form.querySelector('input[name="date"]').value,
            email: form.querySelector('input[name="email"]').value,
            pswd: passwordField.value
        };

        localStorage.setItem('formData', JSON.stringify(formData));

        // Você pode redirecionar para a página inicial após o armazenamento, se desejar
        // window.location.href = 'Home.html';
        
        alert('Dados salvos com sucesso!');
        event.preventDefault(); // Remova essa linha se você deseja permitir o envio do formulário
    });

    clearButton.addEventListener('click', function () {
        form.reset();
    });
});
