document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const message = document.getElementById('message');
  
    userForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
  
      if (username && email) {
        // Retrieve existing users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
  
        // Add new user to the array
        users.push({ username: username, email: email });
  
        // Save updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));
  
        // Display success message
        message.textContent = 'Usuário cadastrado com sucesso!';
        message.style.color = 'green';
  
        // Clear the form
        userForm.reset();
      } else {
        // Display error message
        message.textContent = 'Por favor, preencha todos os campos.';
        message.style.color = 'red';
      }
    });
  });
  