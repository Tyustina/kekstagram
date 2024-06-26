import { uploadForm } from './const.js';

const sliderWrapper = uploadForm.querySelector('.effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const effectLevelValueElement = uploadForm.querySelector('.effect-level__value');
const previewImage = uploadForm.querySelector('.img-upload__preview');
const effectsElement = uploadForm.querySelector('.effects');

const EFFECTS = [//массив с настройками эффектов
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const hideSlider = () => {
  sliderWrapper.classList.add('hidden');
};

const showSlider = () => {
  sliderWrapper.classList.remove('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (chosenEffect === DEFAULT_EFFECT) {
    hideSlider();
  } else {
    showSlider();
  }
};

export const resetSlider = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};


const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  previewImage.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();//актуальное значение с ползунка
  previewImage.style.filter = (chosenEffect === DEFAULT_EFFECT)
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelValueElement.value = sliderValue;
};

noUiSlider.create(sliderElement, {//задает параметры слайдера
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
hideSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);
