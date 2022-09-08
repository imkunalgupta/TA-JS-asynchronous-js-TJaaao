let todoInput = document.querySelector('#text');
let root = document.querySelector('ul');
const baseUrl = `https://basic-todo-api.vercel.app/api/`;

function handleDelete(id) {
  fetch(baseUrl + `todo/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    displaayTodos();
  });
}

function handleToggle(id, status) {
  let data = {
    todo: {
      isCompleted: !status,
    },
  };
  fetch(baseUrl + `todo/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(() => {
    displaayTodos();
  });
}

function handleEdit(event, id, title) {
  let input = document.createElement('input');
  input.value = title;
  let p = event.target;
  let parent = event.target.parentElement;
  parent.replaceChild(input, p);
  console.log(input, p, parent);
  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value) {
      let data = {
        todo: {
          title: event.target.value,
        },
      };
      fetch(baseUrl + `todo/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(() => {
        displaayTodos();
      });
    }
  });
}

function createUI(data) {
  root.innerHTML = '';
  data.forEach((todo, i) => {
    let li = document.createElement('li');
    li.classList.add('flex');
    let div = document.createElement('div');
    div.classList.add('flex');
    div.classList.add('justify');
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('data-id', todo._id);
    input.checked = todo.isCompleted;
    input.addEventListener('click', () =>
      handleToggle(todo._id, todo.isCompleted)
    );
    let p = document.createElement('p');
    p.innerText = todo.title;
    p.addEventListener('dblclick', (event) =>
      handleEdit(event, todo._id, todo.title)
    );
    let span = document.createElement('span');
    span.innerText = '⚔️';
    span.setAttribute('data-id', todo._id);
    span.addEventListener('click', () => handleDelete(todo._id));
    div.append(input, p);
    li.append(div, span);
    root.append(li);
  });
}

function displaayTodos() {
  fetch(baseUrl + 'todo')
    .then((res) => res.json())
    .then((allTodos) => {
      createUI(allTodos.todos);
    });
}

function addTodo(event) {
  if (event.keyCode === 13 && event.target.value.trim()) {
    let data = {
      todo: {
        title: event.target.value,
        isCompleted: false,
      },
    };
    fetch(baseUrl + 'todo', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(() => {
      event.target.value = '';
      displaayTodos();
    });
  }
}

todoInput.addEventListener('keyup', addTodo);
displaayTodos();
