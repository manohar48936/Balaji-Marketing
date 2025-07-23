// JS for mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


// ----------------------
// Image Modal functionality
// ----------------------
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.project-card img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// ----------------------
// Smooth scrolling for anchor links
// ----------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// ----------------------
// Animate on scroll
// ----------------------
const animateElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(element => observer.observe(element));

// ----------------------
// Header scroll effect
// ----------------------
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-lg', 'py-2');
    } else {
        header.classList.remove('shadow-lg', 'py-2');
    }
});

// ----------------------
// Project Filter + Load More
// ----------------------
// View More Button
const viewMoreBtn = document.getElementById('view-more-btn');
const hiddenProjectsSection = document.querySelector('.hidden-projects');

if (viewMoreBtn && hiddenProjectsSection) {
    viewMoreBtn.addEventListener('click', () => {
        hiddenProjectsSection.classList.remove('hidden');
        viewMoreBtn.style.display = 'none';
        // Reset Load More for newly revealed projects
        initLoadMore();
    });
}

// Load More Button
const loadMoreBtn = document.getElementById('load-more-btn');
let activeCategory = 'all';
let projectsToShow = 6;
let currentIndex = 0;

function getVisibleProjects() {
    return Array.from(document.querySelectorAll('.project-card'))
        .filter(card => {
            const category = card.getAttribute('data-category');
            return activeCategory === 'all' || category === activeCategory;
        });
}

function showProjects() {
    const visibleCards = getVisibleProjects();
    const hiddenCards = visibleCards.filter(card => card.classList.contains('hidden'));

    hiddenCards.slice(0, projectsToShow).forEach(card => {
        card.classList.remove('hidden');
        card.style.display = 'block';
    });

    currentIndex += projectsToShow;
    if (currentIndex >= visibleCards.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

function initLoadMore() {
    // Hide all first except first 6
    const visibleCards = getVisibleProjects();
    visibleCards.forEach((card, index) => {
        if (index < projectsToShow) {
            card.classList.remove('hidden');
            card.style.display = 'block';
        } else {
            card.classList.add('hidden');
        }
    });
    currentIndex = projectsToShow;
    loadMoreBtn.style.display = visibleCards.length > currentIndex ? 'inline-block' : 'none';
}

// Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        activeCategory = button.getAttribute('data-category');
        currentIndex = 0;

        document.querySelectorAll('.project-card').forEach(card => {
            const category = card.getAttribute('data-category');
            if (activeCategory === 'all' || category === activeCategory) {
                card.style.display = 'block';
                card.classList.add('hidden');
            } else {
                card.style.display = 'none';
                card.classList.remove('hidden');
            }
        });

        showProjects();
    });
});

loadMoreBtn.addEventListener('click', showProjects);

// Initial Setup
initLoadMore();



// // ----------------------
// // Optional: View More Section (if you're keeping it)
// // ----------------------
// const viewMoreBtn = document.getElementById('view-more-btn');
// const hiddenProjectsSection = document.querySelector('.hidden-projects');

// if (viewMoreBtn) {
//     viewMoreBtn.addEventListener('click', () => {
//         hiddenProjectsSection.classList.remove('hidden');
//         viewMoreBtn.style.display = 'none';
//     });
// }
