const setupIntro = (userState) => {
  const introModal = document.getElementById("intro-box-modal");
  const introButton = document.getElementById("about-button");

  introButton.onclick = () => {
    introModal.style.display = "block";
  };

  window.onclick = (e) => {
    e.stopPropagation();
    if (e.target === introModal) {
      introModal.style.display = "none";
      userState.intro = false;
    };
  };
};

export default setupIntro;
