const setupIntro = (userState) => {
  const introModal = document.getElementById("intro-box-modal");
  const introButton = document.getElementById("about-button");

  const openIntro = () => {
    introModal.showModal();
    introModal.focus();
  };

  introButton.onclick = openIntro;

  introModal.addEventListener('click', (e) => {
    if (e.target === introModal) {
      introModal.close();
    }
  });

  introModal.addEventListener('close', () => {
    userState.intro = false;
  });

  openIntro();
};

export default setupIntro;
