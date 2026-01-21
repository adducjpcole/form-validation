import { setLocationHref } from '/js/util.js';

const signInBtn = document.getElementById('sign-in');
const signUpBtn = document.getElementById('sign-up');

signInBtn.addEventListener('click', () => {
  setLocationHref('/sign-in/');
});

signUpBtn.addEventListener('click', () => {
  setLocationHref('/sign-up/');
});
