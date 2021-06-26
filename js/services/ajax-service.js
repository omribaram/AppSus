export const ajaxService = {
    fetchBooks
}

const API_KEY = 'AIzaSyCMT23bFcOEvXjN_twMRUN4VhvqAHadWMQ';

function fetchBooks(str) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${str}`)
        .then(res => res.data.items);
}