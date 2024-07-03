import { photoFilters } from './const.js';

const PICTURES__COUNT = 10;
const Filter = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  DEFAULT: 'filter-default'
};

let currentFilter = Filter.DEFAULT;
let pictures = [];


const sortRandomly = (array) => array.slice().sort(() => Math.random() - 0.5).slice(0, PICTURES__COUNT);


const sortByComments = (pictureA, pictureB) => {
  pictureB.comments.length - pictureA.comments.length;
};

const getFilterPhoto = () => {
  if (currentFilter === Filter.RANDOM) {
    return sortRandomly(pictures);
  } else if (currentFilter === Filter.DISCUSSED) {
    return [...pictures].sort(sortByComments);
  } else if (currentFilter === Filter.DEFAULT) {
    return [...pictures];
  }
};

export const init = (loaderPictures) => {
  photoFilters.classList.remove('img-filters--inactive');
  pictures = [...loaderPictures];

  photoFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    photoFilters.querySelector('.img-filters__button--active').classList.remove('.img-filters__button--active');
    clickedButton.classList.add('.img-filters__button--active');
    currentFilter = clickedButton.id;
    getFilterPhoto();
  });
};
