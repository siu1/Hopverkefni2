import { el, empty, arrayRemove, arrayAdd } from './helpers';

let selected = [];

let htmlButton;
let cssButton;
let jsButton;

export default function init() {
    htmlButton = document.querySelector('#html-button');
    cssButton = document.querySelector('#css-button');
    jsButton = document.querySelector('#js-button');
    document.querySelector('#html-button').addEventListener('click', function(){selectedCheck('html');});
    document.querySelector('#css-button').addEventListener('click', function(){selectedCheck('css');});
    document.querySelector('#js-button').addEventListener('click', function(){selectedCheck('javascript');});
    getJSON('/lectures.json');
}

async function getJSON(link) {
  fetch(link)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      throw new Error();
    })
    .then((data) => { load(data.lectures); })
    .catch(() => { console.log("error"); });
}

function load(data) {
    const mainDocument = document.querySelector('.lecturebox');
    empty(mainDocument);
    console.log(selected);
    data.forEach((obj) => {
        if(!selected.length || selected.includes(obj.category)) {
            const ourThumbnail = document.createElement('img');
            if(obj.hasOwnProperty("thumbnail")) {
              ourThumbnail.src = obj.thumbnail;
              ourThumbnail.classList.add('lecturebox__image');
            } else {
              //ourThumbnail.src = "img/thumb9.jpg";
              ourThumbnail.classList.add('lecturebox__fakeImage');  
            }

            const firstHeading = document.createElement('div');
            firstHeading.classList.add('heading', 'heading__size1');
            firstHeading.textContent = (obj.category).toUpperCase();

            const secondHeading = document.createElement('div');
            secondHeading.classList.add('heading', 'heading__size2');
            secondHeading.textContent = obj.title;

            const ourCard = el('a', ourThumbnail, firstHeading, secondHeading);
            ourCard.href = 'fyrirlestur.html?slug='.concat(obj.slug);
            ourCard.classList.add('lecturebox__card');
            mainDocument.appendChild(ourCard);
        }
    })
}

function selectedCheck(value) {
  if(value === 'html') {
      if(htmlButton.classList.contains('button__active')) {
        selected = arrayRemove(selected, value);
        htmlButton.classList.replace('button__active', 'button__inactive');
      } else {
        selected = arrayAdd(selected, value);
        htmlButton.classList.replace('button__inactive', 'button__active');
      }
  } else if(value === 'css') {
    if(cssButton.classList.contains('button__active')) {
      selected = arrayRemove(selected, value);
      cssButton.classList.replace('button__active', 'button__inactive');
    } else {
      selected = arrayAdd(selected, value);
      cssButton.classList.replace('button__inactive', 'button__active');
    }
  } else {
    if(jsButton.classList.contains('button__active')) {
      selected = arrayRemove(selected, value);
      jsButton.classList.replace('button__active', 'button__inactive');
    } else {
      selected = arrayAdd(selected, value);
      jsButton.classList.replace('button__inactive', 'button__active');
    }
  }
  getJSON('/lectures.json');
}