/**
 * CloudFix Trust Center — Main JS
 */

(function () {
  'use strict';

  // --- Mobile Sidebar Toggle ---
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', openSidebar);
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar on nav click (mobile)
  document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.parentElement;
      var body = item.querySelector('.accordion-body');
      var isOpen = item.classList.contains('open');

      // Close all siblings
      var parent = item.parentElement;
      parent.querySelectorAll('.accordion-item').forEach(function (sibling) {
        sibling.classList.remove('open');
        var sb = sibling.querySelector('.accordion-body');
        if (sb) sb.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // --- Modal ---
  var modalOverlay = document.getElementById('request-modal');
  var openBtns = document.querySelectorAll('[data-open-modal]');
  var closeBtn = document.getElementById('modal-close');

  function openModal(e) {
    if (e) e.preventDefault();
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // --- Form Handling ---
  var accessForm = document.getElementById('request-access-form');
  if (accessForm) {
    accessForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(accessForm);
      var data = {};
      formData.forEach(function (val, key) { data[key] = val; });

      // Placeholder: show success message
      var btn = accessForm.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = 'Request Sent ✓';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(function () {
        closeModal();
        btn.textContent = origText;
        btn.disabled = false;
        btn.style.opacity = '';
        accessForm.reset();
      }, 2500);

      // In production, replace with actual form endpoint:
      // fetch('https://formspree.io/f/XXXX', { method: 'POST', body: formData })
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(function () {
        btn.textContent = origText;
        btn.disabled = false;
        btn.style.opacity = '';
        contactForm.reset();
      }, 2500);
    });
  }

  // --- Last Updated Date ---
  var lastUpdatedEls = document.querySelectorAll('[data-last-updated]');
  if (lastUpdatedEls.length) {
    var dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    lastUpdatedEls.forEach(function (el) {
      el.textContent = 'Last updated: ' + dateStr;
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Active nav highlight ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
