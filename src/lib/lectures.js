import { el, empty } from './helpers';

//const ourJson = getJSON('/lectures.json');

export default function init() {
    getJSON('/lectures.json');
}

function getJSON(link) {
fetch(link)
  .then((result) => {
    if (!result.ok) {
      throw new Error('Non 200 status');
    }
    return result.json();
  })
  .then((data) => { load(data.lectures); })
  .catch(error => console.error(error));
}

function load(data) {
    const mainDocument = document.querySelector('main');
    empty(mainDocument);
    data.forEach((obj) => {
        const ourThumbnail = document.createElement('img');
        ourThumbnail.src = obj.thumbnail;
        ourThumbnail.classList.add('lecturebox__image');

        const firstHeading = document.createElement('div');
        firstHeading.classList.add('heading', 'heading__size1');
        firstHeading.textContent = obj.category;

        const secondHeading = document.createElement('div');
        secondHeading.classList.add('heading', 'heading__size2');
        secondHeading.textContent = obj.title;

        const ourCard = el(ourCard, ourThumbnail, firstHeading, secondHeading);
        ourCard.href = 'fyrirlestur.html?slug='.concat(obj.slug);
        ourCard.classList.add('lecturebox');
        mainDocument.appendChild(ourCard);
    })
}