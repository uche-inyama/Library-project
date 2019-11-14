const myLibrary = [];

function Book(title, author, numOfPages) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, not read yet`;
  };
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
  console.log(myLibrary);
  return myLibrary;
}

const template = () =>
  myLibrary
    .map(
      book =>
        `<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.numOfPages}</td>
  </tr>`
    )
    .join('');

const render = (temp, node) => {
  node.innerHTML = temp;
};

const form = document.querySelector('#myform');
const btn = form.querySelector('#submit');
const myFormBtn = document.querySelector('#myform');
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
