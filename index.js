

let quotes = [];
let authors = [];

async function loadHomeData() {
  const [qRes, aRes] = await Promise.all([
    fetch("quotes.json"),
    fetch("authors.json")
  ]);

  quotes = await qRes.json();
  authors = await aRes.json();

  startQuotes();
  showAuthorOfDay();
}

let currentQuote = 0;
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteBox = document.getElementById('quoteBox');

function startQuotes() {
  function showQuote() {
    quoteBox.classList.remove('visible');
    setTimeout(() => {
      quoteText.textContent = `"${quotes[currentQuote].text}"`;
      quoteAuthor.textContent = `— ${quotes[currentQuote].author}`;
      quoteBox.classList.add('visible');
      currentQuote = (currentQuote + 1) % quotes.length;
    }, 600);
  }

  showQuote();
  setInterval(showQuote, 6000);
}

function showAuthorOfDay() {
  const today = new Date().getDate();
  const authorOfDay = authors[today % authors.length];

  document.getElementById('authorName').textContent = authorOfDay.name;
  document.getElementById('authorBio').textContent = authorOfDay.bio;
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

var newsletterForm = document.getElementById('newsletterForm');

      newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var emailInput = document.getElementById('emailInput');
        var email = emailInput.value;
        alert('Thank you for subscribing with ' + email + '!');
        emailInput.value = '';
        localStorage.setItem('subscribedEmail', email);
      });
      
   // Register Service Worker (register on load with root scope)
    window.addEventListener('load', () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered successfully:', registration);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      }
    });
loadHomeData();