import init, { lectureJSON } from './lib/lectures';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('main');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    lectureJSON();
  } else {
    init();
  }
});
