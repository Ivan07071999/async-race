function clearCarsContainer(): void {
  const clearedCarsContainer =
    document.querySelector<HTMLDivElement>('.form-car')!;

  while (clearedCarsContainer.firstChild) {
    clearedCarsContainer.removeChild(clearedCarsContainer.firstChild);
  }
}

export default clearCarsContainer;
