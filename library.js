class Book {
  constructor(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

class Display {
  static displayBooks() {
    const Data = StoreBooks.getBooks();

    Data.forEach((book) => Display.addBookToLibrary(book));
  }

  static addBookToLibrary(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
    `;
    list.appendChild(row);
  }

  static deleteDook(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }

  static alert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
  }
}

class StoreBooks {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books.JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book){
    const books = StoreBooks.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(storedBook){
    const books = StoreBooks.getBooks();
    books.forEach((book, index) => {
      if(book.storedBook === storedBook){
        books.splice(index, 1);
      }
    });
    localStorage.getItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Display.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;

  if(title === '' || author === '' || pages === ''){
    Display.alert('please fill in all fields', 'danger');
  }
  else{
    const book = new Book(title, author, pages);
    Display.addBookToLibrary(book);
    Display.clearFields();
    Display.deleteDook();
    StoreBooks.addBook();
  }
})

document.querySelector('#book-list').addEventListener('click', (e) => {
  Display.deleteDook(e.target)
});

