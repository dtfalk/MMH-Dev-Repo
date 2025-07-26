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
  loadFragment('footer-placeholder', '/global-html/footer.html', initFooterJS);
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

