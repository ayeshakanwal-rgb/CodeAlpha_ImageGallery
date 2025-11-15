let galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;
let currentVisibleItems = [...galleryItems];

// Open lightbox
function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'block';
    lightboxImg.src = currentVisibleItems[currentIndex].src;
}

// Attach click to all gallery images
function attachClickEvents() {
    currentVisibleItems.forEach((img, index) => {
        img.onclick = () => openLightbox(index);
    });
}

attachClickEvents();

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Next image
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentVisibleItems.length;
    lightboxImg.src = currentVisibleItems[currentIndex].src;
});

// Previous image
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    lightboxImg.src = currentVisibleItems[currentIndex].src;
});

// Close lightbox on outside click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Filter function
function filterImages(category) {
    const items = document.querySelectorAll('.gallery-item');
    currentVisibleItems = [];
    items.forEach(item => {
        if(category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            currentVisibleItems.push(item.querySelector('img'));
        } else {
            item.style.display = 'none';
        }
    });
    attachClickEvents(); // reattach click events after filtering
}
