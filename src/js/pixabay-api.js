import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { showLoader, hideLoader } from '../main';
import axios from 'axios';
import { limit } from '../main';

export async function getImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const PARAMS = {
    params: {
      key: '43999869-2222e4e6c4d0611e5b13cb64c',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: limit,
    },
  };
  const loader = document.querySelector('.loader');

  showLoader();

  return axios
    .get(BASE_URL, PARAMS)
    .then(response => {
      const { data } = response;

      if (!data.hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      return data;
    })
    .catch(error => {
      iziToast.error({
        message: `${error}`,
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
}
