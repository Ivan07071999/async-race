import createHeader from './components/layout/header';
import { createHeaderButtons } from './components/ui/button';
import createFooter from './components/layout/footer';
import { createForm } from './components/ui/form';
import { createLabelAndInput } from './components/ui/input';
import createGaragePage from './features/garage/garagePage';
import {
  disabledNextButton,
  disabledPreviewButton,
  disableGarageButton,
  disableWinnersButton,
  enabledNextButton,
} from './utils/disableButtons';
import getCars, { type ICar } from './store/garage/garageThunks';

const container = document.querySelector('#app');
const header = createHeader();
const footer = createFooter();
const buttons = createHeaderButtons();
const form = createForm();
const createLabelAndInputElement = createLabelAndInput();
const GARAGE = createGaragePage();
const numberCar = await getCars<ICar[]>();

async function appendTo(): Promise<void> {
  container?.appendChild(header);
  container?.appendChild(await GARAGE);
  container?.appendChild(footer);
  header.appendChild(form.headerTop);
  header.appendChild(form.headerMiddle);
  header.appendChild(form.headerBottom);
  footer.appendChild(form.footerForm);

  form.headerTop.appendChild(buttons.garage);
  form.headerTop.appendChild(buttons.winners);

  form.headerMiddle.appendChild(createLabelAndInputElement.createInput);
  form.headerMiddle.appendChild(createLabelAndInputElement.createLabel);
  form.headerMiddle.appendChild(buttons.create);
  form.headerMiddle.appendChild(createLabelAndInputElement.updateInput);
  form.headerMiddle.appendChild(createLabelAndInputElement.updateLabel);
  form.headerMiddle.appendChild(buttons.update);

  form.headerBottom.appendChild(buttons.race);
  form.headerBottom.appendChild(buttons.reset);
  form.headerBottom.appendChild(buttons.generate);

  form.footerForm.appendChild(buttons.prev);
  form.footerForm.appendChild(buttons.next);
  disabledNextButton();
  disabledPreviewButton();
  disableWinnersButton();
  disableGarageButton();
  if (numberCar.length > 7) {
    enabledNextButton();
  }
}

export default appendTo;
