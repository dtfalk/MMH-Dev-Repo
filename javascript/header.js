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
    const heroButtons = document.getElementById('hero-buttons');
    if (!heroButtons) return;

    const heroButtonsTop = heroButtons.getBoundingClientRect().top;
    const paddingPx = window.innerHeight * 0.4;
    const visibleButtonTop = heroButtonsTop + paddingPx;

    const headerHeight = header.offsetHeight;
    const triggerPoint = headerHeight + 20;

    if (visibleButtonTop <= triggerPoint) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }

  } else if (currentPath.includes('/about')) {
    // Example logic for /about page
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

    if (header) {
      clearInterval(headerCheck);
      updateHeader();
      setCurrentNavLink();

      const isHome = window.location.pathname === '/' || window.location.pathname.includes('index');
      window.addEventListener('scroll', updateHeader);
      window.addEventListener('load', updateHeader);
      
    }
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {waitForHeaderAndRun();});
// document.addEventListener('DOMContentLoaded', () => {
//   const normalizePath = (path) => {
//     return path
//       .toLowerCase()
//       .replace(/^\/+/, '')           // remove leading slash
//       .replace(/\/+$/, '')           // remove trailing slash
//       .replace(/index\.html$/, '');  // treat index.html as root
//   };

//   const currentPath = normalizePath(window.location.pathname);

//   const navLinks = document.querySelectorAll('.main-nav a');

//   navLinks.forEach(link => {
//     const href = link.getAttribute('href');
//     if (!href || href.startsWith('http')) return;

//     const linkPath = normalizePath(href);

//     if (linkPath === currentPath) {
//       link.setAttribute('aria-current', 'page');
//     } else {
//       link.removeAttribute('aria-current');
//     }
//   });
// });
