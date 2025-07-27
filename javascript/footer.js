// Initializes modal logic for the footer sign-up form (supports multiple trigger buttons)
function initFooterJS() {
  // Get all potential trigger buttons (signup-btn and signup-btn-2)
  const openBtns = [
    document.getElementById('signup-btn'),
    document.getElementById('signup-btn-2')
  ].filter(Boolean); // remove any null entries if a button doesn't exist

  // Get the modal element that will be shown/hidden
  const modal = document.getElementById('questionnaire-modal');

  // If modal doesn't exist or no buttons were found, exit early
  if (!modal || openBtns.length === 0) return;

  // Look inside the modal for the close button element
  const closeBtn = modal.querySelector('.modal-close');

  // Loop through all trigger buttons and attach click event
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('show');
      document.body.classList.add('modal-open');
    });
  });

  // When the user clicks the close button inside the modal
  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  });

  // Allow clicking on the background overlay to close the modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
  });
}
