// Function controlling how the header goes from transparent to solid/translucent colors
function updateHeader() {
    const header = document.querySelector('.site-header');
    const heroButtons = document.getElementById('hero-buttons');

    const heroButtonsTop = heroButtons.getBoundingClientRect().top;
    const paddingVH = 40;
    const paddingPx = window.innerHeight * (paddingVH / 100);
    const visibleButtonTop = heroButtonsTop + paddingPx;

    const headerHeight = header.offsetHeight;
    const buffer = 20;
    const triggerPoint = headerHeight + buffer;

    if (visibleButtonTop <= triggerPoint) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    toggleBtn.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
});
window.addEventListener('scroll', updateHeader);
window.addEventListener('load', updateHeader);