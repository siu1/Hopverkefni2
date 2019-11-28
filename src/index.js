import List from './lib/list';
import init from './lib/lectures';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {

  } else {
    //const list = new List();
    //list.load();
    init();
  }
});
