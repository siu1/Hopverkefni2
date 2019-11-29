export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

export function arrayRemove(arr, value) {
  return arr.filter((ele) => ele !== value);
}

export function arrayAdd(arr, value) {
  return arr.concat([value]);
}

const LOCALSTORAGE_KEY = 'finished_lectures';

export function loadStorage() {
  const ourLectures = localStorage.getItem(LOCALSTORAGE_KEY);
  return JSON.parse(ourLectures);
}

export function save(name) {
  let ourLectures = loadStorage();
  if (!ourLectures) {
    ourLectures = [];
  }
  if (!ourLectures.some((obj) => obj.title === name)) {
    ourLectures.push({ title: name });
  }

  const ourJSON = JSON.stringify(ourLectures);
  localStorage.setItem(LOCALSTORAGE_KEY, ourJSON);
}

export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
