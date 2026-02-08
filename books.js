
let books = []; // will be loaded from JSON

async function loadBooks() {
  try {
    const res = await fetch("booksdata.json");
    books = await res.json();
    renderBooks(books); // initial render
  } catch (err) {
    console.error("Failed to load books.json", err);
  }
}


    // ── DOM Elements ──
    const bookGrid = document.getElementById("bookGrid");
    const searchInput = document.getElementById("searchInput");
    const genreFilter = document.getElementById("genreFilter");
    const modal = document.getElementById("bookModal");
    const closeModal = document.getElementById("closeModal");

    // ── Render Cards ──
    function renderBooks(filteredBooks) {
      bookGrid.innerHTML = "";
      filteredBooks.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
          <img src="${book.cover}" alt="${book.title}" class="book-cover">
          <div class="book-info">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
          </div>
        `;
        card.addEventListener("click", () => showModal(book));
        bookGrid.appendChild(card);
      });
    }

    // ── Show Modal ──
    function showModal(book) {
      document.getElementById("modalTitle").textContent = book.title;
      document.getElementById("modalSynopsis").textContent = book.synopsis;

      const relatedList = document.getElementById("relatedList");
      relatedList.innerHTML = "";

      if (book.prequels.length === 0 && book.sequels.length === 0) {
        document.getElementById("relatedSection").style.display = "none";
      } else {
        document.getElementById("relatedSection").style.display = "block";
        [...book.prequels, ...book.sequels].forEach(title => {
          const li = document.createElement("li");
          li.textContent = title;
          relatedList.appendChild(li);
        });
      }

      const tbody = document.getElementById("reviewsBody");
      tbody.innerHTML = "";
      book.reviews.forEach(review => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${review.user}</td>
          <td>${review.rating} / 5</td>
          <td>${review.comment}</td>
        `;
        tbody.appendChild(row);
      });

      modal.style.display = "flex";
    }

    // ── Close Modal ──
    closeModal.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });

    // ── Filter Logic ──
    function filterBooks() {
      const query = searchInput.value.toLowerCase().trim();
      const genre = genreFilter.value;

      const filtered = books.filter(book => {
        const matchSearch = 
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query);
        const matchGenre = !genre || book.genre === genre;
        return matchSearch && matchGenre;
      });

      renderBooks(filtered);
    }

    // ── Event Listeners ──
    searchInput.addEventListener("input", filterBooks);
    genreFilter.addEventListener("change", filterBooks);

    
//load JSON on page start
loadBooks();
