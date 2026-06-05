import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.getElementById('load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', async event => {
    event.preventDefault();

    const query = event.target['search-text'].value.trim();
    if (!query) return;

    currentQuery = query;
    currentPage = 1;

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        totalHits = data.totalHits;
        hideLoader();

        if (data.hits.length === 0) {
            iziToast.error({
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                backgroundColor: '#EF4040',
                messageColor: '#FAFAFB',
                iconColor: '#FAFAFB',
                progressBarColor: '#B51B1B',
                close: true,
                theme: 'dark',
            });
            return
        }

        createGallery(data.hits);

        if (data.hits.length < PER_PAGE || currentPage * PER_PAGE >= totalHits) {
            hideLoadMoreButton();
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        hideLoader();
        iziToast.error({
                message: `Something went wrong: ${error.message}`,
                position: 'topRight',
            });
        }   
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        hideLoader();

        createGallery(data.hits);

        const card = document.querySelector('.gallery-item');
        if (card) {
            const cardHeight = card.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        }

        const loadedSoFar = currentPage * PER_PAGE;
        if (loadedSoFar >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        hideLoader();
        iziToast.error({
            message: `Something went wrong: ${error.message}`,
            position: 'topRight',
        });
    }
});
