import {
  el, loadStorage, save,
} from './helpers';

function finishedLecture(title, node) {
  save(title);
  const newNode = node;
  newNode.textContent = '✓ Fyrirlestur Kláraður';
  newNode.style.color = '#2d2';
}

export function readLecture(data) {
  const head = document.querySelector('.head');
  if (data.hasOwnProperty('image')) { /* eslint-disable-line */
    head.style.backgroundImage = 'url("../'.concat(data.image, '")');
    const protection = document.createElement('div');
    protection.classList.add('head__protection');
    head.appendChild(protection);
  }


  const headCategory = el('p', data.category.toUpperCase());
  headCategory.classList.add('heading__size1');
  head.appendChild(headCategory);

  const headTitle = el('h1', data.title);
  head.appendChild(headTitle);

  const page = document.querySelector('.lecture-page');

  data.content.forEach((obj) => {
    if (obj.type === 'quote') {
      const quoteData = document.createElement('div');
      quoteData.classList.add('lecture-page__quote');
      const quoteText = document.createElement('p');
      quoteText.classList.add('lecture-page__quote__text');
      quoteText.textContent = obj.data;
      quoteData.appendChild(quoteText);
      if (obj.hasOwnProperty('attribute')) { /* eslint-disable-line */
        const attribute = document.createElement('p');
        attribute.textContent = obj.attribute;
        attribute.style.fontStyle = 'italic';
        attribute.classList.add('lecture-page__quote__text');
        quoteData.appendChild(attribute);
      }

      page.appendChild(quoteData);
    } else if (obj.type === 'code') {
      const codeData = document.createElement('div');
      codeData.classList.add('lecture-page__code');
      const codeText = document.createElement('p');
      codeText.innerText = obj.data;
      codeData.appendChild(codeText);
      page.appendChild(codeData);
    } else if (obj.type === 'list') {
      const listData = document.createElement('ul');
      listData.classList.add('lecture-page__list');
      for (let i = 0; i < obj.data.length; i += 1) {
        const listText = document.createElement('li');
        listText.textContent = obj.data[i];
        listData.appendChild(listText);
      }
      page.appendChild(listData);
    } else if (obj.type === 'text') {
      const txtData = document.createElement('p');
      txtData.classList.add('lecture-page__text');
      txtData.innerText = obj.data;
      page.appendChild(txtData);
    } else if (obj.type === 'heading') {
      const headingData = document.createElement('h2');
      headingData.classList.add('lecture-page__heading', 'heading__size2');
      headingData.textContent = obj.data;
      page.appendChild(headingData);
    } else if (obj.type === 'youtube') {
      const ytFrame = document.createElement('div');
      const ytData = document.createElement('iframe');
      ytFrame.classList.add('lecture-page__youtube');
      ytData.src = obj.data;
      ytData.frameborder = '0';
      ytData.allowfullscreen = '0';
      ytFrame.appendChild(ytData);
      page.appendChild(ytFrame);
    } else if (obj.type === 'image') {
      const ourImg = document.createElement('div');
      const imgData = document.createElement('img');
      ourImg.classList.add('lecture-page__image');
      imgData.src = '../'.concat(obj.data);
      ourImg.appendChild(imgData);
      if (obj.hasOwnProperty('caption')) { /* eslint-disable-line */
        const imgCaption = document.createElement('p');
        imgCaption.textContent = obj.caption;
        ourImg.appendChild(imgCaption);
      }
      page.appendChild(ourImg);
    }
  });

  const finishLecture = document.createElement('div');
  finishLecture.classList.add('lecture-page__link');
  const ourStorage = loadStorage();
  if (ourStorage != null && ourStorage.some((obj) => obj.title === data.title)) {
    finishLecture.textContent = '✓ Fyrirlestur Kláraður';
    finishLecture.style.color = '#2d2';
  } else {
    finishLecture.textContent = 'Klára fyrirlestur';
    finishLecture.addEventListener('click', function () { finishedLecture(data.title, finishLecture) }); /* eslint-disable-line */
  }

  const backLink = document.createElement('a');
  backLink.textContent = 'Til Baka';
  backLink.href = 'index.html';
  backLink.classList.add('lecture-page__link');
  page.appendChild(finishLecture);
  page.appendChild(backLink);
}

export default async function lectureJSON() {
  fetch('/lectures.json')
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      throw new Error();
    })
    .then((data) => {
      data.lectures.forEach((obj) => {
        if (obj.slug === (location.search).replace('?slug=', '')) { /* eslint-disable-line */
          readLecture(obj);
        }
      });
    })
    .catch((error) => console.error(error));
}
