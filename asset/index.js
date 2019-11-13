const myLibrary = [];

function Book(title, author, numOfPages) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, not read yet`;
  };
}

newBook = new Book('Things fall apart', 'Chinua Achebe', 25);

function addBookToLibrary(obj) {
  myLibrary.push(obj);
  return myLibrary;
}
console.log(addBookToLibrary(newBook));
