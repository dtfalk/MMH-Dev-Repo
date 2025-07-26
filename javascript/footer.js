function initFooterJS() {
  const openBtn = document.getElementById('signup-btn');
  const modal = document.getElementById('questionnaire-modal');

  if (!modal || !openBtn) return;

  const closeBtn = modal.querySelector('.modal-close');

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  });
}
