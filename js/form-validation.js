import { uploadForm, hashtagInput, descriptionInput } from './const.js';
import { getNormalizedStringArray } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENTS_SYMBOLS = 140;
const MAX_HASHTAG_SYMBOLS = 1;
const MIN_HASHTAG_SYMBOLS = 19;

const hashtagRegex = new RegExp(`^#[a-zа-яё0-9]{${MAX_HASHTAG_SYMBOLS},${MIN_HASHTAG_SYMBOLS}}$`,'i');

const ErrorMessage = {
  HASHTAG__COUNT: `Количество хэштегов должно быть не более ${MAX_HASHTAGS_COUNT}`,
  DUPLICATE_HASHTAGS: 'Хэштеги не должны повторяться',
  COMMENTS_SYMBOLS: `Максимальная длинна комментария ${MAX_COMMENTS_SYMBOLS}`
};
const incorrectHashtags = [];

function validateHashtagRules(value) {
  if (!value) {
    return true;
  }

  const hashtags = getNormalizedStringArray(value);
  incorrectHashtags.length = 0;
  hashtags.forEach((hashtag) => {
    if (hashtagRegex.test(hashtag) === false) {
      incorrectHashtags.push(hashtag);
    }
  });
  return !incorrectHashtags.length;
}

const getErrorValidateMessage = () => {
  let validateMessage;
  if (incorrectHashtags.length === 1) {
    validateMessage = 'Введен невалидный хештег';
  } else {
    validateMessage = 'Введены невалидные хештеги';
  }
  return validateMessage;
};

const validateHashtagCount = (value) => {
  const hashtags = getNormalizedStringArray(value);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
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
  pristine.addValidator(hashtagInput, validateHashtagCount, ErrorMessage.HASHTAG__COUNT);
  pristine.addValidator(hashtagInput, validateHashtagDuplicate, ErrorMessage.DUPLICATE_HASHTAGS);
  pristine.addValidator(descriptionInput, validateDescriptionLength, ErrorMessage.COMMENTS_SYMBOLS);

  return {
    isValidForm: ()=> pristine.validate(),
    resetValidate: ()=>pristine.reset(),
  };
};
