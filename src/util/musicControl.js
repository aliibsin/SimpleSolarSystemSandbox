const setupMusic = () => {
  const playMusic = document.getElementById("music-button");
  const musicPlayer = document.getElementById("music");

  musicPlayer.volume = 0.1;

  playMusic.onclick = () => {
    if (musicPlayer.paused) {
      musicPlayer.play();
      playMusic.classList.add("music-on");
    } else {
      musicPlayer.pause();
      playMusic.classList.remove("music-on");
    }
  }
}

export default setupMusic;
