async function loadFragment(id, filePath, callback) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await res.text();
    container.innerHTML = html;

    if (typeof callback === "function") callback(); // Run JS setup AFTER loading
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFragment('header-placeholder', '/global-html/header.html', initHeaderJS);
  loadFragment('footer-placeholder', '/global-html/footer.html');
});

function initHeaderJS() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
  }
}

