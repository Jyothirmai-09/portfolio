const phrases = ["Problem Solver", "Web Developer", "Tech Explorer"];
let i = 0, j = 0, isDeleting = false, current = "";
const typingDiv = document.getElementById("typing");
function type() {
  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      current = phrases[i].substring(0, j++);
      typingDiv.innerHTML = current + '<span style="opacity:0.5;">|</span>';
      setTimeout(type, 90);
    } else if (isDeleting && j >= 0) {
      current = phrases[i].substring(0, j--);
      typingDiv.innerHTML = current + '<span style="opacity:0.5;">|</span>';
      setTimeout(type, 50);
    } else if (!isDeleting && j > phrases[i].length) {
      isDeleting = true;
      setTimeout(type, 900);
    } else if (isDeleting && j < 0) {
      isDeleting = false;
      i = (i + 1) % phrases.length;
      setTimeout(type, 400);
    }
  }
}
type();
window.addEventListener('scroll', () => {
  const scrollIndicator = document.getElementById('scrollIndicator');
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollIndicator.style.width = scrollPercent + "%";
});
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
hamburger.addEventListener('click', () => {
  navbar.classList.toggle('open');
});
function revealOnScroll() {
  document.querySelectorAll('.fadein').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for reaching out, Jyothirmai will get back to you soon!');
  this.reset();
});