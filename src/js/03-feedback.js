import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const checkLocalStorage = key => {
    return !!localStorage.getItem(key);
  };
  
  const fillTheFieldsFromLocalStorage = (el, localStorageKey) => {
    if (!checkLocalStorage(localStorageKey)) return;
  
    const objFromStorage = JSON.parse(localStorage.getItem(localStorageKey));
  
    for (const key in objFromStorage) {
      if (Object.hasOwnProperty.call(objFromStorage, key)) {
        el.elements[key].value = objFromStorage[key];
      }
    }
  };
  
  const onInput = (evt, objFromStorage = {}) => {
    const key = 'feedback-form-state';
  
    if (checkLocalStorage(key))
      objFromStorage = JSON.parse(localStorage.getItem(key));
  
    objFromStorage[evt.target.name] = evt.target.value;
    localStorage.setItem(key, JSON.stringify(objFromStorage));
  };

const onSubmit = evt => {
    const key = 'feedback-form-state';
  
    const resultToConsole = checkLocalStorage(key)
      ? JSON.parse(localStorage.getItem(key))
      : { email: '', message: '' }; 
  
    console.log(resultToConsole);
  
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(key);
  };
  
  fillTheFieldsFromLocalStorage(form, 'feedback-form-state');
  form.addEventListener('input', throttle(onInput, 500));
  form.addEventListener('submit', onSubmit);
