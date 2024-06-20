document.addEventListener('DOMContentLoaded', function() {
  const userForm = document.getElementById('userForm');
  const message = document.getElementById('message');
  const userList = document.getElementById('userList');
  const clearListButton = document.getElementById('clearListButton');

  
  function renderUserList() {
    
    userList.innerHTML = '';

    
    const users = JSON.parse(localStorage.getItem('users')) || [];

  
    users.forEach(user => {
      const li = document.createElement('li');
      li.classList.add('user-item'); // Adiciona a classe para centralizar o conteúdo
      
      // Criar botão de excluir
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.classList.add('delete-button');

      // Adicionar evento de clique para excluir o item
      deleteButton.addEventListener('click', () => {

        userList.removeChild(li);
        
        const updatedUsers = users.filter(u => u.email !== user.email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      });

      li.appendChild(deleteButton);
      li.appendChild(document.createTextNode(` Data: ${user.date}, Nome: ${user.username}, E-mail: ${user.email}`));
      userList.appendChild(li);
    });
  }

  function limparLista() {
    userList.innerHTML = ''; // Limpa todos os itens da lista no HTML
    localStorage.removeItem('users'); // Remove o item 'users' do local storage
    message.textContent = 'Lista de usuários foi limpa.';
    message.style.color = 'orange';
}

// Adiciona um ouvinte de evento para o botão "Limpar Lista"
clearListButton.addEventListener('click', function() {
    limparLista();
});


  // Adiciona um ouvinte de evento para o formulário de usuário
  userForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    if (username && email) {
      // Cria um objeto de usuário com nome, email e data atual
      const user = {
        username: username,
        email: email,
        date: new Date().toLocaleDateString() // Adiciona a data de envio
      };

      // Recupera usuários existentes do localStorage ou cria um novo array vazio
      let users = JSON.parse(localStorage.getItem('users')) || [];

      // Adiciona o novo usuário ao array
      users.push(user);

      // Salva o array atualizado de usuários no localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Renderiza a lista atualizada de usuários
      renderUserList();

      // Exibe mensagem de sucesso
      message.textContent = 'Usuário cadastrado com sucesso!';
      message.style.color = 'green';

      
      userForm.reset();
    } else {
      
      message.textContent = 'Por favor, preencha todos os campos.';
      message.style.color = 'red';
    }
  });

  
  renderUserList();
});
  