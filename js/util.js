const main = document.getElementsByTagName('main')[0];
setTimeout(() => {
  main.classList.remove('opacity-0');
});

function setLocationHref(url) {
  main.classList.add('opacity-0');
  setTimeout(() => {
    location.href = url;
  }, 150);
}

/**
 * @param {[key: string]: boolean} formState
 */
function createAttachInputValidator(formState) {
  /**
   * @param {HTMLInputElement} elem
   * @param {(value: string, label?: string) => string} validator
   * @param {HTMLElement} errorDisplay
   */
  function attachInputValidator(elem, validator, errorDisplay) {
    let label = elem.id.replaceAll('-', ' ');
    label = `${label.charAt(0).toUpperCase()}${label.slice(1)}`;

    const validate = () => {
      if (elem.value.trim() === '') {
        printError(`${label} is required!`, errorDisplay);
        formState[label] = false;
        return;
      }

      const msg = validator(elem.value, label);
      printError(msg, errorDisplay);
      formState[label] = msg.length === 0;
    };

    elem.addEventListener('input', validate);
    elem.addEventListener('blur', validate);
  }

  return attachInputValidator;
}

/**
 * @param {string} error
 * @param {HTMLElement} errorDisplay
 */
function printError(error, errorDisplay) {
  if (error.length === 0) {
    errorDisplay.classList.remove('max-h-6');
    errorDisplay.classList.add('max-h-0');
    errorDisplay.textContent = '';
  } else {
    errorDisplay.classList.add('max-h-6');
    errorDisplay.classList.remove('max-h-0');
    errorDisplay.textContent = error;
  }
}

export { main, setLocationHref, createAttachInputValidator, printError };
