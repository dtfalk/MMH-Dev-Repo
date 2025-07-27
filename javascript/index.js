function loadVideoOrFallback() {
    const video = document.getElementById('hero-video');
    const fallback = document.getElementById('hero-fallback');

    function tryPlayVideo() {
      if (!video || !fallback) return;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            fallback.style.display = 'none'; // video autoplay worked
          })
          .catch(() => {
            video.style.display = 'none';    // fallback instead
            fallback.style.display = 'block';
          });
      } else {
        video.style.display = 'none';
        fallback.style.display = 'block';
      }
    }

    window.addEventListener('load', tryPlayVideo);
}

document.addEventListener('DOMContentLoaded', () => {loadVideoOrFallback();});
