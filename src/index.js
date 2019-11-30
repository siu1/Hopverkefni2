import init from './lib/lectures';
import lectureJSON from './lib/present';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('main');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    lectureJSON();
  } else {
    init();
  }
});
