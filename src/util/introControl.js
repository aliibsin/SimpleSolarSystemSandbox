const setupIntro = () => {
    const introModal = document.getElementById("intro-box-modal");
  const introButton = document.getElementById("about-button");

  introButton.onclick = () => {
    introModal.style.display = "block";
  };

  window.onclick = (e) => {
    if (e.target === introModal) {
      introModal.style.display = "none";
    };
  };
};

export default setupIntro;
