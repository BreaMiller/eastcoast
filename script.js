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
    // Remove any existing duplicates from HTML (class selector to identify originals)
    const container = carousel.parentElement;
    
    // Get original items before any duplicates
    const allItems = carousel.querySelectorAll('.carousel-item');
    const originalCount = Math.ceil(allItems.length / 2); // Assuming HTML has 1x originals + duplicates
    
    // Create a fresh set for infinite scroll
    const originalItems = Array.from(allItems).slice(0, originalCount);
    
    // Clear carousel and rebuild with proper duplicates
    carousel.innerHTML = '';
    
    // Add items 3x for smooth infinite scroll (previous, current, next)
    for (let i = 0; i < 3; i++) {
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });
    }
    
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
    
    // Calculate width of one complete set
    const getOneSetWidth = () => {
        const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
        const gap = 40; // 2.5rem = 40px
        return (itemWidth + gap) * originalCount;
    };
    
    // Auto-scroll animation with proper infinite scroll
    let isAutoScrolling = true;
    let currentScroll = 0;
    const oneSetWidth = getOneSetWidth();
    
    // Start from the middle set
    carousel.scrollLeft = oneSetWidth;
    currentScroll = oneSetWidth;
    
    const autoScroll = () => {
        if (isAutoScrolling) {
            currentScroll += 3.5;
            carousel.scrollLeft = currentScroll;
            
            // Seamless infinite scroll: reset to middle when reaching end
            const totalWidth = oneSetWidth * 3;
            if (currentScroll >= oneSetWidth * 2) {
                currentScroll = oneSetWidth;
                carousel.scrollLeft = currentScroll;
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
// FAQ Accordion Functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.display = 'none';
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current FAQ item
        faqItem.classList.toggle('active');
        const answer = question.nextElementSibling;
        answer.style.display = isActive ? 'none' : 'block';
        question.setAttribute('aria-expanded', !isActive);
    });
});

// Smooth Scroll Blur Animation - Sections Blur Into View
const scrollBlurElements = document.querySelectorAll('.scroll-blur');

function updateScrollBlur() {
    scrollBlurElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        
        // Calculate how much of the element is visible
        let blurFactor = 1; // Start fully blurred
        
        if (elementBottom < 0) {
            // Element is above viewport - fully blurred
            blurFactor = 1;
        } else if (elementTop > viewportHeight) {
            // Element is below viewport - fully blurred
            blurFactor = 1;
        } else {
            // Element is partially or fully in viewport
            // Calculate what percentage is visible
            const visibleTop = Math.max(0, elementTop);
            const visibleBottom = Math.min(viewportHeight, elementBottom);
            const visibleHeight = visibleBottom - visibleTop;
            const elementHeight = rect.height;
            
            // Normalize visibility (0 to 1, where 1 is fully visible)
            const visibilityPercent = Math.min(visibleHeight / viewportHeight, 1);
            
            // Convert to blur factor: 1 = blurry, 0 = sharp
            blurFactor = 1 - visibilityPercent;
        }
        
        // Apply blur: 0px when sharp, 12px when blurry
        const blurAmount = blurFactor * 12;
        const opacity = 0.7 + ((1 - blurFactor) * 0.3); // 0.7 to 1.0
        
        element.style.filter = `blur(${blurAmount}px)`;
        element.style.opacity = opacity;
    });
}

// Update blur on scroll
window.addEventListener('scroll', updateScrollBlur, { passive: true });

// Initial call to set blur state
updateScrollBlur();

// Testimonials Carousel Auto-Scroll
const testimonialsCarousel = document.querySelector('.testimonials-carousel');
if (testimonialsCarousel) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let scrollPosition = 0;
    let isAutoScrolling = true;

    const autoScroll = () => {
        if (!isAutoScrolling) return;
        
        scrollPosition += 2; // 2px per frame for smooth scrolling
        testimonialsCarousel.scrollLeft = scrollPosition;

        // Infinite loop - reset to start when reaching the end
        if (scrollPosition >= testimonialsCarousel.scrollWidth - testimonialsCarousel.clientWidth) {
            scrollPosition = 0;
            testimonialsCarousel.scrollLeft = 0;
        }
    };

    let animationId = requestAnimationFrame(function scroll() {
        autoScroll();
        animationId = requestAnimationFrame(scroll);
    });

    // Pause on hover
    testimonialsCarousel.addEventListener('mouseenter', () => {
        isAutoScrolling = false;
    });

    testimonialsCarousel.addEventListener('mouseleave', () => {
        isAutoScrolling = true;
    });

    // Pause on scroll interaction
    testimonialsCarousel.addEventListener('scroll', () => {
        isAutoScrolling = false;
        clearTimeout(testimonialsCarousel.scrollTimeout);
        testimonialsCarousel.scrollTimeout = setTimeout(() => {
            isAutoScrolling = true;
        }, 3000); // Resume after 3 seconds of no interaction
    });
}

// Calendar Booking Modal
const bookSessionBtn = document.getElementById('book-session-btn');
const calendarModal = document.getElementById('calendar-modal');
const calendarCloseBtn = document.getElementById('calendar-close-btn');
const calendarOverlay = document.querySelector('.calendar-overlay');
const calendarPrev = document.getElementById('calendar-prev');
const calendarNext = document.getElementById('calendar-next');
const calendarDates = document.getElementById('calendar-dates');
const calendarMonth = document.getElementById('calendar-month');
const selectedDateDisplay = document.getElementById('selected-date');
const confirmBookingBtn = document.getElementById('confirm-booking');

let currentDate = new Date();
let selectedDate = null;

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    calendarMonth.textContent = `${monthNames[month]} ${year}`;
    calendarDates.innerHTML = '';
    
    // First day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-date disabled';
        calendarDates.appendChild(emptyCell);
    }
    
    // Date cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dateBtn = document.createElement('button');
        dateBtn.className = 'calendar-date';
        dateBtn.textContent = day;
        
        const cellDate = new Date(year, month, day);
        
        // Disable past dates
        if (cellDate < new Date()) {
            dateBtn.classList.add('disabled');
            dateBtn.disabled = true;
        } else {
            dateBtn.addEventListener('click', () => {
                document.querySelectorAll('.calendar-date.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                dateBtn.classList.add('selected');
                selectedDate = cellDate;
                selectedDateDisplay.textContent = cellDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
            });
        }
        
        calendarDates.appendChild(dateBtn);
    }
}

function openCalendar() {
    calendarModal.classList.add('active');
    calendarModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderCalendar();
}

function closeCalendar() {
    calendarModal.classList.remove('active');
    calendarModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    selectedDate = null;
    selectedDateDisplay.textContent = 'No date selected';
}

bookSessionBtn.addEventListener('click', openCalendar);
calendarCloseBtn.addEventListener('click', closeCalendar);
calendarOverlay.addEventListener('click', closeCalendar);
calendarPrev.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
calendarNext.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});
confirmBookingBtn.addEventListener('click', () => {
    if (selectedDate) {
        alert(`Booking confirmed for ${selectedDate.toLocaleDateString()}. Thank you!`);
        closeCalendar();
    } else {
        alert('Please select a date first.');
    }
});

// Navbar Hide/Reveal on Scroll with Fade
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
let scrollDirection = 'up';

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determine scroll direction
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling DOWN - hide navbar
        scrollDirection = 'down';
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScrollTop) {
        // Scrolling UP - show navbar
        scrollDirection = 'up';
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


