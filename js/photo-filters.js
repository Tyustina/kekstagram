import { photoFilters } from './const.js';

// const PICTURES__COUNT = 10;

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) => {
  pictureB.comments.length - pictureA.comments.length;
};

const setOnFilterClick(callback) => {
  const clickedButton = evt.target;

}

const init = (loaderPictures, callback) => {
  photoFilters.classList.remove('img-filters--inactive');
  pictures = [...loaderPictures];
  setOnFilterClick(callback)
};
