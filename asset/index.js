const myLibrary = [];

function Book(title, author, numOfPages) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, not read yet`;
  };
}
