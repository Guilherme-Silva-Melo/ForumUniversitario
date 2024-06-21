document.addEventListener('DOMContentLoaded', function() {
  const userForm = document.getElementById('userForm');
  const message = document.getElementById('message');
  const userList = document.getElementById('userList');
  const clearListButton = document.getElementById('clearListButton');
  const searchField = document.getElementById('searchField');
  const searchQuery = document.getElementById('searchQuery');
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearField-button');
  const formCadastro = document.getElementsByClassName('signup')[0];

  function renderUserList(users = JSON.parse(localStorage.getItem('users')) ) {
    userList.innerHTML = '';
    users.forEach(user => {
      const li = document.createElement('li');
      li.classList.add('user-item');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        userList.removeChild(li);
        const updatedUsers = users.filter(u => u.id !== user.id);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        renderUserList(updatedUsers);
      });

      li.appendChild(deleteButton);
      li.appendChild(document.createTextNode(`ID: ${user.id}, Data: ${user.date}, Nome: ${user.username}, E-mail: ${user.email}`));
      userList.appendChild(li);
      
    });
  }

  function limparLista() {
    userList.innerHTML = ''; // Limpa todos os itens da lista no HTML
    localStorage.removeItem('users'); // Remove o item 'users' do local storage
    exibirModal('Lista de usuários foi limpa.', 'orange');
  }

  function searchUserList(field, query) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(user => {
      return user[field].includes(query);
    });
    renderUserList(filteredUsers);
  }

  function limparCampos() {
    const inputs = formCadastro.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
  }

  clearButton.addEventListener('click', function(event) {
    event.preventDefault();  // Evita que o checkbox seja marcado
    limparCampos();
  });

  clearListButton.addEventListener('click', function() {
    limparLista();
  });

  searchButton.addEventListener('click', function() {
    const field = searchField.value;
    const query = searchQuery.value.trim();
    searchUserList(field, query);
  });

  userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (id && username && email) {
      // Check for duplicate ID
      const duplicate = users.find(user => user.id === id);
      if (duplicate) {
        exibirModal('ID já existe. Por favor, escolha outro ID.', 'red');
        return;
      }

      const user = {
        id: id,
        username: username,
        email: email,
        date: new Date().toLocaleDateString()
      };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      renderUserList(users);
      exibirModal('Usuário cadastrado com sucesso!', 'green');
      userForm.reset();
    } else {
      exibirModal('Por favor, preencha todos os campos.', 'red');
    }
  });

  function exibirModal(mensagem, cor) {
    var modal = document.getElementById("modal");
    var modalMessage = document.getElementById("modal-message");
    var closeBtn = document.getElementsByClassName("close")[0];
    modalMessage.textContent = mensagem;
    modalMessage.style.color = cor;
    modal.style.display = "block";
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  renderUserList();
});
