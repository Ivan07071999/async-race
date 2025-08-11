import { removeGarageEvents } from './removeEventListener';

export function clearCarsContainer(): void {
  const clearedCarsContainer: HTMLDivElement | null =
    document.querySelector('.form-car');

  if (clearedCarsContainer) {
    while (clearedCarsContainer.firstChild) {
      removeGarageEvents();
      clearedCarsContainer.removeChild(clearedCarsContainer.firstChild);
    }
  }
}

export function clearHeads(): void {
  const head: HTMLElement | null = document.querySelector('h1');
  const subHead: HTMLElement | null = document.querySelector('h3');

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

export function clearWinnerTable(): void {
  const winnersTable: HTMLElement | null =
    document.querySelector('.winners-info');

  if (winnersTable) {
    while (winnersTable.firstChild) {
      winnersTable.removeChild(winnersTable.firstChild);
    }
  }
}
