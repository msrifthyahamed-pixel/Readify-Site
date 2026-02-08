    // ── Hamburger Menu ──
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

    // ── Ambient Sounds ──
    const soundButtons = document.querySelectorAll('.sound-btn');
    const audios = {
      rain: document.getElementById('rainAudio'),
      fire: document.getElementById('fireAudio'),
      forest: document.getElementById('forestAudio')
    };


let books = [];
let currentBook = null;

async function loadBooks() {
  const res = await fetch("booksdata.json");
  books = await res.json();
}

const genreSelect = document.getElementById('genreSelect');
const lengthSelect = document.getElementById('lengthSelect');
const suggestBtn = document.getElementById('suggestBtn');
const againBtn = document.getElementById('againBtn');
const saveBtn = document.getElementById('saveBtn');
const card = document.getElementById('recommendationCard');
const titleEl = document.getElementById('recTitle');
const authorEl = document.getElementById('recAuthor');
const listEl = document.getElementById('readingList');
const emptyEl = document.getElementById('emptyList');

function suggestBook() {
  const genre = genreSelect.value;
  const length = lengthSelect.value;

  const filtered = books.filter(b => {
    const matchGenre = !genre || b.genre === genre;
    const matchLength = !length || b.length === length;
    return matchGenre && matchLength;
  });

  if (filtered.length === 0) {
    alert("No books match your current filters. Try different options!");
    return;
  }

  currentBook = filtered[Math.floor(Math.random() * filtered.length)];

  titleEl.textContent = currentBook.title;
  authorEl.textContent = currentBook.author;
  card.style.display = 'block';
}

function saveToList() {
  if (!currentBook) return;

  let list = JSON.parse(localStorage.getItem('readifyReadingList') || '[]');

  if (!list.some(b => b.title === currentBook.title)) {
    list.push(currentBook);
    localStorage.setItem('readifyReadingList', JSON.stringify(list));
    renderList();
    alert(`"${currentBook.title}" added to your reading list!`);
  } else {
    alert(`"${currentBook.title}" is already in your list.`);
  }
}

function renderList() {
  const list = JSON.parse(localStorage.getItem('readifyReadingList') || '[]');
  listEl.innerHTML = '';

  if (list.length === 0) {
    emptyEl.style.display = 'block';
    return;
  }

  emptyEl.style.display = 'none';

  list.forEach(book => {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = `${book.title} — ${book.author}`;
    listEl.appendChild(li);
  });
}

suggestBtn.addEventListener('click', suggestBook);
againBtn.addEventListener('click', suggestBook);
saveBtn.addEventListener('click', saveToList);

renderList();

//Important: load books BEFORE using suggestBook
loadBooks();