function clearCarsContainer(): void {
  const clearedCarsContainer =
    document.querySelector<HTMLDivElement>('.form-car')!;

  while (clearedCarsContainer.firstChild) {
    clearedCarsContainer.removeChild(clearedCarsContainer.firstChild);
  }
}

export default clearCarsContainer;

export function clearHeads() {
  const head = document.querySelector<HTMLElement>('h1');
  const subHead = document.querySelector<HTMLElement>('h3');

  if (head && subHead) {
    const isHeadHidden = window.getComputedStyle(head).display === 'none';
    const isSubHeadHidden = window.getComputedStyle(subHead).display === 'none';
    head.style.display = 'none';
    subHead.style.display = 'none';
    if (isHeadHidden || isSubHeadHidden) {
      head.style.display = 'block';
      subHead.style.display = 'block';
    }
  }
}

export function clearWinnerTable() {
  const winnersTable = document.querySelector('.winners-info');

  if (winnersTable) {
    while (winnersTable.firstChild) {
      winnersTable.removeChild(winnersTable.firstChild);
    }
  }
}
