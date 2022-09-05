(function () {
  const ul = document.querySelector('ul');
  let modalWindow = document.querySelector('.modal-window');
  let modalClose = document.querySelector('.modal-close');
  let openButton = document.querySelector('.btn');
  let booksul = document.querySelector('.book-list');
  let charactersul = document.querySelector('.characters');
  const booksUrl = `https://www.anapioficeandfire.com/api/books`;

  function handleSpinner(rootElm, status = false) {
    if (status) {
      rootElm.innerHTML = `<div class="spinner"><div class="donut"></div></div>`;
    }
  }

  function displayCharacters(characters) {
    handleSpinner(charactersul, true);
    Promise.all(
      characters.map((character) => fetch(character).then((res) => res.json()))
    ).then((charactersData) => {
      charactersul.innerHTML = '';
      charactersData.forEach((ch) => {
        let li = document.createElement('li');
        li.classList.add('charlist');
        li.innerText = `${ch.name} : (${ch.aliases.join(' ')})`;
        charactersul.append(li);
      });
    });
  }

  function displayBooks(data) {
    booksul.innerHTML = '';
    data.forEach((book) => {
      let li = document.createElement('li');
      let h3 = document.createElement('h3');
      h3.innerText = book.name;
      let p = document.createElement('p');
      p.innerText = book.authors.join('');
      let button = document.createElement('button');
      button.classList.add('btn');
      button.innerText = `Show Characters (${book.characters.length})`;

      button.addEventListener('click', () => {
        modalWindow.style.display = 'block';
        displayCharacters(book.characters);
        modalWindow
          .querySelector('.modal-close')
          .addEventListener('click', () => {
            modalWindow.style.display = 'none';
          });
      });

      li.append(h3, p, button);
      booksul.append(li);
    });
  }

  function fetchBooks() {
    handleSpinner(booksul, true);
    fetch(booksUrl)
      .then((res) => res.json())
      .then((booksData) => {
        displayBooks(booksData);
      })
      .finally(() => {
        handleSpinner(booksul);
      });
  }
  fetchBooks();
})();
