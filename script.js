console.log('🚀 Loading Fixed Portfolio Script...');
const mainObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
      const delay = entry.target.dataset.stagger ? parseInt(entry.target.dataset.stagger) : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      mainObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

// Target ALL potentially blank sections explicitly
const targetSelectors = [
  '.glass-card', '.skills-category-section', '.skill-category', '.cert-card', '.timeline-item',
  '#coding .profile-card', '#highlights .highlight-card', '#extracurricular',
  '.education-item', '.skill-card', '.tool-card', '.activity-card', '.experience-card',
  '.highlight-card', '.project-card', '.achievement-card'
].join(', ');
const els = document.querySelectorAll(targetSelectors);
console.log('🎯 Observed', els.length, 'elements with selectors:', targetSelectors);
els.forEach(el => {
  el.classList.add('fade-in');
  mainObserver.observe(el);
});

// ========================================
// Typing Animation (Safe)
let typingAnimationStarted = false;
function startTypingAnimation() {
  if (typingAnimationStarted) return;
  typingAnimationStarted = true;
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  const texts = ['Problem Solver', 'Data Analyst', 'Web Developer', 'Tech Explorer'];
  let textIndex = 0, charIndex = 0, isDeleting = false;
  const typingSpeed = 100, deletingSpeed = 50, pauseBetweenTexts = 1500;
  function typeText() {
    const currentText = texts[textIndex];
    if (isDeleting) charIndex--; else charIndex++;
    typingElement.textContent = currentText.substring(0, charIndex);
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true; setTimeout(typeText, pauseBetweenTexts); return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false; textIndex = (textIndex + 1) % texts.length; setTimeout(typeText, 500); return;
    }
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
  }
  typeText();
}

// ========================================
// SINGLE MASTER DOMContentLoaded - ALL FEATURES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  try {
    console.log('✅ Fixed Portfolio - Single DOMContentLoaded');
  
  // Navigation (Safe)
  try {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
      });
    });
    
    // Scroll progress
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
      });
    }
  } catch(e) { console.warn('Nav init failed:', e); }
  
  // CERTIFICATIONS PANEL (Safe with try-catch)
  try {
    const certCards = document.querySelectorAll('.cert-card');
    const detailPanel = document.getElementById('cert-detail-panel');
    if (certCards.length && detailPanel) {
const certData = {
        nptel: {title: 'Programming in Java', org: 'NPTEL', skills: ['Java','OOP','Data Structures'], date: '2024', desc: 'Comprehensive Java fundamentals, OOP concepts, data structures implementation.', image: 'nptel java.jpg'},
        dbms: {title: 'Database Management Systems', org: 'NPTEL', skills: ['SQL','ER Diagrams','Normalization'], date: '2024', desc: 'Database design, SQL queries, normalization techniques, transaction management.', image: 'dbms nptel.jpg'},
        python: {title: 'Python Essentials 1', org: 'HackerRank', skills: ['Python Basics','Lists','Functions'], date: '2024', desc: 'Core Python programming, data structures, functions, file handling.', image: 'python essentials 1.png'},
        python2: {title: 'Python Essentials 2', org: 'HackerRank', skills: ['OOP','Modules','Error Handling'], date: '2024', desc: 'Advanced Python: OOP, modules, exception handling, advanced data structures.', image: 'python essentials 2.png'},
        html: {title: 'HTML Essentials', org: 'HackerRank', skills: ['HTML5','Semantics','Forms'], date: '2024', desc: 'Modern HTML5, semantic markup, forms, accessibility best practices.', image: 'html essentials.png'},
        css: {title: 'CSS Essentials', org: 'HackerRank', skills: ['Flexbox','Grid','Animations'], date: '2024', desc: 'CSS3 Flexbox/Grid layouts, animations, responsive design techniques.', image: 'css essentials.png'},
        js: {title: 'JavaScript Essentials 1', org: 'HackerRank', skills: ['ES6','DOM','Events'], date: '2024', desc: 'Modern JavaScript ES6+, DOM manipulation, event handling, async programming.', image: 'javascript essentials 1.png'},
        dsa: {title: 'Data Structures & Algorithms', org: 'HackerRank', skills: ['Arrays','Trees','Graphs'], date: '2024', desc: 'Core DSA concepts: arrays, linked lists, trees, graphs, sorting/searching algorithms.', image: 'dsa.png'}
      };
      
      let certPanelActive = false;
      
      certCards.forEach(card => {
        const certType = card.dataset.cert;
        card.addEventListener('click', (e) => {
          e.stopPropagation();
          const data = certData[certType];
          if (!data || !detailPanel) return;
          
          // Populate panel
          const previewImg = document.getElementById('cert-preview-img');
          const titleEl = document.getElementById('cert-title');
          const orgEl = document.getElementById('cert-org');
          const dateEl = document.getElementById('cert-date');
          const descEl = document.getElementById('cert-desc');
          const skillsEl = document.getElementById('cert-skills');
          
          if (previewImg) previewImg.src = data.image;
          if (titleEl) titleEl.textContent = data.title;
          if (orgEl) orgEl.textContent = data.org;
          if (dateEl) dateEl.textContent = data.date;
          if (descEl) descEl.textContent = data.desc;
          if (skillsEl) skillsEl.innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join('');
          
          detailPanel.classList.add('active');
          certPanelActive = true;
          document.body.style.overflow = 'hidden';
        });
      });
      
      // ESC key close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certPanelActive && detailPanel) {
          detailPanel.classList.remove('active');
          certPanelActive = false;
          document.body.style.overflow = 'auto';
        }
      });
      
      // Outside click close
      document.addEventListener('click', (e) => {
        if (certPanelActive && detailPanel && !detailPanel.contains(e.target) && !Array.from(certCards).some(card => card.contains(e.target))) {
          detailPanel.classList.remove('active');
          certPanelActive = false;
          document.body.style.overflow = 'auto';
        }
      });
    }
  } catch(e) { console.warn('Cert panel failed:', e); }
  
  // WORK EXPERIENCE + EXTRACURRICULAR CAROUSELS (Safe length checks)
  try {
    // Experience slideshows
    document.querySelectorAll('.experience-images').forEach(slideshow => {
      const images = slideshow.querySelectorAll('.experience-image');
      if (images.length > 1) {
        let idx = 0, interval;
        const show = i => images.forEach((img, j) => img.classList.toggle('active', j === i));
        const next = () => { idx = (idx + 1) % images.length; show(idx); };
        show(0);
        interval = setInterval(next, 3000);
        slideshow.addEventListener('mouseenter', () => clearInterval(interval));
        slideshow.addEventListener('mouseleave', () => interval = setInterval(next, 3000));
      }
    });
    
    // Extracurricular carousels
    document.querySelectorAll('.activity-image-carousel').forEach((carousel, idx) => {
      const images = carousel.querySelectorAll('.carousel-image');
      const dots = carousel.querySelectorAll('.carousel-dot');
      if (images.length <= 1) return;
      if (images[0]) images[0].classList.add('active');
      if (dots[0]) dots[0].classList.add('active');
      let current = 0, intv;
      const showImage = i => {
        images.forEach((img, j) => { img.classList.remove('active'); img.style.opacity = '1'; });
        dots.forEach(d => d.classList.remove('active'));
        if (images[i]) { images[i].classList.add('active'); images[i].style.opacity = '1'; }
        if (dots[i]) dots[i].classList.add('active');
        current = i;
      };
      const next = () => showImage((current + 1) % images.length);
      dots.forEach((dot, i) => dot.addEventListener('click', () => { showImage(i); clearInterval(intv); intv = setInterval(next, 3000); }));
      carousel.addEventListener('mouseenter', () => clearInterval(intv));
      carousel.addEventListener('mouseleave', () => intv = setInterval(next, 3000));
      intv = setInterval(next, 3000);
    });

// HIGHLIGHTS SCROLL REVEAL ANIMATION (NEW)
    // Scroll reveal for ALL highlight cards (.highlight-card + .key-highlight-card)
    const highlightCards = document.querySelectorAll('#highlights .highlight-card, #highlights .key-highlight-card');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered reveal
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 200);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });
    
    highlightCards.forEach(card => revealObserver.observe(card));
    
    console.log('✨ Highlights scroll reveal active for', highlightCards.length, 'cards');
    
// HIGHLIGHTS SLIDESHOW - NEW FIX (Issue #1)
document.querySelectorAll('.highlight-image-slideshow').forEach((slideshow, slideshowIndex) => {
      const images = slideshow.querySelectorAll('img');
      const dots = slideshow.querySelectorAll('.slideshow-dots .dot');
      if (images.length <= 1) return;
      if (images[0]) images[0].classList.add('active');
      if (dots[0]) dots[0].classList.add('active');
      let slideCurrent = 0, slideInterval;
      const showSlide = i => {
        images.forEach((img, j) => img.classList.toggle('active', j === i));
        dots.forEach(d => d.classList.remove('active'));
        if (dots[i]) dots[i].classList.add('active');
        slideCurrent = i;
      };
      const nextSlide = () => showSlide((slideCurrent + 1) % images.length);
      dots.forEach((dot, i) => dot.addEventListener('click', () => {
        showSlide(i);
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3500);
      }));
      slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
      slideshow.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3500));
        slideInterval = setInterval(nextSlide, 1500);n      });
  } catch(e) { console.warn('Carousels failed:', e); }

  
  // PROJECTS MODAL (Safe)
  try {
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    if (projectModal && modalClose) {
      modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
      document.querySelector('.modal-overlay')?.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    }
    document.querySelectorAll('.project-btn-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const projectId = btn.dataset.project;
        // Safe modal population...
        projectModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  } catch(e) { console.warn('Projects modal failed:', e); }
  
  // Contact Form (Safe)
  try {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        // Form validation & notification...
        contactForm.reset();
      });
    }
  } catch(e) { console.warn('Contact form failed:', e); }
  
  // Cursor Glow (Safe)
  try {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);
    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
    });
    function animateCursor() {
      posX += (mouseX - posX) * 0.12; posY += (mouseY - posY) * 0.12;
      glow.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    setTimeout(() => glow.classList.add('visible'), 100);
    animateCursor();
  } catch(e) { console.warn('Cursor glow failed:', e); }
  
  // Start typing on load
  startTypingAnimation();
  
  console.log('✅ ALL FEATURES LOADED SAFELY - Sections should be visible');
  } catch(e) {
    console.error('❌ Portfolio DOMContentLoaded error:', e);
  }
});

