// Main JavaScript for Insight Magazine

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('header nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

// Modal Functionality
function initModals() {
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Cookie Banner
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.cookie-accept');
  const declineBtn = document.querySelector('.cookie-decline');
  
  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieConsent');
  
  if (!cookieChoice && banner) {
    banner.classList.add('active');
  }
  
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.classList.remove('active');
    });
  }
  
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      banner.classList.remove('active');
    });
  }
}

// Form Handling - Newsletter
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = form.querySelector('input[name="email"]').value;
      const consent = form.querySelector('input[name="consent"]')?.checked;
      
      if (!email) {
        alert('Please enter your email address.');
        return;
      }
      
      if (consent === false) {
        alert('Please accept our Privacy Policy to subscribe.');
        return;
      }
      
      // Simulate form submission
      console.log('Newsletter subscription:', { email, consent });
      alert('Thank you for subscribing! Please check your email to confirm.');
      
      form.reset();
      
      // Close modal if form is in one
      const modal = form.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });
}

// Form Handling - Contact
function initContactForm() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const message = form.querySelector('textarea[name="message"]').value;
      const consent = form.querySelector('input[name="consent"]').checked;
      
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }
      
      if (!consent) {
        alert('Please accept our Privacy Policy to send your message.');
        return;
      }
      
      // Simulate form submission
      console.log('Contact form submission:', { name, email, message, consent });
      alert('Thank you for your message! We will get back to you soon.');
      
      form.reset();
    });
  }
}

// Lead Capture Form for Gated Content
function initLeadCaptureForm() {
  const form = document.querySelector('.lead-capture-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = form.querySelector('input[name="email"]').value;
      const consent = form.querySelector('input[name="consent"]').checked;
      
      if (!email) {
        alert('Please enter your email address.');
        return;
      }
      
      if (!consent) {
        alert('Please accept our Privacy Policy to continue reading.');
        return;
      }
      
      // Simulate form submission
      console.log('Lead capture:', { email, consent });
      
      // Hide preview and gate
      const preview = document.querySelector('.content-preview');
      const gate = document.querySelector('.content-gate');
      const fullContent = document.querySelector('.content-full');
      
      if (preview) preview.style.display = 'none';
      if (gate) gate.style.display = 'none';
      if (fullContent) fullContent.style.display = 'block';
      
      // Scroll to content
      if (fullContent) {
        fullContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Set Active Navigation Link
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Subscription Form Handler
function handleSubscription(e) {
  e.preventDefault();
  
  const form = e.target;
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const plan = form.querySelector('select[name="plan"]').value;
  const consent = form.querySelector('input[name="consent"]').checked;
  
  if (!name || !email || !plan) {
    alert('Please fill out all required fields.');
    return;
  }
  
  if (!consent) {
    alert('Please accept our Privacy Policy and Terms of Service to continue.');
    return;
  }
  
  // Simulate successful subscription
  console.log('Subscription:', { name, email, plan, consent });
  alert('Thank you! Your subscription has been processed. Check your email for confirmation.');
  
  form.reset();
  closeModal('subscription-modal');
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initModals();
  initCookieBanner();
  initNewsletterForm();
  initContactForm();
  initLeadCaptureForm();
  setActiveNav();
});

// Export functions for use in inline scripts
window.openModal = openModal;
window.closeModal = closeModal;
window.handleSubscription = handleSubscription;