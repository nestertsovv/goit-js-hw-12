import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api';
import { createTemplate } from './js/render-functions';
import { showLoader, hideLoader } from './js/pixabay-api';
import { refs } from './js/refs';

const optionsModal = {
  captionsData: 'alt',
  captionDelay: 250,
  className: 'js-backdrop',
};
const lightbox = new simpleLightbox('.gallery a', optionsModal);

let searchValue = null;
let page = 1;
const limit = 15;

refs.formSearch.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(e) {
  e.preventDefault();

  page = 1;
  searchValue = e.target.elements.search.value.trim();

  if (!searchValue) return;

  refs.gallery.innerHTML = '';

  try {
    const response = await getImages(searchValue, page);
    const { hits: data, totalHits: total } = response;

    total > limit ? showMoreBtn() : hideMoreBtn();

    renderTemplate(data);
    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      position: 'topRight',
    });
  } finally {
    e.target.reset();
  }
}

async function onLoadMore() {
  page++;

  showLoader();

  const galleryItem = document.querySelector('.item-gallery');
  const heightItem = galleryItem.getBoundingClientRect().height;

  try {
    const response = await getImages(searchValue, page);
    const { hits: data, totalHits: total } = response;
    const lastPage = Math.ceil(total / limit);

    if (lastPage === page) {
      hideMoreBtn();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    refs.gallery.insertAdjacentHTML('beforeend', createTemplate(data));
    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      position: 'topRight',
    });
  } finally {
    setTimeout(() => {
      window.scrollBy(0, heightItem * 2 + 48);
    }, 400);

    hideLoader();
  }
}

function renderTemplate(query) {
  const markup = createTemplate(query);

  refs.gallery.insertAdjacentHTML('afterbegin', markup);
}

function showMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
