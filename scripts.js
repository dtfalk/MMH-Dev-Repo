document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    toggleBtn.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
  });
