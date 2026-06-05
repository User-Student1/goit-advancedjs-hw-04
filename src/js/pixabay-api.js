import axios from "axios";
const API_KEY = '56089833-df6fa8cd94c036835afda3ed5';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: PER_PAGE,
            page,
        },
    })
    return response.data;
}