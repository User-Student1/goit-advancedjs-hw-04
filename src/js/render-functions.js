import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more');

export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
    .map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) =>
        `<li class="gallery-item">
            <a href="${largeImageURL}">
                <img
                class="gallery-img"
                src="${webformatURL}"
                alt="${tags}"
                loading="lazy"
                />
            </a>
            <div class="gallery-info">
                <p class="gallery-info-item">
                    <span class="info-label">Likes</span>
                    <span class="info-value">${likes}</span>
                </p>
                <p class="gallery-info-item">
                    <span class="info-label">Views</span>
                    <span class="info-value">${views}</span>
                </p>
                <p class="gallery-info-item">
                    <span class="info-label">Comments</span>
                    <span class="info-value">${comments}</span>
                </p>
                <p class="gallery-info-item">
                    <span class="info-label">Downloads</span>
                    <span class="info-value">${downloads}</span>
                </p>
            </div>
        </li>`
    )
    .join('');

    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}
export function clearGallery() {
    galleryEl.innerHTML = '';
}
export function showLoader() {
    loaderEl.classList.add('is-visible');
}
export function hideLoader() {
    loaderEl.classList.remove('is-visible');
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.add('is-visible');
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.remove('is-visible');
}