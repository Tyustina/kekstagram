import { bodyPage } from './const.js';
const ALERT_SHOW_TIME = 5000;

export const getRandomInteger = (min, max) => {
  const random = Math.random() * (max + 1 - min) + min;
  return Math.floor(random);
};

export const sortRandomly = (array, count) => array.slice().sort(() => Math.random() - 0.5).slice(0, count);

export const getNormalizedStringArray = (string) =>
  string.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ');

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'black';

  alertContainer.textContent = message;

  bodyPage.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
