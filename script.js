const images = [
  "494360167_662537506666354_2332739005679333350_n.png",
  "Bathtub.jpg",
  "bedside.jpg",
  "kitchen.jpg",
  "kitchen2.jpg",
  "shelving.jpg",
  "Shower.jpg",
  "Spare-Room.jpg",
  "Stairs.jpg",
  "toilet.jpg",
  "Window.jpg",
  "Wondow2.jpg",
  "Zoomed-bedroom.jpg"
];

let currentIndex = 0;
let autoRotateInterval;

// Update the main image and highlight the active thumbnail
function updateMainImage(index) {
  const img = document.getElementById("main-image");
  img.style.opacity = 0;
  setTimeout(() => {
    currentIndex = index;
    img.src = images[currentIndex];
    img.style.opacity = 1;
    updateActiveThumbnail();
    startAutoRotate();
  }, 500);
}

// Navigate to the next image
function nextImage() {
  updateMainImage((currentIndex + 1) % images.length);
}

// Navigate to the previous image
function prevImage() {
  updateMainImage((currentIndex - 1 + images.length) % images.length);
}

// Auto-rotate function
function rotateNextImage() {
  updateMainImage((currentIndex + 1) % images.length);
}

// Start the auto-rotation timer
function startAutoRotate() {
  clearInterval(autoRotateInterval);
  autoRotateInterval = setInterval(rotateNextImage, 5000);
}

// Pause the auto-rotation timer
function pauseAutoRotate() {
  clearInterval(autoRotateInterval);
}

// Highlight the active thumbnail
function updateActiveThumbnail() {
  document.querySelectorAll(".thumbnail").forEach((thumb, i) => {
    thumb.classList.toggle("active-thumbnail", i === currentIndex);
  });
}

// Render all thumbnails and assign click events
function renderThumbnails() {
  const container = document.getElementById("thumbnail-container");
  images.forEach((src, index) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.classList.add("thumbnail");
    thumb.addEventListener("click", () => updateMainImage(index));
    container.appendChild(thumb);
  });
  updateActiveThumbnail();
}

// Set up event listeners once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  renderThumbnails();
  startAutoRotate();

  const mainContentImage = document.getElementById("main-content-image");
  let touchstartX = 0;
  let touchendX = 0;

  mainContentImage.addEventListener("touchstart", function (event) {
    touchstartX = event.changedTouches[0].screenX;
  });

  mainContentImage.addEventListener("touchend", function (event) {
    touchendX = event.changedTouches[0].screenX;
    if (touchendX < touchstartX - 50) {
      nextImage();
    } else if (touchendX > touchstartX + 50) {
      prevImage();
    }
  });
});
