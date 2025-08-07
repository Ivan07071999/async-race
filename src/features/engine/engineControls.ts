export function startRace(selector: string) {
  const startRaceButtons = document.querySelectorAll(`.${selector}`);

  const clickPromises = Array.from(startRaceButtons).map(button => {
    return new Promise<void>(resolve => {
      (button as HTMLElement).click();
      resolve();
    });
  });

  Promise.all(clickPromises).then(() => {
    console.log('Все кнопки нажаты одновременно');
  });
}

export default startRace;
