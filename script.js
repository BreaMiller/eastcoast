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

// Navbar and Alert Bar Hide on Scroll Down, Show on Scroll Up
const navbar = document.querySelector('.navbar');
const alertBar = document.querySelector('.alert-bar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Update navbar background
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    // Hide navbar and alert bar when scrolling down, show when scrolling up
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.classList.add('hidden');
        if (alertBar) alertBar.classList.add('hidden');
    } else if (currentScroll < lastScroll) {
        // Scrolling up
        navbar.classList.remove('hidden');
        if (alertBar) alertBar.classList.remove('hidden');
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
    // Store original items
    const originalItems = Array.from(carousel.querySelectorAll('.carousel-item'));
    const itemCount = originalItems.length;
    
    if (itemCount > 0) {
        // Get dimensions
        const getItemWidth = () => {
            const item = carousel.querySelector('.carousel-item');
            return item ? item.offsetWidth + 40 : 0; // 40px gap
        };
        
        const itemWidth = getItemWidth();
        
        // Clear and rebuild carousel with infinite clones
        carousel.innerHTML = '';
        
        // Create 5 sets of items for infinite scroll buffer
        for (let set = 0; set < 5; set++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                carousel.appendChild(clone);
            });
        }
        
        // Blur effect function
        const updateCarouselBlur = () => {
            const carouselRect = carousel.getBoundingClientRect();
            const carouselCenter = carouselRect.left + carouselRect.width / 2;
            
            carousel.querySelectorAll('.carousel-item').forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + itemRect.width / 2;
                const distance = Math.abs(carouselCenter - itemCenter);
                const maxDistance = carouselRect.width / 2;
                const blurAmount = (distance / maxDistance) * 8;
                
                const card = item.querySelector('.service-card');
                if (card) {
                    card.style.filter = blurAmount > 1 ? `blur(${blurAmount}px)` : 'blur(0px)';
                }
            });
        };
        
        // Auto-scroll with infinite loop detection
        let isAutoScrolling = true;
        const oneSetWidth = itemWidth * itemCount;
        let targetScroll = oneSetWidth * 2;
        
        // Start in the middle
        carousel.scrollLeft = targetScroll;
        
        // Continuous auto-scroll function
        const autoScroll = () => {
            if (isAutoScrolling) {
                targetScroll += 2.5;
                carousel.scrollLeft = targetScroll;
                
                // Reset to middle when reaching the end
                if (targetScroll >= oneSetWidth * 3.5) {
                    targetScroll = oneSetWidth * 1.5;
                    carousel.scrollLeft = targetScroll;
                }
            }
            requestAnimationFrame(autoScroll);
        };
        
        // Start the auto-scroll
        autoScroll();
        
        // Pause on mouse interaction
        carousel.addEventListener('mouseenter', () => {
            isAutoScrolling = false;
        });
        
        // Resume on mouse leave
        carousel.addEventListener('mouseleave', () => {
            isAutoScrolling = true;
        });
        
        // Pause on touch
        carousel.addEventListener('touchstart', () => {
            isAutoScrolling = false;
        });
        
        carousel.addEventListener('touchend', () => {
            setTimeout(() => {
                isAutoScrolling = true;
            }, 2000);
        });
        
        // Update blur on scroll
        carousel.addEventListener('scroll', updateCarouselBlur, { passive: true });
        setTimeout(updateCarouselBlur, 100);
    }
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

// Scroll Blur Reveal Animation - Sections fade in from blur as they enter viewport
class ScrollBlurReveal {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-blur');
        this.minBlur = 0;      // px blur when fully visible
        this.maxBlur = 12;     // px blur when out of view
        this.minOpacity = 0.6; // opacity when out of view
        this.maxOpacity = 1.0; // opacity when fully visible
        this.init();
    }

    init() {
        // Use IntersectionObserver for better performance
        this.observeElements();
        // Also listen to scroll events for real-time updates
        window.addEventListener('scroll', () => this.updateAll(), { passive: true });
        this.updateAll();
    }

    observeElements() {
        // Create intersection observer to detect when elements enter viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is in viewport
                    this.update(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '50px'
        });

        this.elements.forEach(el => observer.observe(el));
    }

    calculateVisibility(element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if completely out of view
        if (rect.bottom < 0 || rect.top > viewportHeight) {
            return 0; // Not visible at all
        }

        // Calculate how much of element is in viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = visibleBottom - visibleTop;
        
        // Return visibility as 0-1 (0 = not visible, 1 = fully visible in viewport)
        return Math.min(1, visibleHeight / viewportHeight);
    }

    update(element) {
        const visibility = this.calculateVisibility(element);
        
        // Linear interpolation for blur
        const blur = this.maxBlur - (visibility * (this.maxBlur - this.minBlur));
        
        // Linear interpolation for opacity
        const opacity = this.minOpacity + (visibility * (this.maxOpacity - this.minOpacity));
        
        // Apply effects
        element.style.filter = `blur(${blur}px)`;
        element.style.opacity = opacity;
    }

    updateAll() {
        this.elements.forEach(element => this.update(element));
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollBlurReveal();
    });
} else {
    new ScrollBlurReveal();
}

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


