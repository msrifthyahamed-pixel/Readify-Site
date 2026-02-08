
    // ── Hamburger Menu ── (same as other pages)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // ── Elements ──
    const form = document.getElementById('progressForm');
    const totalInput = document.getElementById('totalPages');
    const readInput = document.getElementById('pagesRead');
    const speedInput = document.getElementById('dailySpeed');
    const resultsDiv = document.getElementById('results');
    const noDataDiv = document.getElementById('noData');
    const percentText = document.getElementById('percentText');
    const progressBar = document.getElementById('progressBar');
    const estimateText = document.getElementById('estimateText');
    const saveBtn = document.getElementById('saveBtn');

    // ── Load saved data from localStorage ──
    function loadSavedProgress() {
      const saved = localStorage.getItem('readifyProgress');
      if (saved) {
        const data = JSON.parse(saved);
        totalInput.value = data.total || '';
        readInput.value = data.read || '';
        speedInput.value = data.speed || '';
        calculateProgress(); // show immediately
      }
    }

    // ── Calculate & Animate ──
    function calculateProgress() {
      const total = parseInt(totalInput.value) || 0;
      const read = parseInt(readInput.value) || 0;
      const speed = parseInt(speedInput.value) || 1;

      if (total <= 0 || read < 0 || speed <= 0) {
        resultsDiv.style.display = 'none';
        noDataDiv.style.display = 'block';
        return;
      }

      const percent = Math.min(Math.max((read / total) * 100, 0), 100);
      const remainingPages = total - read;
      const daysLeft = Math.ceil(remainingPages / speed);

      // Show results
      resultsDiv.style.display = 'block';
      noDataDiv.style.display = 'none';

      // Animate percentage & bar
      let current = 0;
      const step = percent > 50 ? 2 : 1; // faster for higher values
      const interval = setInterval(() => {
        if (current >= percent) {
          current = percent;
          clearInterval(interval);
        } else {
          current += step;
          if (current > percent) current = percent;
        }

        percentText.textContent = `${Math.round(current)}%`;
        progressBar.style.width = `${current}%`;
      }, 20);

      // Estimate text
      estimateText.textContent = `Estimated time to finish: ${daysLeft} day${daysLeft === 1 ? '' : 's'}`;
    }

    // ── Form submit (calculate) ──
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      calculateProgress();
    });

    // ── Save to localStorage ──
    saveBtn.addEventListener('click', () => {
      const data = {
        total: totalInput.value,
        read: readInput.value,
        speed: speedInput.value
      };
      localStorage.setItem('readifyProgress', JSON.stringify(data));
      alert('Progress saved! It will load automatically next time.');
    });

    // ── Live update while typing (optional nice-to-have) ──
    [totalInput, readInput, speedInput].forEach(input => {
      input.addEventListener('input', () => {
        if (totalInput.value && readInput.value && speedInput.value) {
          calculateProgress();
        }
      });
    });

    // Load on page open
    loadSavedProgress();
