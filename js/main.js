/* ========================================
   LET CONNECT VPN - MAIN JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ========== MOBILE NAV TOGGLE ==========
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');

    function activateNavLink() {
        const scrollY = window.pageYOffset + 100;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(function (link) {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);

    // ========== COUNTER ANIMATION ==========
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        counters.forEach(function (counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            updateCounter();
        });
    }

    // Run counter animation when hero section is visible
    const heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(function (otherItem) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== SCROLL REVEAL ANIMATION ==========
    const revealElements = document.querySelectorAll(
        '.feature-card, .server-type-card, .pricing-card, .download-card, .contact-card, .bonus-card, .faq-item'
    );

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
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

    revealElements.forEach(function (el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease ' + (index % 3) * 0.1 + 's, transform 0.6s ease ' + (index % 3) * 0.1 + 's';
        revealObserver.observe(el);
    });

    // ========== DOWNLOAD BUTTONS ==========
    // VPN APK download link - CHANGE THIS URL
    const vpnDownloadBtn = document.getElementById('vpnDownloadBtn');
    if (vpnDownloadBtn) {
        vpnDownloadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // ============================================
            // ⬇️ ဒီ URL ကို သင့် VPN APK link နဲ့ ပြောင်းပါ
            // ============================================
            var vpnApkUrl = 'https://files.catbox.moe/84c8sh.apk';
            window.open(vpnApkUrl, '_blank');
        });
    }

    // Lugyi APK download link - CHANGE THIS URL
    const lugyiDownloadBtn = document.getElementById('lugyiDownloadBtn');
    if (lugyiDownloadBtn) {
        lugyiDownloadBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // ============================================
            // ⬇️ ဒီ URL ကို သင့် Lugyi APK link နဲ့ ပြောင်းပါ
            // ============================================
            var lugyiApkUrl = 'https://lugyiapplication.vercel.app/download';
            window.open(lugyiApkUrl, '_blank');
        });
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== TYPING EFFECT FOR STATUS ==========
    const statusText = document.querySelector('.status-text');
    if (statusText) {
        const states = ['Connected', 'Secure', 'Protected'];
        let stateIndex = 0;

        setInterval(function () {
            stateIndex = (stateIndex + 1) % states.length;
            statusText.style.opacity = '0';

            setTimeout(function () {
                statusText.textContent = states[stateIndex];
                statusText.style.opacity = '1';
            }, 300);
        }, 3000);
    }

});
