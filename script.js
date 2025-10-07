
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Enhanced Theme Toggle Functionality with Animations
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;
const darkSparkles = document.getElementById('darkSparkles');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply the saved theme
if (currentTheme === 'dark') {
    html.classList.add('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
}

function createSparkles(count = 50) {
    darkSparkles.innerHTML = ''; // Clear previous sparkles
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.classList.add('sparkle-dot');
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${2 + Math.random() * 2}s`; // Random twinkle speed
        darkSparkles.appendChild(dot);
    }
}

// Apply the saved theme
if (currentTheme === 'dark') {
    html.classList.add('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');

    // Create sparkles on load
    createSparkles();
    darkSparkles.classList.add('active');
}

// Theme toggle click event
themeToggle.addEventListener('click', () => {
    // Add switching animation
    themeToggle.classList.add('switching');

    html.classList.toggle('dark');

    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');

        // Create sparkles only if not exist
        if (!document.querySelectorAll('.sparkle-dot').length) {
            createSparkles();
        }
        darkSparkles.classList.add('active');
    } else {
        localStorage.setItem('theme', 'light');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
        darkSparkles.classList.remove('active');
    }

    // Remove switching animation after short delay
    setTimeout(() => {
        themeToggle.classList.remove('switching');
    }, 500);
});

// Progress bar animation on scroll
const observeProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-fill');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target;
                const progressWidth = progressFill.style.getPropertyValue('--progress-width');

                // Reset and animate
                progressFill.style.width = '0%';
                setTimeout(() => {
                    progressFill.style.width = progressWidth;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
};

// Initialize progress bar observer
observeProgressBars();

// Enhanced email.js with animations
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const button = form.querySelector('button[type="submit"]');

    // Create enhanced popup element
    let popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'fixed top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-3 shadow-lg z-50 opacity-0 transition-all duration-500 pointer-events-none';
    popup.innerHTML = `<span id="popupText"></span>`;
    document.body.appendChild(popup);

    function showPopup(message) {
        const popupText = document.getElementById('popupText');
        popupText.textContent = message;
        popup.classList.remove('opacity-0', 'pointer-events-none');
        popup.classList.add('opacity-100');
        popup.style.transform = 'translateX(-50%) translateY(0)';

        // Hide popup after 2.5 seconds
        setTimeout(() => {
            popup.style.transform = 'translateX(-50%) translateY(-20px)';
            popup.classList.remove('opacity-100');
            popup.classList.add('opacity-0', 'pointer-events-none');
        }, 2500);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const serviceID = 'service_7ipfx1u';
        const templateID = 'template_mxnu8ig';
        const publicKey = 'pj9DmWpHrB7izjlYu'; // EmailJS public key

        // Save original button HTML
        const originalBtnHTML = button.innerHTML;

        // Disable button and show loading spinner
        button.disabled = true;
        button.innerHTML = `
                    <span class="flex items-center justify-center gap-2">
                        Sending...
                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    </span>
                `;

        // Send the email using EmailJS
        emailjs.sendForm(serviceID, templateID, form, publicKey)
            .then(() => {
                // Restore button
                button.disabled = false;
                button.innerHTML = originalBtnHTML;
                form.reset();

                // Show success popup
                showPopup('✅ Message Sent Successfully!');
            })
            .catch((error) => {
                console.error('EmailJS error:', error);

                // Restore button
                button.disabled = false;
                button.innerHTML = originalBtnHTML;

                // Show error popup
                showPopup('❌ Failed to send message.');
            });
    });
});

// Enhanced Particle Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50; // Fewer particles on mobile

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typing animation restart on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typewriter = entry.target.querySelector('.typewriter');
            if (typewriter) {
                typewriter.style.animation = 'none';
                setTimeout(() => {
                    typewriter.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
                }, 100);
            }
        }
    });
});

const heroSection = document.getElementById('home');
if (heroSection) {
    observer.observe(heroSection);
}

// Enhanced Project Card Interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Console message
console.log(`
        🚀 Welcome to Abhishek's Enhanced Portfolio with Education & Skills!
        
        ✨ New Enhanced Features:
        - Complete Education timeline with animations
        - Enhanced Skills section with progress bars
        - Improved responsive design and accessibility
        - Dark mode with sparkle effects
        - AOS animations throughout
        - Modern card layouts and hover effects
        
        Built with:
        - HTML5 & CSS3 with advanced animations
        - JavaScript (ES6+) with enhanced interactions
        - Tailwind CSS with custom extensions
        - AOS Animation Library
        - Custom progress bar animations
        
        Feel free to explore and reach out for collaborations!
        
        GitHub: https://github.com/abhishek-coder-01
        LinkedIn: https://www.linkedin.com/in/abhishek-yadav-292ba9308
        Email: abhishekya301@gmail.com
        `);

// Enhanced JS-driven typing + erasing animation
(function () {
    const phrases = [
        'Full Stack Developer',
        'Python & Flask Enthusiast',
        'Frontend with Tailwind CSS',
        'Node.js & REST APIs',
    ];

    const typeElem = document.querySelector('.typewriter');
    if (!typeElem) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;
    let timeout = null;

    const typeSpeed = 80; // ms per char
    const eraseSpeed = 40; // ms per char
    const nextDelay = 1200; // pause before typing next phrase

    function typeLoop() {
        const current = phrases[phraseIndex];

        if (typing) {
            if (charIndex < current.length) {
                typeElem.textContent = current.slice(0, ++charIndex);
                timeout = setTimeout(typeLoop, typeSpeed);
            } else {
                typing = false;
                timeout = setTimeout(typeLoop, nextDelay);
            }
        } else {
            if (charIndex > 0) {
                typeElem.textContent = current.slice(0, --charIndex);
                timeout = setTimeout(typeLoop, eraseSpeed);
            } else {
                typing = true;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                timeout = setTimeout(typeLoop, 300);
            }
        }
    }

    // Start typing when hero section becomes visible
    const hero = document.getElementById('home');
    if (hero) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!timeout) typeLoop();
                } else {
                    // stop typing when out of view
                    if (timeout) { clearTimeout(timeout); timeout = null; }
                }
            });
        }, { threshold: 0.1 });
        io.observe(hero);
    } else {
        // fallback: start immediately
        typeLoop();
    }
})();

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize particles
createParticles();

// Responsive particle adjustment
window.addEventListener('resize', () => {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
    createParticles();
});
