
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

    let currentPlaying = null;

    soundButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const sound = btn.dataset.sound;
        const audio = audios[sound];

        // Pause others
        if (currentPlaying && currentPlaying !== audio) {
          currentPlaying.pause();
          currentPlaying.currentTime = 0;
          document.querySelector(`[data-sound="${currentPlaying.id.replace('Audio','')}"]`)
            .classList.remove('active');
        }

        if (audio.paused) {
          audio.play().catch(e => console.log("Audio play failed:", e));
          btn.classList.add('active');
          currentPlaying = audio;
        } else {
          audio.pause();
          btn.classList.remove('active');
          currentPlaying = null;
        }
      });
    });

    // ── Completed Books ──
    const completedForm = document.getElementById('completedForm');
    const bookInput = document.getElementById('bookTitle');
    const completedList = document.getElementById('completedList');
    const emptyCompleted = document.getElementById('emptyCompleted');

    function renderCompletedBooks() {
      const books = JSON.parse(localStorage.getItem('readifyCompletedBooks') || '[]');
      completedList.innerHTML = '';

      if (books.length === 0) {
        emptyCompleted.style.display = 'block';
        return;
      }

      emptyCompleted.style.display = 'none';

      books.forEach(title => {
        const li = document.createElement('li');
        li.className = 'completed-item';
        li.textContent = title;
        completedList.appendChild(li);
      });
    }

    completedForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = bookInput.value.trim();
      if (!title) return;

      let books = JSON.parse(localStorage.getItem('readifyCompletedBooks') || '[]');
      if (!books.includes(title)) {
        books.push(title);
        localStorage.setItem('readifyCompletedBooks', JSON.stringify(books));
        renderCompletedBooks();
        bookInput.value = '';
      } else {
        alert('You already marked this book as completed.');
      }
    });

    // Load on page open
    renderCompletedBooks();
