async function loadFragment(id, filePath, callback) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await res.text();
    container.innerHTML = html;

    if (typeof callback === "function") callback();
  } catch (err) {
    console.error(`Error loading fragment "${filePath}":`, err);
  }
}

function initHeaderJS() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

function initFooterJS() {
  const modal = document.getElementById('signup-modal');
  const openBtn = document.getElementById('signup-btn');
  const closeBtn = modal?.querySelector('.modal-close');

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {

  // Then load header and footer in order
  await loadFragment('header-placeholder', '/html-pages/header.html', initHeaderJS);
  await loadFragment('footer-placeholder', '/html-pages/footer.html', initFooterJS);

});
