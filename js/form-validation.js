import { uploadForm, hashtagInput, descriptionInput } from './const.js';
import { getNormalizedStringArray } from './util.js';

const MAX__HASHTAGS__COUNT = 5;
const MAX_COMMENTS_SYMBOLS = 140;


const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const errorMessage = {
  HASHTAG__COUNT: `Количество хэштегов должно быть не более ${MAX__HASHTAGS__COUNT}`,
  DUPLICATE_HASHTAGS: 'Хэштеги не должны повторяться',
  COMMENTS_SYMBOLS: `Максимальная длинна комментария ${MAX_COMMENTS_SYMBOLS}`
};
const incorrectHashtag = [];

function validateHashtagRules(value) {
  if (!value) {
    return true;
  }

  const hashtags = getNormalizedStringArray(value);
  incorrectHashtag.length = 0;
  hashtags.forEach((hashtag) => {
    if (hashtagRegex.test(hashtag) === false) {
      incorrectHashtag.push(hashtag);
    }
  });
  return !incorrectHashtag.length;
}

const getErrorValidateMessage = () => {
  let validateMessage;
  if (incorrectHashtag.length === 1) {
    validateMessage = 'Введен невалидный хештег';
  } else {
    validateMessage = 'Введены невалидные хештеги';
  }
  return validateMessage;
};

const validateHashtagCount = (value) => {
  const hashtags = getNormalizedStringArray(value);
  return hashtags.length <= MAX__HASHTAGS__COUNT;
};

const validateHashtagDuplicate = (value) => {
  const hashtags = getNormalizedStringArray(value);
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;

};
const validateDescriptionLength = (value) => MAX_COMMENTS_SYMBOLS >= value.length;

export const configureFormValidation = () => {
  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(hashtagInput, validateHashtagRules, getErrorValidateMessage);
  pristine.addValidator(hashtagInput, validateHashtagCount, errorMessage.HASHTAG__COUNT);
  pristine.addValidator(hashtagInput, validateHashtagDuplicate, errorMessage.DUPLICATE_HASHTAGS);
  pristine.addValidator(descriptionInput, validateDescriptionLength, errorMessage.COMMENTS_SYMBOLS);

  return {
    isValidForm: ()=> pristine.validate(),
    resetValidate: ()=>pristine.reset(),
  };
};
