const myLibrary = [];

function Book(title, author, numOfPages) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, not read yet`;
  };
}

newBook = new Book('Things fall apart', 'Chinua Achebe', 25);

function addBookToLibrary(obj) {
  myLibrary.push(obj);
  return myLibrary;
}
console.log(addBookToLibrary(newBook));

function templates{
  myLibrary.map(book =>
    `<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.numOfPages}</td>
  </tr>`
  ).join('');
}

const render = (temp, node) => {
  node.innerHTML = temp;
};

