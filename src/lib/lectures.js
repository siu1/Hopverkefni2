import { el, empty, arrayRemove, arrayAdd } from './helpers';

let selected = [];

let htmlButton;
let cssButton;
let jsButton;

export default function init() {
    htmlButton = document.querySelector('#html-button');
    cssButton = document.querySelector('#css-button');
    jsButton = document.querySelector('#js-button');
    const head = document.querySelector('.head');
    head.style.backgroundImage = 'url("../img/header.jpg")';
    document.querySelector('#html-button').addEventListener('click', function(){selectedCheck('html');});
    document.querySelector('#css-button').addEventListener('click', function(){selectedCheck('css');});
    document.querySelector('#js-button').addEventListener('click', function(){selectedCheck('javascript');});
    titleJSON('/lectures.json');
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
    .catch(() => { console.log("error"); });
}

export async function lectureJSON() {
    fetch('/lectures.json')
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        throw new Error();
      })
      .then((data) => { data.lectures.forEach((obj) => {
        if(obj.slug === (location.search).replace('?slug=','')) {
            readLecture(obj);
            return;
        }
      })
    })
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
            //const secondHeadingText = document.createElement('p');
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
  titleJSON('/lectures.json');
}


export function readLecture(data) {
    const head = document.querySelector('.head');
    if(data.hasOwnProperty('image')){
        head.style.backgroundImage = 'url("../'.concat(data.image,'")');
    }

    const headCategory = el('p', data.category);
    headCategory.classList.add("heading__size1");
    head.appendChild(headCategory);

    data.content.forEach((obj) => {
        if(obj.type === "quote"){
          const quoteData = document.createElement('div');
          quoteData.classList.add(lecture-page__quote);
          const quoteText = document.createElement('p');
          quoteText.classList.add(lecture-page__quote__text);
          quoteData.textContent = obj.data;
        }
    });
}