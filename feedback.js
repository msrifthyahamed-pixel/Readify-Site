
    // ── Hamburger Menu ──
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

    // ── Feedback Form ──
    const form = document.getElementById('feedbackForm');
    const messageDiv = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if (name.length < 2) {
        showMessage('Please enter a valid name (at least 2 characters).', 'error');
        return;
      }
      if (!email.match(/^[\w\.-]+@[\w\.-]+\.\w{2,}$/)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }
      if (message.length < 10) {
        showMessage('Message should be at least 10 characters long.', 'error');
        return;
      }

      // Save to localStorage
      let feedbacks = JSON.parse(localStorage.getItem('readifyFeedback') || '[]');
      feedbacks.push({ name, email, message, date: new Date().toISOString() });
      localStorage.setItem('readifyFeedback', JSON.stringify(feedbacks));

      // Show success
      showMessage('Thank you! Your feedback has been received.', 'success');

      // Reset form
      form.reset();
    });

    function showMessage(text, type) {
      messageDiv.textContent = text;
      messageDiv.className = 'message ' + type;
      messageDiv.style.display = 'block';

      // Auto-hide after 6 seconds
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 6000);
    }

    // ── FAQ Accordion ──
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isActive = header.classList.contains('active');

        // Close others
        document.querySelectorAll('.accordion-header.active').forEach(h => {
          if (h !== header) {
            h.classList.remove('active');
            h.nextElementSibling.classList.remove('active');
            h.nextElementSibling.style.maxHeight = null;
          }
        });

        // Toggle current
        header.classList.toggle('active');
        content.classList.toggle('active');

        if (content.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  