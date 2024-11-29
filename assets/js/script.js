document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Verificar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon(savedTheme === 'dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navItems = document.querySelector('.nav-items');

    mobileMenuBtn.addEventListener('click', () => {
        navItems.classList.toggle('active');
    });

    // Project Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'todos') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                navItems.classList.remove('active');
                
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando EmailJS o tu propio backend
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            try {
                // Simulación de envío
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mostrar mensaje de éxito
                alert('¡Mensaje enviado con éxito!');
                contactForm.reset();
            } catch (error) {
                alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
            }
        });
    }

    // Skill Bars Animation
    const skillLevels = document.querySelectorAll('.skill-level');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('style').match(/width: (\d+)%/)[1];
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillLevels.forEach(level => observer.observe(level));
});
