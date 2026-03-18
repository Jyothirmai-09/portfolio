// ========================================
// EXTRACURRICULAR SLIDESHOW - 1.5s Auto-Rotate
// Pause hover, infinite loop, safe for 1+ images
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const slideshows = document.querySelectorAll('.activity-image-slideshow');
  
  slideshows.forEach((slideshow, slideshowIndex) => {
    const images = slideshow.querySelectorAll('img');
    const dots = slideshow.querySelectorAll('.slideshow-dot');
    
    if (images.length <= 1) {
      // Single image: no slideshow needed
      if (images[0]) images[0].classList.add('active');
      return;
    }
    
    let currentIndex = 0;
    let intervalId;
    
    // Initialize first image
    const showImage = (index) => {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentIndex = index;
    };
    
    showImage(0);
    
    // Auto-rotate every 1.5 seconds
    const nextImage = () => {
      const nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex);
    };
    
    const startSlideshow = () => {
      intervalId = setInterval(nextImage, 1500); // 1.5 seconds
    };
    
    const stopSlideshow = () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    
    // Pause on hover
    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showImage(index);
        stopSlideshow();
        startSlideshow();
      });
    });
    
    // Start slideshow
    startSlideshow();
  });
  
  console.log('✅ Extracurricular slideshow initialized');
});
