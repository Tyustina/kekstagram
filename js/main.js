import './util.js';
import './full-photo.js';
import './form-upload.js';
import './scale-photo.js';
import './effects.js';
import './message-response.js';
import './photo-filters.js';
import { setUploadFormSubmit } from './form-upload.js';
import { closeModal, renderFullPhoto } from './full-photo.js';
import { editForm } from './const.js';
import { getData } from './api.js';
import { renderPhoto } from './photo-thumbnail.js';
import { showAlert } from './util.js';
import { init } from './photo-filters.js';

const bootstrap = async () => {
  setUploadFormSubmit(() => closeModal(editForm));

  try {
    const picturesData = await getData();
    init(picturesData, renderFullPhoto);
    renderPhoto(picturesData, renderFullPhoto);
  } catch (error) {
    showAlert('При загрузке произошла ошибка. Попробуйте еще раз');
  }
};

bootstrap();

