// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});


// ============================================
// Certificate Modal Functionality
// ============================================

function modalSetup(cardId, modalId, closeId, backdropId) {
    const card = document.getElementById(cardId);
    const modal = document.getElementById(modalId);
    const close = document.getElementById(closeId);
    const backdrop = document.getElementById(backdropId);

    const openModal = () => {
        modal.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        backdrop.classList.remove('opacity-0');
    };

    const closeModal = () => {
        modal.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        backdrop.classList.add('opacity-0');
    };

    card.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
}

modalSetup('card-first', 'modal-genai', 'close-genai', 'backdrop-genai');
modalSetup('card-second', 'modal-full-stack', 'close-full-stack', 'backdrop-full-stack');
modalSetup('card-third', 'modal-react', 'close-react', 'backdrop-react');
modalSetup('card-four', 'modal-python', 'close-python', 'backdrop-python');
modalSetup('card-six', 'modal-power', 'close-power', 'backdrop-power');
modalSetup('card-five', 'modal-data', 'close-data', 'backdrop-data');
modalSetup('card-seven', 'modal-google', 'close-google', 'backdrop-google');


// ============================================
// End Certificate Modal Functionality
// ============================================



// ============================================
// Enhanced Theme Toggle Functionality
// ============================================
const themeSystem = document.getElementById('themeSystem');
const themeLight = document.getElementById('themeLight');
const themeDark = document.getElementById('themeDark');
// Mobile theme buttons (inside mobile menu)
const themeSystemMobile = document.getElementById('themeSystemMobile');
const themeLightMobile = document.getElementById('themeLightMobile');
const themeDarkMobile = document.getElementById('themeDarkMobile');
const html = document.documentElement;
const darkSparkles = document.getElementById('darkSparkles');
// screen loading section elements
const loader = document.getElementById('loader');
const prog = document.getElementById('progress');
const bar = document.getElementById('progress-bar');
const status = document.getElementById('load-status');
const msgs = ['Initializing...', 'Loading assets...', 'Building UI...', 'Almost done...'];
// Check for saved theme preference or default to system
const currentTheme = localStorage.getItem('theme') || 'system';



// First visit check
if (!sessionStorage.getItem('visited')) {
    sessionStorage.setItem('visited', '1');
    document.body.style.overflow = 'hidden';
    let count = 0;

    const iv = setInterval(() => {
        count += Math.floor(Math.random() * 3) + 1;
        if (count >= 100) count = 100;
        prog.textContent = count;
        bar.style.width = count + '%';
        status.textContent = msgs[Math.floor(count / 25)] || 'Almost done...';

        if (count === 100) {
            clearInterval(iv);
            status.textContent = '— Ready —';
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                document.body.style.overflow = '';
            }, 600);
        }
    }, 35);

} else {
    loader.style.display = 'none';
}

// Function to create sparkles for dark mode
function createSparkles(count = 50) {
    if (!darkSparkles) return;
    darkSparkles.innerHTML = ''; // Clear previous sparkles
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.classList.add('sparkle-dot');
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${2 + Math.random() * 2}s`;
        darkSparkles.appendChild(dot);
    }
}

function applyTheme(theme) {

    // Remove highlight from all buttons
    // include both desktop and mobile theme button classes
    document.querySelectorAll('.theme-btn, .theme-btn-mobile').forEach(btn => {
        btn.classList.remove('theme-btn-active');
    });

    if (theme === 'dark') {
        html.classList.add('dark');
        if (themeDark) themeDark.classList.add('theme-btn-active');
        if (themeDarkMobile) themeDarkMobile.classList.add('theme-btn-active');
        createSparkles();
        if (darkSparkles) darkSparkles.classList.add('active');
    }

    else if (theme === 'light') {
        html.classList.remove('dark');
        if (themeLight) themeLight.classList.add('theme-btn-active');
        if (themeLightMobile) themeLightMobile.classList.add('theme-btn-active');
        if (darkSparkles) darkSparkles.classList.remove('active');
    }

    else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDark) {
            html.classList.add('dark');
            createSparkles();
            if (darkSparkles) darkSparkles.classList.add('active');
        } else {
            html.classList.remove('dark');
            if (darkSparkles) darkSparkles.classList.remove('active');
        }

        if (themeSystem) themeSystem.classList.add('theme-btn-active');
        if (themeSystemMobile) themeSystemMobile.classList.add('theme-btn-active');
    }
}


// Apply saved theme on load
applyTheme(currentTheme);

// Theme button event listeners
themeSystem.addEventListener('click', () => {
    localStorage.setItem('theme', 'system');
    applyTheme('system');
});



themeLight.addEventListener('click', () => {
    localStorage.setItem('theme', 'light');
    applyTheme('light');
});

themeDark.addEventListener('click', () => {
    localStorage.setItem('theme', 'dark');
    applyTheme('dark');
});

// Mobile theme button listeners (mirror desktop behavior)
if (themeSystemMobile) {
    themeSystemMobile.addEventListener('click', () => {
        localStorage.setItem('theme', 'system');
        applyTheme('system');
    });
}

if (themeLightMobile) {
    themeLightMobile.addEventListener('click', () => {
        localStorage.setItem('theme', 'light');
        applyTheme('light');
    });
}

if (themeDarkMobile) {
    themeDarkMobile.addEventListener('click', () => {
        localStorage.setItem('theme', 'dark');
        applyTheme('dark');
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
        applyTheme('system');
    }
});

// ============================================
// Progress bar animation on scroll
// ============================================
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

// ============================================
// Enhanced email.js with animations
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) return;

    const button = form.querySelector('button[type="submit"]');
    if (!button) return;

    // Create enhanced popup element
    let popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'glass-toast fixed top-5 left-1/2 flex items-center gap-3 px-4 py-3 rounded-2xl z-50 opacity-0 transition-all duration-500 pointer-events-none';
    popup.innerHTML = `
        <span id="popupBadge" class="glass-toast-badge inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"></span>
        <span id="popupText" class="text-sm sm:text-[15px] font-medium tracking-[0.01em]"></span>
    `;
    document.body.appendChild(popup);
    popup.style.transform = 'translateX(-50%) translateY(-20px)';

    function showPopup(message, type = 'success') {
        const popupText = document.getElementById('popupText');
        const popupBadge = document.getElementById('popupBadge');
        const normalizedMessage = message.includes('Message Sent Successfully')
            ? 'Message sent successfully!'
            : message.includes('Failed to send message')
                ? 'Failed to send message.'
                : message;
        const resolvedType = normalizedMessage.toLowerCase().includes('failed') ? 'error' : type;

        popupText.textContent = normalizedMessage;
        popupBadge.textContent = resolvedType === 'error' ? '!' : 'OK';
        popup.classList.remove('glass-toast-success', 'glass-toast-error');
        popup.classList.add(resolvedType === 'error' ? 'glass-toast-error' : 'glass-toast-success');
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
        const publicKey = 'pj9DmWpHrB7izjlYu';

        // Save original button HTML
        const originalBtnHTML = button.innerHTML;

        // Disable button and show loading spinner
        button.disabled = true;
        button.innerHTML = `
        <span class="flex items-center justify-center gap-2">
    Sending...
    <svg class="h-5 w-5 animate-spin" viewBox="0 0 50 50">
        <defs>
            <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#feda75"/>
                <stop offset="25%" stop-color="#fa7e1e"/>
                <stop offset="50%" stop-color="#d62976"/>
                <stop offset="75%" stop-color="#962fbf"/>
                <stop offset="100%" stop-color="#4f5bd5"/>
            </linearGradient>
        </defs>
        <circle cx="25" cy="25" r="20" stroke="url(#instaGradient)" stroke-width="5" fill="none" stroke-linecap="round"/>
    </svg>
</span>

        `;

        // Send the email using EmailJS
        emailjs.sendForm(serviceID, templateID, form, publicKey)
            .then(() => {
                button.disabled = false;
                button.innerHTML = originalBtnHTML;
                form.reset();
                showPopup('✅ Message Sent Successfully!');
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                button.disabled = false;
                button.innerHTML = originalBtnHTML;
                showPopup('❌ Failed to send message.');
            });
    });
});

// ============================================
// Enhanced Particle Background
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth < 768 ? 30 : 50;

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

// ============================================
// Typing animation restart on scroll
// ============================================
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

// ============================================
// Enhanced Project Card Interactions
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Smooth scrolling for anchor links
// ============================================
function getStickyHeaderOffset() {
    const header = document.querySelector('header');
    if (!header) return 96;

    const headerHeight = header.getBoundingClientRect().height;
    return Math.ceil(headerHeight + 24);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = getStickyHeaderOffset();
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar active state sync
// ============================================
(function () {
    const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
    if (!navLinks.length) return;

    const sectionIds = ['home', 'about', 'contact'];
    const visibleSections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    function setActiveNav(targetId) {
        navLinks.forEach(link => {
            const isMatch = link.getAttribute('href') === `#${targetId}`;
            link.classList.toggle('is-active', isMatch);
            if (isMatch) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    if (!visibleSections.length) {
        setActiveNav('home');
        return;
    }

    function syncActiveNavByScroll() {
        const scrollMarker = window.scrollY + getStickyHeaderOffset() + 120;
        let activeSectionId = visibleSections[0].id;

        visibleSections.forEach(section => {
            if (section.offsetTop <= scrollMarker) {
                activeSectionId = section.id;
            }
        });

        setActiveNav(activeSectionId);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').replace('#', '');
            setActiveNav(targetId);
            requestAnimationFrame(syncActiveNavByScroll);
        });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                syncActiveNavByScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener('resize', syncActiveNavByScroll);
    syncActiveNavByScroll();
})();

// ============================================
// Enhanced JS-driven typing + erasing animation
// ============================================
(function () {
    const phrases = [
        "MERN Stack Developer",
        "Ideas into Real-World Products",
        "React & Tailwind CSS Specialist",
        "Node.js, REST APIs & Python (Flask)",
        "15+ Projects Built & Deployed 🚀"
    ];

    const typeElem = document.querySelector('.typewriter');
    if (!typeElem) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;
    let timeout = null;

    const typeSpeed = 80;
    const eraseSpeed = 40;
    const nextDelay = 1200;

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

    const hero = document.getElementById('home');
    if (hero) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!timeout) typeLoop();
                } else {
                    if (timeout) { clearTimeout(timeout); timeout = null; }
                }
            });
        }, { threshold: 0.1 });
        io.observe(hero);
    } else {
        typeLoop();
    }
})();

// ============================================
// Initialize Lenis Smooth Scroll
// ============================================
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ============================================
// Initialize particles
// ============================================
createParticles();

// Responsive particle adjustment
window.addEventListener('resize', () => {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        createParticles();
    }
});



// ============================================
// Download button CV
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('downloadBtn');
    const btnIcon = document.getElementById('btnIcon');
    const btnText = document.getElementById('btnText');
    const progressText = document.getElementById('progressText');

    // Original content to restore later if you want
    const originalIconHTML = btnIcon.innerHTML;
    const originalText = btnText.textContent;

    btn.addEventListener('click', async (e) => {
        e.preventDefault(); // we'll handle download manually

        const url = btn.getAttribute('href');
        const filename = (new URL(url, location.href)).pathname.split('/').pop() || 'download.pdf';

        // Disable button while downloading
        btn.classList.add('opacity-70', 'pointer-events-none');
        progressText.textContent = '';

        // Set downloading UI: spinner + text
        btnIcon.innerHTML = `
        <svg class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke-width="2" class="opacity-20"></circle>
            <path d="M22 12a10 10 0 0 0-10-10" stroke-width="2"></path>
        </svg>
        `;
        btnText.textContent = 'Downloading...';

        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error('Network response was not ok');

            const contentLength = resp.headers.get('Content-Length');
            if (!resp.body) {
                const blob = await resp.blob();
                triggerDownload(blob, filename);
                showDownloadedState();
                return;
            }

            const total = contentLength ? parseInt(contentLength, 10) : null;
            const reader = resp.body.getReader();
            const chunks = [];
            let received = 0;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                received += value.length || value.byteLength || 0;

                if (total) {
                    const percent = Math.round((received / total) * 100);
                    progressText.textContent = `Downloaded ${percent}%`;
                    btnText.textContent = `Downloading... ${percent}%`;
                } else {
                    progressText.textContent = `Downloading...`;
                }
            }

            const blob = new Blob(chunks, { type: resp.headers.get('Content-Type') || 'application/pdf' });
            triggerDownload(blob, filename);

            showDownloadedState();
        } catch (err) {
            console.error(err);
            progressText.textContent = 'Download failed. Please try again.';
            btnIcon.innerHTML = originalIconHTML;
            btnText.textContent = originalText;
            btn.classList.remove('opacity-70', 'pointer-events-none');
        }
    });

    function triggerDownload(blob, filename) {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    function showDownloadedState() {
        // ✅ Show green check icon + normal text color
        btnIcon.innerHTML = `
        <svg class="w-5 h-5 text-green-500 font-bold" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        `;
        // ✅ Keep text color normal, just change text
        btnText.textContent = 'Downloaded CV';
        progressText.textContent = 'Download complete';

        // Smooth animation
        btn.classList.add('scale-105', 'transition');

        // Restore to normal after 2s
        setTimeout(() => {
            btnIcon.innerHTML = originalIconHTML;
            btnText.textContent = originalText;
            progressText.textContent = '';
            btn.classList.remove('opacity-70', 'pointer-events-none', 'scale-105');
        }, 2000);
    }
});


// ============================================
// Mobile menu toggle (smooth)
// ============================================
(function () {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const menuButtonContainer = document.getElementById('menu_button');

    if (!mobileMenu || !mobileMenuBtn) return;

    // ensure accessible state
    mobileMenuBtn.setAttribute('aria-expanded', 'false');

    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');

        if (menuButtonContainer) menuButtonContainer.classList.toggle('menu-open');

        mobileMenuBtn.setAttribute('aria-expanded', String(isActive));

        // prevent body scroll when menu is open on mobile
        if (isActive) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
    });

    // Close when clicking nav links inside mobile menu
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            if (menuButtonContainer) menuButtonContainer.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('overflow-hidden');
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (menuButtonContainer) menuButtonContainer.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('overflow-hidden');
        }
    });

    // Close when resizing to large screens
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            mobileMenu.classList.remove('active');
            if (menuButtonContainer) menuButtonContainer.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('overflow-hidden');
        }
    });

})();

console.log(
    "%c✨ Welcome to My Portfolio! ✨\n%cFeel free to explore the code and reach out if you have any questions.\n\n%c📩 Contact me anytime 😊",
    "color:#6366f1; font-size:20px; font-weight:700;",
    "color:#10b981; font-size:14px;",
    "color:#f43f5e; font-size:14px; font-weight:600;"
);

// ============================================
// End of script.js
// ============================================
