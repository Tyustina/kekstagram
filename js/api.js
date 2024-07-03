export const getData = (onSuccess, onError) => fetch('https://28.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((data) => {
    onSuccess(data); return data;
  })
  .catch((err) => {
    onError(err.message); return Promise.reject(err);
  });

export const sendData = (onSuccess, onError, body) => fetch('https://28.javascript.htmlacademy.pro/kekstagram/',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  })
  .catch(() => onError());
