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
const recCover = document.getElementById('recCover');
const listEl = document.getElementById('readingList');
const emptyEl = document.getElementById('emptyList');

const _svg = "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='220'><rect fill='%23e0f2fe' width='100%' height='100%' rx='16'/><text x='50%' y='55%' font-size='72' text-anchor='middle' dominant-baseline='middle'>📖</text></svg>";
const defaultCover = 'data:image/svg+xml;utf8,' + encodeURIComponent(_svg);

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
  recCover.src = currentBook.cover || defaultCover;
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


let isAnimating = false;

againBtn.addEventListener('click', () => {
  if (isAnimating) return;

  isAnimating = true;

  // Suggest a new book immediately
  suggestBook();

  // Restart animation reliably
  againBtn.classList.remove('spin');
  void againBtn.offsetHeight; // force reflow (more reliable than offsetWidth)
  againBtn.classList.add('spin');
});

// Remove spin class when animation completes (no timing guesswork)
againBtn.addEventListener('animationend', () => {
  againBtn.classList.remove('spin');
  isAnimating = false;
});


saveBtn.addEventListener('click', saveToList);

renderList();

//Important: load books BEFORE using suggestBook
loadBooks();