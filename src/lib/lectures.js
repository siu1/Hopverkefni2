import { el, empty, arrayRemove, arrayAdd, loadStorage, save, clear } from './helpers';

let selected = [];

let htmlButton;
let cssButton;
let jsButton;
let finished = 'Klára Fyrirlestur';

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
    data.forEach((obj) => {
        if(!selected.length || selected.includes(obj.category)) {
            const ourThumbnail = document.createElement('img');
            if(obj.hasOwnProperty("thumbnail")) {
              ourThumbnail.src = obj.thumbnail;
            }
            
            ourThumbnail.classList.add('lecturebox__image');

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
  titleJSON('/lectures.json');
}


export function readLecture(data) {
    const head = document.querySelector('.head');
    if(data.hasOwnProperty('image')){
        head.style.backgroundImage = 'url("../'.concat(data.image,'")');
    }

    const headCategory = el('p', data.category.toUpperCase());
    headCategory.classList.add("heading__size1");
    head.appendChild(headCategory);

    const headTitle = el('h1', data.title);
    head.appendChild(headTitle);

    const page = document.querySelector(".lecture-page");

    data.content.forEach((obj) => {
        if(obj.type === "quote"){
          const quoteData = document.createElement('div');
          quoteData.classList.add("lecture-page__quote");
          const quoteText = document.createElement('p');
          quoteText.classList.add("lecture-page__quote__text");
          quoteText.textContent = obj.data;
          quoteData.appendChild(quoteText);
          if(obj.hasOwnProperty('attribute')) {
            const attribute = document.createElement('p');
            attribute.textContent = obj.attribute;
            attribute.style.fontStyle = 'italic';
            attribute.classList.add('lecture-page__quote__text');
            quoteData.appendChild(attribute);
          }

          page.appendChild(quoteData);
        } else if(obj.type === 'code') {
          const codeData = document.createElement('div');
          codeData.classList.add('lecture-page__code');
          const codeText = document.createElement('p');
          codeText.textContent = (obj.data).replace('\\n','<br>');
          codeData.appendChild(codeText);
          page.appendChild(codeData);
        } else if(obj.type === 'list') {
            const listData = document.createElement('ul');
            listData.classList.add('lecture-page__list');
            for(var i = 0; i < obj.data.length; i++) {
                const listText = document.createElement('li');
                listText.textContent = obj.data[i];
                listData.appendChild(listText);
            }
            page.appendChild(listData);
        } else if(obj.type === 'text') {
            const txtData = document.createElement('p');
            txtData.classList.add('lecture-page__text');
            txtData.textContent = (obj.data).replace('\\n','<br><br>');
            page.appendChild(txtData);
        } else if(obj.type === "heading"){
            const headingData = document.createElement('h2');
            headingData.classList.add('lecture-page__heading', 'heading__size2');
            headingData.textContent = obj.data;
            page.appendChild(headingData);
        } else if(obj.type === "youtube") {
            const ytFrame = document.createElement('div');
            const ytData = document.createElement('iframe');
            ytFrame.classList.add('lecture-page__youtube');
            ytData.src = obj.data;
            ytData.frameborder = '0';
            ytData.allowfullscreen = '0';
            ytFrame.appendChild(ytData);
            page.appendChild(ytFrame);
        } else if(obj.type === "image"){
            const ourImg = document.createElement('div');
            const imgData = document.createElement('img');
            ourImg.classList.add('lecture-page__image');
            imgData.src = '../'.concat(obj.data);
            ourImg.appendChild(imgData);
            if(obj.hasOwnProperty('caption')){
                const imgCaption = document.createElement('p');
                imgCaption.textContent = obj.caption;
                ourImg.appendChild(imgCaption);
            }
            page.appendChild(ourImg);
        }
    });

    const finishLecture = document.createElement('div');
    finishLecture.classList.add('lecture-page__link');
    let ourStorage = loadStorage();
    console.log(ourStorage);
    if(ourStorage != null && ourStorage.some((obj) => obj.title === data.title)) {
      finishLecture.textContent = '✓ Fyrirlestur Kláraður';
      finishLecture.style.color = '#2d2';
    } else {
      finishLecture.textContent = 'Klára fyrirlestur';
      finishLecture.addEventListener('click', function(){finishedLecture(data.title, finishLecture)});
    }

    const backLink = document.createElement('a');
    backLink.textContent = 'Til Baka';
    backLink.href = 'index.html';
    backLink.classList.add('lecture-page__link');
    page.appendChild(finishLecture);
    page.appendChild(backLink);
}

function finishedLecture(title, node) {
    save(title)
    node.textContent = '✓ Fyrirlestur Kláraður';
    node.style.color = '#2d2';
}