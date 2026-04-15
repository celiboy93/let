// ========== DOM ELEMENTS ==========
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const serverTabs = document.querySelectorAll('.server-tab');
const serverContents = document.querySelectorAll('.server-content');
const statNumbers = document.querySelectorAll('.stat-number');

// ========== NAVBAR SCROLL ==========
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

// ========== MOBILE NAV TOGGLE ==========
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// ========== BACK TO TOP ==========
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== SERVER TABS ==========
serverTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        serverTabs.forEach(t => t.classList.remove('active'));
        serverContents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
});

// ========== COUNT UP ANIMATION ==========
function animateCountUp(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        el.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statEl = entry.target;
            animateCountUp(statEl);
            statsObserver.unobserve(statEl);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => statsObserver.observe(num));

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .server-card, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index % 6 * 0.1}s`;
    revealObserver.observe(el);
});

// ========== DOWNLOAD BUTTON ==========
// CHANGE THIS URL to your actual APK download link
const APK_DOWNLOAD_URL = 'https://your-download-link.com/let-connect-vpn.apk';

const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Trigger download
        const link = document.createElement('a');
        link.href = APK_DOWNLOAD_URL;
        link.download = 'Let-Connect-VPN.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Visual feedback
        downloadBtn.innerHTML = '<i class="fas fa-check"></i><div><small>Downloading...</small><strong>Please Wait</strong></div>';
        setTimeout(() => {
            downloadBtn.innerHTML = '<i class="fab fa-android"></i><div><small>Download</small><strong>Android APK</strong></div>';
        }, 3000);
    });
}

// ========== SMOOTH SCROLL POLYFILL (for older browsers) ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== PHONE MOCKUP CONNECTION ANIMATION ==========
const vpnCircle = document.querySelector('.vpn-circle-inner');
if (vpnCircle) {
    setInterval(() => {
        vpnCircle.style.transform = 'scale(1.05)';
        setTimeout(() => {
            vpnCircle.style.transform = 'scale(1)';
        }, 500);
    }, 3000);
}

console.log('✅ Let Connect VPN website loaded successfully!');
