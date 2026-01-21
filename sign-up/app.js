import { setLocationHref, createAttachInputValidator } from '../js/util.js';

const backBtn = document.getElementById('back');
backBtn.addEventListener('click', (ev) => {
  setLocationHref('/');
});

const form = document.getElementById('sign-up-form');
/**
 * @type {{[key: string]: boolean}}
 */
const formState = {};
const attachInputValidator = createAttachInputValidator(formState);

const inpEmail = document.getElementById('email');
const emailError = document.getElementById('email-error');

const inpPhoneNumber = document.getElementById('phone-number');
const phoneNumberError = document.getElementById('phone-number-error');

const inpPassword = document.getElementById('password');
const passwordError = document.getElementById('password-error');

attachInputValidator(
  inpEmail,
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format',
  emailError,
);

attachInputValidator(
  inpPhoneNumber,
  (value) =>
    /^(0?\d{2,3}|(\+63\d{2,3}))\d{7}$|^(?:\+63|0)9\d{9}$/.test(value)
      ? ''
      : 'Invalid phone number format',
  phoneNumberError,
);

attachInputValidator(
  inpPassword,
  (value) => {
    if (value.length < 8) {
      return 'Password must have at least 8 characters';
    } else if (!/\d/.test(value)) {
      return 'Password must have at least one digit';
    }

    return '';
  },
  passwordError,
);

const genericModalElem = document.getElementById('generic-modal');
const genericModalMsg = document.getElementById('generic-modal__msg');
const genericModal = new Modal(genericModalElem, {
  backdrop: 'static',
  closable: true,
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (
    inpEmail.value === '' ||
    inpPhoneNumber.value === '' ||
    inpPassword.value === ''
  ) {
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

  genericModalMsg.textContent = 'Signed up!';
  genericModal.show();
});

document
  .getElementById('generic-modal__close-btn')
  .addEventListener('click', () => {
    genericModal.hide();
  });
