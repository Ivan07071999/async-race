function startRace() {
  const startRaceButtons = document.querySelectorAll('.button-start');
  console.log(startRaceButtons);
  for (let i = 0; i < startRaceButtons.length; i += 1) {
    // startRaceButtons[i].click();
    (startRaceButtons[i] as HTMLElement).click();
  }
}

export default startRace;
