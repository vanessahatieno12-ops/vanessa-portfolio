
// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.onclick = () => navLinks.classList.toggle('active');

// Fade-in on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  })
},{threshold:0.1});

sections.forEach(sec=>{
  sec.style.opacity = 0;
  sec.style.transform = 'translateY(20px)';
  sec.style.transition = '0.6s ease';
  observer.observe(sec);
});

// Smooth typing effect for name
const typingName = document.getElementById('typing-name');
const nameText = "Vanessa Atieno";
let i = 0;

function typeWriter() {
  if(i < nameText.length){
    typingName.textContent = nameText.substring(0, i+1);
    i++;
    setTimeout(typeWriter, 100);
  } else {
    typingName.style.borderRight = 'none'; // remove cursor when done
  }
}
window.addEventListener('load', typeWriter);

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = '';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = 'Message sent successfully! I’ll get back to you soon.';
            contactForm.reset();
        } else {
            formStatus.textContent = 'Something went wrong. Please try again.';
        }
    } catch (error) {
        formStatus.textContent = 'Something went wrong. Please try again.';
    }

    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
});