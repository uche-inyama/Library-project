/* eslint-env browser */

const myLibrary = [];

function Book(title, author, numOfPages) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;

  this.info = function info() {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, not read yet`;
  };
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
  return myLibrary;
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  return myLibrary;
}

const template = () =>
  myLibrary
    .map(
      (book, index) =>
        `<tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.numOfPages}</td>
      <td><button class ="deletebtn" data-id = ${index}>Delete</button></td>
  </tr>`
    )
    .join('');

const render = (temp, node) => {
  node.innerHTML = temp;
};

const form = document.querySelector('#myform');
const btn = form.querySelector('#submit');
const table = document.querySelector('#myTable');
const myformBtn = document.querySelector('#myFormButton');
const newBookBtn = myformBtn.querySelector('#newBookBtn');
form.hidden = true;

btn.addEventListener('click', function(e) {
  e.preventDefault();
  const title = form.querySelector('[name="title"]').value;
  const author = form.querySelector('[name="author"]').value;
  const numOfPages = form.querySelector('[name="pages"]').value;

  newBook = new Book(title, author, numOfPages);
  addBookToLibrary(newBook);
  render(template(), document.querySelector('#myTable'));
});

newBookBtn.addEventListener('click', function(e) {
  e.preventDefault();
  form.hidden = false;
  newBookBtn.hidden = true;
});

table.addEventListener('click', function(e) {
  const id = parseInt(e.target.dataset.id);
  if (e.target.matches('.deletebtn')) {
    removeBookFromLibrary(id, 1);
    render(template(), document.querySelector('#myTable'));
  }
  console.log(e.target);
});
