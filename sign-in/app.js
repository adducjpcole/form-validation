import { setLocationHref, createAttachInputValidator } from '../js/util.js';

const backBtn = document.getElementById('back');
backBtn.addEventListener('click', (ev) => {
  setLocationHref('/');
});

const form = document.getElementById('sign-in-form');
/**
 * @type {{[key: string]: boolean}}
 */
const formState = {};
const attachInputValidator = createAttachInputValidator(formState);

const inpEmail = document.getElementById('email');
const emailError = document.getElementById('email-error');

const inpPassword = document.getElementById('password');
const passwordError = document.getElementById('password-error');

attachInputValidator(
  inpEmail,
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format',
  emailError,
);

attachInputValidator(inpPassword, () => '', passwordError);

const genericModalElem = document.getElementById('generic-modal');
const genericModalMsg = document.getElementById('generic-modal__msg');
const genericModal = new Modal(genericModalElem, {
  backdrop: 'static',
  closable: true,
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (inpEmail.value === '' || inpPassword.value === '') {
    genericModalMsg.textContent = 'Please fill up the empty fields!';
    genericModal.show();
    return;
  }

  for (const key in formState) {
    if (!Object.hasOwn(formState, key)) continue;

    if (!formState[key]) {
      genericModalMsg.textContent = 'Please correct the invalid fields!';
      genericModal.show();
      return;
    }
  }

  genericModalMsg.textContent = 'Signed in!';
  genericModal.show();
});

document
  .getElementById('generic-modal__close-btn')
  .addEventListener('click', () => {
    genericModal.hide();
  });
