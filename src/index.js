import List from './lib/list';
import init, { lectureJSON } from './lib/lectures';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('main');
  const isLecturePage = page.classList.contains('lecture-page');
  console.log(isLecturePage);

  if (isLecturePage) {
    lectureJSON();
  } else {
    //const list = new List();
    //list.load();
    init();
  }
});
