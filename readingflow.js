

console.log('=== readingflow.js loaded ===');

    // ── Hamburger Menu ──
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

    // ── Ambient Sounds ──
    console.log('Setting up audio...');
    const soundButtons = document.querySelectorAll('.sound-btn');
    console.log('Found sound buttons:', soundButtons.length);
    
    const rainAudio = document.getElementById('rainAudio');
    const fireAudio = document.getElementById('fireAudio');
    const forestAudio = document.getElementById('forestAudio');
    
    console.log('Audio elements - rain:', !!rainAudio, 'fire:', !!fireAudio, 'forest:', !!forestAudio);

    let currentPlaying = null;

    soundButtons.forEach((btn, index) => {
      console.log('Setting up button', index, ':', btn.dataset.sound);
      
      btn.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('CLICKED:', this.dataset.sound);
        
        const soundType = this.dataset.sound;
        let audio = null;
        
        if (soundType === 'rain') audio = rainAudio;
        if (soundType === 'fire') audio = fireAudio;
        if (soundType === 'forest') audio = forestAudio;
        
        if (!audio) {
          console.error('Audio not found for:', soundType);
          return;
        }
        
        // Stop previous
        if (currentPlaying && currentPlaying !== audio) {
          currentPlaying.pause();
          currentPlaying.currentTime = 0;
          document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('active'));
        }
        
        // Play or pause
        if (audio.paused) {
          console.log('Playing:', soundType);
          audio.play().catch(err => {
            console.error('Play error:', err);
          });
          this.classList.add('active');
          currentPlaying = audio;
        } else {
          console.log('Pausing:', soundType);
          audio.pause();
          this.classList.remove('active');
          currentPlaying = null;
        }
      });
    });
    console.log('Audio setup complete');

// ── Completed Books ──
console.log('Setting up completed books...');
const completedForm = document.getElementById('completedForm');
const bookInput = document.getElementById('bookTitle');
const completedList = document.getElementById('completedList');
const emptyCompleted = document.getElementById('emptyCompleted');

console.log('Elements found - form:', !!completedForm, 'input:', !!bookInput, 'list:', !!completedList, 'empty:', !!emptyCompleted);

function renderCompletedBooks() {
  console.log('>>> Rendering completed books');
  if (!completedList || !emptyCompleted) {
    console.warn('Missing elements, cannot render');
    return;
  }
  
  const stored = localStorage.getItem('readifyCompletedBooks');
  const books = stored ? JSON.parse(stored) : [];
  console.log('Books from storage:', books);
  
  completedList.innerHTML = '';

  if (books.length === 0) {
    console.log('No books, showing empty state');
    emptyCompleted.style.display = 'block';
  } else {
    console.log('Rendering', books.length, 'books');
    emptyCompleted.style.display = 'none';
    books.forEach(title => {
      const li = document.createElement('li');
      li.className = 'completed-item';
      li.textContent = title;
      completedList.appendChild(li);
      console.log('Added book:', title);
    });
  }
}

if (completedForm) {
  console.log('Attaching form submit handler');
  completedForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('>>> FORM SUBMITTED');
    
    const title = bookInput.value.trim();
    console.log('Title entered:', title);
    
    if (!title) {
      alert('Please enter a book title.');
      return;
    }

    const stored = localStorage.getItem('readifyCompletedBooks');
    let books = stored ? JSON.parse(stored) : [];
    
    if (books.includes(title)) {
      alert('Already marked this book as completed.');
      return;
    }
    
    books.push(title);
    localStorage.setItem('readifyCompletedBooks', JSON.stringify(books));
    console.log('Saved book:', title);
    console.log('All books:', books);
    
    renderCompletedBooks();
    bookInput.value = '';
  });
} else {
  console.warn('Form not found!');
}

console.log('Initial render of completed books');
renderCompletedBooks();
console.log('=== readingflow.js initialization complete ===')
