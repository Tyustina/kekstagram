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
import { showFilters } from './photo-filters.js';

getData(
  (data) => renderPhoto(data, renderFullPhoto),
  () => showAlert('При загрузке произошла ошибка. Попробуйте еще раз')
);

getData.onload = showFilters();
// getData.onerror = hideFilters();

setUploadFormSubmit(() => closeModal(editForm));

