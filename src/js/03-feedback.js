import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const formData = {
    email: inputRef.value,
    message: textareaRef.value,
  };

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function cheksStorage() {
  const saveData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (saveData) {
    inputRef.value = saveData.email;
    textareaRef.value = saveData.message;
  } else {
    inputRef.value = '';
    textareaRef.value = '';
  }
}

cheksStorage();

function onFormSubmit(evt) {
  evt.preventDefault();

  console.dir(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
