import type { FormType } from '../../types/garage';

function createFormElement(formClass: string): HTMLDivElement {
  const form = document.createElement('div');
  form.className = formClass;
  return form;
}

export function createForm(): FormType {
  const formTop = createFormElement('header-form-top');
  const formMiddle = createFormElement('header-form-middle');
  const formBottom = createFormElement('header-form-bottom');
  const footerForm = createFormElement('footer-form');

  return {
    headerTop: formTop,
    headerMiddle: formMiddle,
    headerBottom: formBottom,
    footerForm,
  };
}

export default createFormElement;
