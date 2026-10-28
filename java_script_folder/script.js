/**
 * Nawe Abaasa Portfolio - Interactive Scripts
 * Handles mobile navigation, dynamic typing, animated skill bars,
 * project category filtering, and contact form validation/toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Mobile Hamburger Navigation
    // -------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking any nav link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // -------------------------------------------------------------
    // 2. Dynamic Typing Effect (Hero Section)
    // -------------------------------------------------------------
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const roles = [
            "Computer Science Student",
            "Web Developer & Designer",
            "Python Programmer",
            "Data Science Enthusiast",
            "Mathematical Computing Explorer"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                dynamicText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                dynamicText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 35 : 75;

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end of word
                typeSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 400; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing after a short initial delay
        setTimeout(type, 500);
    }

    // -------------------------------------------------------------
    // 3. Animated Skill Bars (Skills Page)
    // -------------------------------------------------------------
    const skillBars = document.querySelectorAll('.skill-fill');
    if (skillBars.length > 0) {
        const animateSkills = () => {
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent') || '0';
                bar.style.width = percent + '%';
            });
        };

        // Use IntersectionObserver if available, or trigger on load
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkills();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.2 });

            const skillsSection = document.querySelector('.skills-container') || document.querySelector('.main');
            if (skillsSection) {
                observer.observe(skillsSection);
            } else {
                animateSkills();
            }
        } else {
            setTimeout(animateSkills, 300);
        }
    }

    // -------------------------------------------------------------
    // 4. Interactive Project Filter Tabs (Projects Page)
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------
    // 5. Interactive Contact Form with Real-Time Validation & Toast
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Simple client-side validation (Name & Message required)
            if (!name.value.trim() || !message.value.trim()) {
                showToast('Please provide your name and a message.', 'error');
                return;
            }

            // If an email is provided, validate its format
            if (email && email.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value.trim())) {
                    showToast('Please provide a valid email address or leave it blank.', 'error');
                    return;
                }
            }

            // Simulate sending with reactive button feedback
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                showToast(`Thank you, ${name.value.trim()}! Your message has been sent successfully.`, 'success');
                contactForm.reset();
            }, 1200);
        });
    }

    function showToast(text, type = 'success') {
        if (!toast) return;
        toast.textContent = text;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.className = 'toast';
        }, 4000);
    }

    // -------------------------------------------------------------
    // 6. Smooth Back-to-Top Navigation
    // -------------------------------------------------------------
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
