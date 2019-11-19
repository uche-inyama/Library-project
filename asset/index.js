/* global document */
/* global window */

const unread = 'Unread';
const read = 'Read';
const libraryKey = 'books';
const form = document.querySelector('#myForm');
const btn = form.querySelector('.btn');
const myFormBtn = document.querySelector('#mybutton');
const tbody = document.querySelector('#tbody');

function Book(title, author, numOfPages, status = unread, id = null) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.status = status;
  this.id = id || uuidv4();

  this.info = function info() {
    return `${this.title} by ${this.author}, ${numOfPages} pages, not read yet`;
  };

  this.changeStatus = function changeStatus() {
    this.status = this.status === read ? unread : read;
  };
}

Book.prototype.parseJson = function(obj) {
  const book = new Book(
    obj.title,
    obj.author,
    obj.numOfPages,
    obj.status,
    obj.id
  );
  return book;
};

const getLibrary = () => {
  let library = window.localStorage.getItem(libraryKey);
  if (!library) {
    library = [];
    window.localStorage.setItem(libraryKey, JSON.stringify(library));
  }
  library = JSON.parse(window.localStorage.getItem(libraryKey));
  return library;
};

function addBookToLibrary(book) {
  const library = getLibrary();
  library.push(book);
  window.localStorage.setItem(libraryKey, JSON.stringify(library));
}

function removeBookFromLibrary(id) {
  const library = getLibrary().filter(book => book.id !== id);
  window.localStorage.setItem(libraryKey, JSON.stringify(library));
}

const template = () =>
  getLibrary()
    .map(
      book =>
        `<tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.numOfPages}</td>
      <td><input class = "statusBtn" data-id="${book.id}" type="button" value="${book.status}" /></td>
      <td><input class="deleteBtn" data-id="${book.id}" type="button" value="Delete" /></td>
    </tr>
  `
    )
    .join('');

const render = (tpl, node) => {
  node.innerHTML = tpl;
};

form.hidden = true;

myFormBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  form.hidden = false;
  myFormBtn.hidden = true;
});

btn.addEventListener('click', function(evt) {
  evt.preventDefault();
  const title = form.querySelector('[name="title"]').value;
  const author = form.querySelector('[name="author"]').value;
  const pages = form.querySelector('[name="pages"]').value;
  const book = new Book(title, author, pages);

  if (title || author || pages === '') {
    alert('Please check, a required field(s) are empty');
  } else {
    addBookToLibrary(book);
  }

  form.querySelector('[name="title"]').value = '';
  form.querySelector('[name="author"]').value = '';
  form.querySelector('[name="pages"]').value = '';
  render(template(), tbody);
});

tbody.addEventListener('click', function(e) {
  const id = e.target.dataset.id;
  if (e.target.matches('.deleteBtn')) {
    removeBookFromLibrary(id);
    render(template(), tbody);
  } else if (e.target.matches('.statusBtn')) {
    const library = getLibrary();
    for (let i = library.length - 1; i > -1; i -= 1) {
      if (library[i].id !== id) continue;
      const book = Object.assign(new Book(), library[i]);
      book.changeStatus();
      library[i] = book;
      window.localStorage.setItem(libraryKey, JSON.stringify(library));
      render(template(), tbody);
      break;
    }
  }
});

render(template(), tbody);
