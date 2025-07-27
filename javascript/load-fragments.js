// Asynchronously loads an HTML fragment into a specified element by ID
// filePath: URL of the fragment file (e.g., "/html-pages/header.html")
// callback: optional function to run once the fragment is successfully loaded
async function loadFragment(id, filePath, callback) {
  const container = document.getElementById(id);
  if (!container) return; // Stop if the container element doesn't exist

  try {
    const res = await fetch(filePath); // Request the HTML fragment
    if (!res.ok) throw new Error(`Failed to load ${filePath}`); // If the response fails, throw an error

    const html = await res.text(); // Convert response into plain HTML text
    container.innerHTML = html; // Inject the HTML into the target element

    if (typeof callback === "function") callback(); // Run the callback (e.g., setup event listeners)
  } catch (err) {
    // Log any errors encountered during fetch or parsing
    console.error(`Error loading fragment "${filePath}":`, err);
  }
}

// Initializes functionality for the site header (mobile nav toggle)
function initHeaderJS() {
  const toggleBtn = document.querySelector('.menu-toggle'); // Hamburger menu button
  const nav = document.querySelector('.main-nav'); // The navigation menu

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      // Toggle the "active" class to show or hide the menu
      nav.classList.toggle('active');
    });
  }
}

// Initializes functionality for the footer (modal sign-up form)
function initFooterJS() {
  const modal = document.getElementById('signup-modal'); // The modal container
  const openBtn = document.getElementById('signup-btn'); // Button to open the modal
  const closeBtn = modal?.querySelector('.modal-close'); // Button inside the modal to close it

  // Only proceed if all required elements are found
  if (!modal || !openBtn || !closeBtn) return;

  // When the "Sign Up" button is clicked, show the modal
  openBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link/button behavior
    modal.classList.remove('hidden'); // Show the modal
  });

  // When the close button is clicked, hide the modal
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // If the user clicks outside the modal content (on the backdrop), hide the modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

// Run once the entire DOM is loaded and parsed
document.addEventListener('DOMContentLoaded', async () => {
  // Load the header fragment and initialize header JS once it’s injected
  await loadFragment('header-placeholder', '/html-pages/header.html', initHeaderJS);

  // Then load the footer fragment and initialize footer JS
  await loadFragment('footer-placeholder', '/html-pages/footer.html', initFooterJS);
});
