// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a, .nav-menu button');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Contact Modal Functionality
const contactModal = document.getElementById('contact-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const contactModalTriggers = document.querySelectorAll('.contact-modal-trigger');

// Open modal
contactModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        contactModal.classList.add('active');
        contactModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
const closeModal = () => {
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
};

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
}

// Close modal when clicking overlay
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal.querySelector('.modal-overlay') || e.target === contactModal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        closeModal();
    }
});

// Handle modal form submission
const modalForm = contactModal.querySelector('form');
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        modalForm.reset();
        closeModal();
    });
}


// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to elements
const animateOnScroll = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Newsletter Form Handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}

// Gallery Item Click Handler (for future lightbox functionality)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // This is where you could add a lightbox/modal functionality
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    const navAnchorLinks = document.querySelectorAll('.nav-menu a');
    navAnchorLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Preload images for better performance
window.addEventListener('load', () => {
    // Add any image preloading logic here if needed
});

// Infinite Scrolling Carousel Animation
const carousel = document.querySelector('.carousel');
if (carousel) {
    const updateCarouselBlur = () => {
        const carouselRect = carousel.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;
        
        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(carouselCenter - itemCenter);
            const maxDistance = carouselRect.width / 2;
            const blurAmount = (distance / maxDistance) * 8; // Max 8px blur
            
            const card = item.querySelector('.service-card');
            if (card) {
                if (blurAmount > 1) {
                    card.classList.add('blurred');
                    card.style.filter = `blur(${blurAmount}px)`;
                } else {
                    card.classList.remove('blurred');
                    card.style.filter = 'blur(0px)';
                }
            }
        });
    };
    
    // Calculate total width of one set of items
    const getCarouselWidth = () => {
        const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
        const gap = 40; // 2.5rem = 40px
        const itemsInSet = 6; // Original number of items before duplicates
        return (itemWidth + gap) * itemsInSet;
    };
    
    // Auto-scroll animation
    let isAutoScrolling = true;
    let currentScroll = 0;
    const carouselWidth = getCarouselWidth();
    
    const autoScroll = () => {
        if (isAutoScrolling) {
            currentScroll += 3.5;
            carousel.scrollLeft = currentScroll;
            
            // Reset to beginning when reaching the duplicated items
            if (currentScroll >= carouselWidth) {
                currentScroll = 0;
                carousel.scrollLeft = 0;
            }
        }
        requestAnimationFrame(autoScroll);
    };
    
    // Start auto-scroll
    autoScroll();
    
    // Pause on user interaction
    carousel.addEventListener('mousedown', () => {
        isAutoScrolling = false;
    });
    
    carousel.addEventListener('touchstart', () => {
        isAutoScrolling = false;
    });
    
    // Resume after user stops interacting
    let resumeTimeout;
    carousel.addEventListener('mousemove', () => {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            isAutoScrolling = true;
        }, 3000);
    });
    
    carousel.addEventListener('scroll', updateCarouselBlur);
    setTimeout(updateCarouselBlur, 100);
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop view
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }, 250);
});

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotBody = document.querySelector('.chatbot-body');

chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('active');
    chatbotToggle.classList.toggle('hidden');
    chatbotToggle.setAttribute('aria-expanded', chatbotWidget.classList.contains('active'));
    if (chatbotWidget.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWidget.classList.remove('active');
    chatbotToggle.classList.remove('hidden');
    chatbotToggle.setAttribute('aria-expanded', 'false');
});

const sendMessage = () => {
    const message = chatbotInput.value.trim();
    if (message) {
        // Add user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chatbot-message user-message';
        userMessageDiv.innerHTML = `<p>${message}</p>`;
        chatbotBody.appendChild(userMessageDiv);
        
        // Clear input
        chatbotInput.value = '';
        
        // Scroll to bottom
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        
        // Simulate bot response
        setTimeout(() => {
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chatbot-message bot-message';
            botMessageDiv.innerHTML = '<p>Thanks for reaching out! 📸 Our team will get back to you soon. In the meantime, check out our gallery or services above!</p>';
            chatbotBody.appendChild(botMessageDiv);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 500);
    }
};

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Navbar hide/reveal on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling DOWN - hide navbar
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
    } else {
        // Scrolling UP - show navbar
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
