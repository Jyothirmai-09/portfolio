// ========================================
  // FIXED EXTRACURRICULAR CAROUSEL - Navy Marathon
  // All images rotate correctly, independent per card
  // ========================================

document.addEventListener('DOMContentLoaded', function() {
  const activityCarousels = document.querySelectorAll('.activity-image-carousel');
  
  activityCarousels.forEach((carousel, carouselIndex) => {
    const images = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    if (images.length === 0) return;
    
    let currentIndex = 0;
    let interval;
    
    // Initialize first image active
    if (images[0]) images[0].classList.add('active');
    if (dots[0]) dots[0].classList.add('active');
    
    function showImage(index) {
      // Hide all images
      images.forEach((img, i) => img.classList.remove('active'));
      // Hide all dots
      dots.forEach((dot, i) => dot.classList.remove('active'));
      
      // Show current
      images[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
      
      currentIndex = index;
    }
    
    function nextImage() {
      const nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex);
    }
    
    function startRotation() {
      interval = setInterval(nextImage, 4000); // 4 seconds per image
    }
    
    function stopRotation() {
      if (interval) clearInterval(interval);
    }
    
    // Dot clicks
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showImage(index);
        stopRotation();
        startRotation(); // Restart rotation
      });
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopRotation);
    carousel.addEventListener('mouseleave', startRotation);
    
    // Start immediately
    startRotation();
  });
  
  console.log('✅ Fixed: Extracurricular carousels working independently');
});

