// Highlights the current navigation link in the menu
function setCurrentNavLink() {
  // Normalizes a URL path (removes slashes and converts to lowercase)
  const normalizePath = (path) => {
    return path
      .toLowerCase()
      .replace(/^\/+/, '')        // Remove leading slashes
      .replace(/\/+$/, '')        // Remove trailing slashes
      .replace(/index\.html$/, ''); // Remove 'index.html' if present
  };

  const currentPath = normalizePath(window.location.pathname);
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http')) return; // Skip external links

    const linkPath = normalizePath(href);

    // Add aria-current to active link for accessibility
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
      console.log(`Set active nav: ${link.textContent}`);
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Updates the header appearance based on scroll and current page
function updateHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const currentPath = window.location.pathname;

  if (currentPath === '/' || currentPath.includes('index')) {
    // Logic for homepage header behavior
    const headerTitle = document.getElementById('header-title');
    if (!headerTitle) return;

    // Calculate how far from the top the title is + a padding offset
    const headingTop = headerTitle.getBoundingClientRect().top;
    const paddingPx = window.innerHeight * 0.3;
    const visibleHeaderTop = headingTop + paddingPx;

    // Determine the scroll threshold to make the header solid
    const headerHeight = header.offsetHeight;
    const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const triggerPoint = headerHeight + 4 * remInPx;

    // Add or remove 'solid' class based on scroll position
    if (visibleHeaderTop <= triggerPoint) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }

  } else if (currentPath.includes('/about')) {
    // Logic for the /about page
    const aboutHeader = document.getElementById('about-header');
    if (!aboutHeader) return;

    const headingTop = aboutHeader.getBoundingClientRect().top;
    const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const triggerPoint = aboutHeader.offsetHeight + 3 * remInPx;

    if (headingTop < triggerPoint) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }

  } else if (currentPath.includes('tour')) {
    // Logic for the /tour page
    const tourHeading = document.getElementById('upcoming-shows-title');
    if (!tourHeading) return;

    const headingTop = tourHeading.getBoundingClientRect().top;
    const triggerPoint = 60;

    if (headingTop < triggerPoint) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }

  } else {
    // Default behavior for all other pages: always solid
    header.classList.add('solid');
  }
}

// Waits until all necessary elements exist, then runs logic
function waitForHeaderAndRun() {
  const headerCheck = setInterval(() => {
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.main-nav a');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.getElementById('mobileMenu');

    // Only run setup once all critical elements are present
    if (header && navLinks && menuToggle && closeMenu && mobileMenu) {
      clearInterval(headerCheck);

      // Initialize header state and nav link highlighting
      updateHeader();
      setCurrentNavLink();

      // Recheck header state on scroll and load
      window.addEventListener('scroll', updateHeader);
      window.addEventListener('load', updateHeader);

      // Open mobile menu
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.classList.add('modal-open');
      });

      // Close mobile menu
      closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('modal-open');
      });
    }
  }, 50); // Check every 50ms until elements are ready
}

// Run initialization after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  waitForHeaderAndRun();
});
