 import { photoFilters } from './const.js';

// const PICTURES__COUNT = 10;
// const Filter = {
//   RANDOM: 'filter-random',
//   DISCUSSED: 'filter-discussed',
//   DEFAULT: 'filter-default'
// }

// let currentFilter = Filter.DEFAULT

// //1. функция сортировки случайных Х элементов массива
// const sortRandomly = (pictures) => pictures.slice().sort(() => Math.random() - 0.5).slice(0, PICTURES__COUNT);

// //2. сортировка массива по убываанию
// const sortByComments = (pictureA, pictureB) => {
//   pictureB.comments.length - pictureA.comments.length;
// };

// //3. функция которая будет применять соответствующую функцию к нужному фильтру
// const getFilterPhoto = () =>{
//   switch(currentFilter){
//     case Filter.RANDOM :
//       return sortRandomly(pictures)
//       break
//     case Filter.DISCUSSED :
//       return
//       break
//     default:
//       return pictures.slice()
//       break
//   }
// }

// //4. сделать переключение кнопок и совместить с  нужной фильтрацией

// const setOnFilterClick () => {
//   const clickedButton = evt.target;


// }


// //5. функция которая запускает фильтрацию, если в нее загрузились фото
export const init = (loaderPictures, callback) => {
  photoFilters.classList.remove('img-filters--inactive');
  const pictures = [...loaderPictures];
  console.log(pictures);
  // setOnFilterClick(callback)
};
