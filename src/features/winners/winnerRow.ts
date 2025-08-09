export function createWinnerRow(): HTMLDivElement {
  const winnerRow: HTMLDivElement = document.createElement('div');
  winnerRow.className = 'row-winner';
  return winnerRow;
}

export function createRowElements(
  numberText: string,
  carText: string,
  nameText: string,
  winsText: string,
  bestTimeText: string
) {
  const winnerRow = createWinnerRow();

  const number: HTMLDivElement = document.createElement('div');
  number.className = 'winner-number';
  number.textContent = numberText;

  const car: HTMLDivElement = document.createElement('div');
  car.className = 'winner-car';
  car.textContent = carText;

  const name: HTMLDivElement = document.createElement('div');
  name.className = 'winner-name';
  name.textContent = nameText;

  const wins: HTMLDivElement = document.createElement('div');
  wins.className = 'winner-wins';
  wins.textContent = winsText;

  const bestTime: HTMLDivElement = document.createElement('div');
  bestTime.className = 'winner-time';
  bestTime.textContent = bestTimeText;

  winnerRow.appendChild(number);
  winnerRow.appendChild(car);
  winnerRow.appendChild(name);
  winnerRow.appendChild(wins);
  winnerRow.appendChild(bestTime);

  return winnerRow;
}
