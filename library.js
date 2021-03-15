class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary(book) {
  const list = document.querySelector('#book-list');
  const row = document.createElement('tr');

  row.innerHTML = `

    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td><a href="#" class="btn btn-success">${book.status}</a></td>
    <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
  `;
  list.appendChild(row);
}

function Display() {
  const Data = [
    {
      title: 'The king',
      author: 'Big bob',
      pages: '400',
      status: 'read',
    },
    {
      title: 'The web',
      author: 'Untue',
      pages: '2000',
      status: 'not read',
    },
    {
      title: 'Captian in the ship',
      author: 'Elisha',
      pages: '1200',
      status: 'read',
    },
  ];

  Data.forEach((book) => addBookToLibrary(book));
}

function deleteBook(el) {
  if (el.classList.contains('delete')) {
    el.parentElement.parentElement.remove();
  }
}

function alert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function clearFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
}

document.addEventListener('DOMContentLoaded', Display.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const status = document.querySelector('#status').value;

  if (title === '' || author === '' || pages === '') {
    alert('please fill in all fields', 'danger');
  } else {
    const book = new Book(title, author, pages, status);
    addBookToLibrary(book);
    clearFields();
    deleteBook();
  }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  deleteBook(e.target);
});
