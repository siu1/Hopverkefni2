import {
  el, empty, arrayRemove, arrayAdd, loadStorage,
} from './helpers';

let selected = [];

let htmlButton;
let cssButton;
let jsButton;

function load(data) {
  const mainDocument = document.querySelector('.lecturebox');
  empty(mainDocument);
  data.forEach((obj) => {
    if (!selected.length || selected.includes(obj.category)) {
      const ourThumbnail = document.createElement('img');
      if (obj.hasOwnProperty('thumbnail')) { /* eslint-disable-line */
        ourThumbnail.src = obj.thumbnail;
      }

      ourThumbnail.classList.add('lecturebox__image');

      const firstHeading = document.createElement('div');
      firstHeading.classList.add('heading', 'heading__size1');
      firstHeading.textContent = (obj.category).toUpperCase();

      const secondHeading = document.createElement('div');
      secondHeading.classList.add('heading', 'heading__size2');
      secondHeading.textContent = obj.title;

      const ourHeadings = el('div', firstHeading, secondHeading);
      ourHeadings.classList.add('lecturebox__heading');

      const ourCheckmark = document.createElement('div');
      ourCheckmark.classList.add('heading', 'heading__size2');
      const ourStorage = loadStorage();
      if (ourStorage != null && ourStorage.some((obj1) => obj1.title === obj.title)) {
        ourCheckmark.textContent = '✓';
        ourCheckmark.style.color = '#2d2';
      }

      const lowerHalf = el('div', ourHeadings, ourCheckmark);
      lowerHalf.classList.add('lecturebox__lower');

      const ourCard = el('a', ourThumbnail, lowerHalf);
      ourCard.href = 'fyrirlestur.html?slug='.concat(obj.slug);
      ourCard.classList.add('lecturebox__card');
      mainDocument.appendChild(ourCard);
    }
  });
}

async function titleJSON(link) {
  fetch(link)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      throw new Error();
    })
    .then((data) => { load(data.lectures); })
    .catch((error) => console.error(error));
}

function selectedCheck(value) {
  if (value === 'html') {
    if (htmlButton.classList.contains('button__active')) {
      selected = arrayRemove(selected, value);
      htmlButton.classList.replace('button__active', 'button__inactive');
    } else {
      selected = arrayAdd(selected, value);
      htmlButton.classList.replace('button__inactive', 'button__active');
    }
  } else if (value === 'css') {
    if (cssButton.classList.contains('button__active')) {
      selected = arrayRemove(selected, value);
      cssButton.classList.replace('button__active', 'button__inactive');
    } else {
      selected = arrayAdd(selected, value);
      cssButton.classList.replace('button__inactive', 'button__active');
    }
  } else if (value === 'javascript') {
    if (jsButton.classList.contains('button__active')) {
      selected = arrayRemove(selected, value);
      jsButton.classList.replace('button__active', 'button__inactive');
    } else {
      selected = arrayAdd(selected, value);
      jsButton.classList.replace('button__inactive', 'button__active');
    }
  }
  titleJSON('/lectures.json');
}

export default function init() {
  htmlButton = document.querySelector('#html-button');
  cssButton = document.querySelector('#css-button');
  jsButton = document.querySelector('#js-button');
  const head = document.querySelector('.head');
  head.style.backgroundImage = 'url("../img/header.jpg")';
  document.querySelector('#html-button').addEventListener('click', function () { selectedCheck('html'); }); /* eslint-disable-line */
  document.querySelector('#css-button').addEventListener('click', function () { selectedCheck('css'); }); /* eslint-disable-line */
  document.querySelector('#js-button').addEventListener('click', function () { selectedCheck('javascript'); }); /* eslint-disable-line */
  titleJSON('/lectures.json');
}
