// Work Experience JavaScript
// Auto-slideshow for experience images + scroll animations

document.addEventListener('DOMContentLoaded', function() {
  // Slideshow functionality
  const slideshows = document.querySelectorAll('.experience-images');
  
  slideshows.forEach((slideshow, slideshowIndex) => {
    const images = slideshow.querySelectorAll('.experience-image');
    let currentImageIndex = 0;
    let slideshowInterval;
    let isPaused = false;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex);
    }

    function startSlideshow() {
    slideshowInterval = setInterval(nextImage, 2000); // 2 seconds interval
    }

    function pauseSlideshow() {
      clearInterval(slideshowInterval);
      isPaused = true;
    }

    function resumeSlideshow() {
      if (isPaused) {
        startSlideshow();
        isPaused = false;
      }
    }

    // Initialize first image
    showImage(0);
    
    // Start slideshow
    startSlideshow();

    // Pause on hover
    slideshow.addEventListener('mouseenter', pauseSlideshow);
    slideshow.addEventListener('mouseleave', resumeSlideshow);

    // Optional: Manual navigation (dots if added later)
    // slideshow.addEventListener('click', function(e) {
    //   if (e.target.classList.contains('slideshow-dot')) {
    //     currentImageIndex = parseInt(e.target.dataset.index);
    //     showImage(currentImageIndex);
    //     clearInterval(slideshowInterval);
    //     startSlideshow();
    //   }
    // });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in', 'animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe experience cards
  const experienceCards = document.querySelectorAll('.experience-card');
  experienceCards.forEach(card => {
    observer.observe(card);
  });
});

// Smooth scrolling for nav links (if Experience nav link added)
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
