import createCarForm from './createCarForm';

async function createGaragePage() {
  const garage = document.createElement('section');
  const head = document.createElement('h1');
  const subHead = document.createElement('h3');
  garage.className = 'garage';
  head.textContent = 'Garage(4)';
  subHead.textContent = 'Page #1';
  garage.appendChild(head);
  garage.appendChild(subHead);
  garage.appendChild(await createCarForm());
  return garage;
}

export default createGaragePage;
