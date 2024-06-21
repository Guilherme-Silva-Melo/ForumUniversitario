document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = loginForm.querySelector('input[name="email"]').value;
        const password = loginForm.querySelector('input[name="pswd"]').value;

        // Recupera os dados do Local Storage
        const storedData = localStorage.getItem('formData');
        if (!storedData) {
            alert('Nenhum usuário cadastrado.');
            return;
        }

        const formData = JSON.parse(storedData);

        // Verifica se o email e a senha correspondem aos dados armazenados
        if (email === formData.email && password === formData.pswd) {
            alert('Login bem-sucedido!');
            window.location.href = 'Home.html';
        } else {
            alert('Email ou senha incorretos.');
        }
    });
});