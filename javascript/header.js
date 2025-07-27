function setCurrentNavLink() {
  const normalizePath = (path) => {
    return path
      .toLowerCase()
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/index\.html$/, '');
  };

  const currentPath = normalizePath(window.location.pathname);
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http')) return;

    const linkPath = normalizePath(href);

    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
      console.log(`Set active nav: ${link.textContent}`);
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
function updateHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const currentPath = window.location.pathname;

  if (currentPath === '/' || currentPath.includes('index')) {
    
    // Home page logic
    const headerTitle = document.getElementById('header-title');
if (!headerTitle) return;

const headingTop = headerTitle.getBoundingClientRect().top;
const paddingPx = window.innerHeight * 0.3;
const visibleHeaderTop = headingTop + paddingPx;

const headerHeight = header.offsetHeight;
const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
const triggerPoint = headerHeight + 4 * remInPx;

if (visibleHeaderTop <= triggerPoint) {
  header.classList.add('solid');
} else {
  header.classList.remove('solid');
}


  } else if (currentPath.includes('/about')) {
    const aboutHeader = document.getElementById('about-header');
    if (!aboutHeader) return;
    
    const headingTop = aboutHeader.getBoundingClientRect().top;
    const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const triggerPoint = aboutHeader.offsetHeight + 3 * remInPx; // adjust this for when you want the header to turn solid

    if (headingTop < triggerPoint) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }

  } else if (currentPath.includes('tour')) {
    const tourHeading = document.getElementById('upcoming-shows-title');
    if (!tourHeading) return;

    const headingTop = tourHeading.getBoundingClientRect().top;
    const triggerPoint = 60; // adjust this for when you want the header to turn solid

    if (headingTop < triggerPoint) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }

  } else {
    // Default: solid header always
    header.classList.add('solid');
  }
}


function waitForHeaderAndRun() {
  const headerCheck = setInterval(() => {
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.main-nav a');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (header && navLinks && menuToggle && closeMenu && mobileMenu) {
      clearInterval(headerCheck);

      updateHeader();
      setCurrentNavLink();

      window.addEventListener('scroll', updateHeader);
      window.addEventListener('load', updateHeader);

      // Mobile menu toggle setup
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.classList.add('modal-open');
        
      });

      closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('modal-open');
        
      });
    }
  }, 50);
}


document.addEventListener('DOMContentLoaded', () => {waitForHeaderAndRun();});

