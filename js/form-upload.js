import { bodyPage, uploadForm, hashtagInput, descriptionInput, editForm, submitButton } from './const.js';
import { configureFormValidation } from './form-validation.js';
import { activatingImageEditingScale, resetImageEditingScale } from './scale-photo.js';
import { resetSlider } from './effects.js';
import { sendData } from './api.js';
import { showUploadErrorMessage, showUploadSuccessMessage } from './message-response.js';

const fileUploadElement = uploadForm.querySelector('.img-upload__input');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const preview = document.querySelector('.img-upload__preview img');
const FILE__TYPES = ['jpg', 'png', 'gif', 'jpeg'];

fileUploadElement.addEventListener('change', () => {
  openEditingImageForm();
  const file = fileUploadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE__TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    preview.src = URL.createObjectURL(file);
    preview.style.width = '100%';
  }
});

export const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (![hashtagsElement, descriptionElement].includes(document.activeElement)) {
      closeEditingImageForm();
    }
  }
};

export const { isValidForm, resetValidate } = configureFormValidation(uploadForm, hashtagInput, descriptionInput);


function openEditingImageForm() {
  editForm.classList.remove('hidden');
  bodyPage.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeFormButton.addEventListener('click', closeEditingImageForm);
  activatingImageEditingScale();
}

export function resetEditingForm() {
  resetValidate();
  uploadForm.reset();
  resetImageEditingScale();
  resetSlider();
}

function closeEditingImageForm() {
  editForm.classList.add('hidden');
  bodyPage.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  fileUploadElement.value = '';
  resetEditingForm();
}


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

export const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isValidForm()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showUploadSuccessMessage();
        },
        () => {
          showUploadErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

