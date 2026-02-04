// books.js
// Shared book data used by books.html and recommender.html

const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "fiction",
    length: "medium",
    pages: 304,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d467e?auto=format&fit=crop&w=400&q=80",
    synopsis: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right...",
    prequels: [],
    sequels: [],
    reviews: [
      { user: "Alex92", rating: 5, comment: "Life-changing. Made me think about all my choices." },
      { user: "reader_lena", rating: 4, comment: "Beautiful concept, a bit slow in the middle." }
    ]
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "sci-fi",
    length: "long",
    pages: 496,
    cover: "https://images.unsplash.com/photo-1589995632479-4c2421b47a5e?auto=format&fit=crop&w=400&q=80",
    synopsis: "Ryland Grace is the sole survivor on a desperate, last-chance mission...",
    prequels: [],
    sequels: [],
    reviews: [
      { user: "spacefan21", rating: 5, comment: "Best hard sci-fi in years." },
      { user: "sci-fi_nerd", rating: 5, comment: "Couldn't put it down." }
    ]
  },
  {
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    genre: "fantasy",
    length: "medium",
    pages: 394,
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    synopsis: "Linus Baker leads a quiet, solitary life...",
    prequels: [],
    sequels: [],
    reviews: [
      { user: "cozyreader", rating: 5, comment: "Warmest, kindest book I've read in forever." },
      { user: "fantasyheart", rating: 4, comment: "So wholesome it hurts (in a good way)." }
    ]
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "sci-fi",
    length: "long",
    pages: 896,
    cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
    synopsis: "A story of politics, religion, and ecology on a desert planet...",
    prequels: [],
    sequels: ["Dune Messiah"],
    reviews: [
      { user: "epicfan", rating: 5, comment: "Masterpiece of world-building." }
    ]
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "fantasy",
    length: "medium",
    pages: 310,
    cover: "https://images.unsplash.com/photo-1629992100518-0c3a5119a399?auto=format&fit=crop&w=400&q=80",
    synopsis: "A young hobbit embarks on an unexpected journey...",
    prequels: [],
    sequels: ["The Lord of the Rings"],
    reviews: [
      { user: "classiclover", rating: 5, comment: "Timeless adventure." }
    ]
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "fiction",
    length: "medium",
    pages: 328,
    cover: "https://images.unsplash.com/photo-1589829545856-d10d7d2e8f8f?auto=format&fit=crop&w=400&q=80",
    synopsis: "A dystopian novel about surveillance and totalitarianism...",
    prequels: [],
    sequels: [],
    reviews: [
      { user: "thoughtfulreader", rating: 5, comment: "Still relevant today." }
    ]
  },
  // You can (and should) add 5–15 more books here...
  // Make sure each has: title, author, genre, length, pages, cover, synopsis, prequels, sequels, reviews
];

const authorsOfTheDay = [
  { name: "Matt Haig", bio: "Known for emotional and philosophical fiction like The Midnight Library." },
  { name: "Andy Weir", bio: "Hard science fiction master — The Martian, Project Hail Mary." },
  { name: "TJ Klune", bio: "Heartwarming fantasy with deep emotional impact." },
  { name: "Frank Herbert", bio: "Creator of the epic Dune universe." },
  { name: "J.R.R. Tolkien", bio: "Father of modern fantasy literature." },
  // add more if you want
];