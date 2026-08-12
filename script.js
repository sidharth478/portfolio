/**
 * ==========================================================================
 * SIDHARTH J - PORTFOLIO INTERACTIVE JAVASCRIPT
 * Features: Dark/Light Mode Switch, Typed Effect, Scroll-Spy, Resume Modal,
 * Skills Filtering, Contact Form & Copy Clipboard, Scroll Animations
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. THEME SWITCHING (DARK / LIGHT MODE)
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', dark);
    } else {
        htmlElement.setAttribute('data-theme', 'dark'); // Default to Dark Navy Tech theme
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });


    /* ----------------------------------------------------------------------
       2. TYPED TEXT ANIMATION (HERO SUBTITLE)
       ---------------------------------------------------------------------- */
    const typedTextElement = document.getElementById('typed-text');
    const phrases = [
        "Final-Year EEE Student",
        "Microcontroller Automation Specialist",
        "PCB Design & Layout Pro",
        "Smart Solar Tracking Developer",
        "IEEE Published Research Author"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typedTextElement) {
        typeEffect();
    }


    /* ----------------------------------------------------------------------
       3. NAVIGATION, SCROLL PROGRESS & SCROLL-SPY
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Mobile Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Window Scroll Events
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update Scroll Progress Bar
        const progressPercentage = (scrollPosition / totalHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${progressPercentage}%`;
        }

        // Navbar Compact Styling on Scroll
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back To Top Visibility
        if (scrollPosition > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Scroll Spy Active Link Highlight
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Back to top click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ----------------------------------------------------------------------
       4. SKILLS SECTION CATEGORY FILTERING
       ---------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* ----------------------------------------------------------------------
       5. RESUME MODAL VIEWER
       ---------------------------------------------------------------------- */
    const openResumeBtn = document.getElementById('open-resume-btn');
    const closeResumeBtn = document.getElementById('close-modal-btn');
    const resumeModal = document.getElementById('resume-modal');

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        const closeModal = () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeResumeBtn.addEventListener('click', closeModal);

        // Close on backdrop click
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeModal();
            }
        });
    }


    /* ----------------------------------------------------------------------
       6. COPY TO CLIPBOARD BUTTONS (PHONE & EMAIL)
       ---------------------------------------------------------------------- */
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalIcon = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check" style="color: #22c55e;"></i>';
                btn.setAttribute('title', 'Copied!');
                
                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                    btn.setAttribute('title', 'Copy to Clipboard');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });


    /* ----------------------------------------------------------------------
       7. CONTACT FORM SUBMISSION WITH MAILTO FALLBACK
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all fields before submitting.';
                return;
            }

            // Create mailto URL fallback link
            const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${subject}`);
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoUrl = `mailto:sidsidharth1234@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

            // Trigger mailto link
            window.location.href = mailtoUrl;

            // Show success message in UI
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Opening your email client... Thank you for reaching out!';
            
            contactForm.reset();

            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    }


    /* ----------------------------------------------------------------------
       8. SCROLL-TRIGGERED FADE-IN ANIMATIONS (INTERSECTION OBSERVER)
       ---------------------------------------------------------------------- */
    const animatedElements = document.querySelectorAll('.card-hover, .section-header, .stat-card, .timeline-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateOnScrollObserver.observe(el);
    });

});
