// Attempts to autoplay a hero video on page load. If autoplay fails (due to browser restrictions),
// it gracefully falls back to showing a static image.
function loadVideoOrFallback() {

  // Grab references to the video and fallback image elements
  const video = document.getElementById('hero-video');
  const fallback = document.getElementById('hero-fallback');

  // Inner function to attempt video playback
  function tryPlayVideo() {
    // Exit if either the video or fallback image is missing
    if (!video || !fallback) return;

    // Attempt to play the video
    const playPromise = video.play();

    // If play() returns a promise (modern browsers)
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video played successfully, so we hide the fallback image
          fallback.style.display = 'none';
        })
        .catch(() => {
          // Autoplay failed (likely due to browser policy), so fallback image is shown instead
          video.style.display = 'none';
          fallback.style.display = 'block';
        });
    } else {
      // Fallback for older browsers or edge cases where playPromise is undefined
      video.style.display = 'none';
      fallback.style.display = 'block';
    }
  }

  // Once the full page (including media) has loaded, attempt to play the video
  window.addEventListener('load', tryPlayVideo);
}

// Adds image zoom on click for merch and tour poster images
function enableImageZoom() {
  const zoomableImages = document.querySelectorAll('.merch-item img, .shows-images img');

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,0.8);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;
  document.body.appendChild(overlay);

  const expandedImg = document.createElement('img');
  expandedImg.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0 0 40px rgba(0,0,0,0.6);
  `;
  overlay.appendChild(expandedImg);

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  zoomableImages.forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      expandedImg.src = img.src;
      overlay.style.display = 'flex';
    });
  });
}

// Run everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadVideoOrFallback();
  enableImageZoom(); // ← Your zoom function gets invoked here
});
