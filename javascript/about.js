function enableBandBioModals() {
  // Define bios and image paths
  const bios = {
    "Sam Seiff": {
      text: "Hailing from Las Vegas, Sam loves The Beatles, novels by Sarah J. Maas, and catching hot plays on and off Broadway. She hates the heat and being told she needs to get her driver's license.",
      img: "/media-content/about-media/sam-seiff.jpg"
    },
    "Nick Sare": {
      text: "A born-and-raised New Yorker who loves tending to his apartment plants, daydreaming about retiring in Croatia, and scouring the city for spaghetti pomodoro.",
      img: "/media-content/about-media/nick_sare.jpg"
    },
    "Stephen Park": {
      text: "New Jersey. Need we say more? He once took the train to New York and back in two sittings (uphill both ways). You can find him on LinkedIn by searching “Stephen Park”.",
      img: "/media-content/about-media/stephen-park.jpg"
    },
    "Aidan Speckhard": {
      text: "A big and strong Minnesotan who loves Yussef Dayes, chickpeas, and his AMC Stubs membership. Also, he may have left his drumsticks at your place—mind checking?",
      img: "/media-content/about-media/aidan-speckhard.jpg"
    },
    "Ryan Daar": {
      text: "Since departing from the womb at Cedar's-Sinai Medical Center in Los Angeles, he has acquired six languages and a taste for peaty scotch (who can blame him?). His favorite activities include goofing, bamboozling, interpreting dreams, and talking about how much his novel is going to suck (we take him at his word).",
      img: "/media-content/about-media/ryan-daar.jpg"
    }
  };

  // Create modal container
  const modal = document.createElement('div');
  modal.id = 'bio-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    display: none;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.8);
    z-index: 9999;
    padding: 1rem;
  `;

  // Inner content box
  const contentBox = document.createElement('div');
  contentBox.style.cssText = `
    background: #beebfeff;
    color: #000;
    max-width: 500px;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    position: relative;
  `;

  const closeBtn = document.createElement('span');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    font-size: 2rem;
    cursor: pointer;
  `;

  const imgEl = document.createElement('img');
  imgEl.style.cssText = `
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  `;

  const nameEl = document.createElement('h2');
  const bioEl = document.createElement('p');

  contentBox.appendChild(closeBtn);
  contentBox.appendChild(imgEl);
  contentBox.appendChild(nameEl);
  contentBox.appendChild(bioEl);
  modal.appendChild(contentBox);
  document.body.appendChild(modal);

  // Close on X or background click
  closeBtn.onclick = () => modal.style.display = 'none';
  modal.onclick = e => {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Click handler for each band member
  const members = document.querySelectorAll('.band-member');

  members.forEach(member => {
    const name = member.querySelector('.band-member-name')?.textContent?.trim();
    if (!bios[name]) return;

    member.style.cursor = 'pointer'; // visually indicate clickable

    member.addEventListener('click', () => {
      nameEl.textContent = name;
      bioEl.textContent = bios[name].text;
      imgEl.src = bios[name].img;
      imgEl.alt = name;
      modal.style.display = 'flex';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  enableBandBioModals();
});