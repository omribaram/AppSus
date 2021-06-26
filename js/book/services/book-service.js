import { storageService } from '../../services/async-storage-service.js';

const BOOKS_KEY = 'booksDB';

export const bookService = {
    query,
    getById,
    getAdjcntBooksId,
    remove,
    save,
    addReview,
    removeReview,
    addGoogleBook
}

function query() {
    if (!JSON.parse(localStorage.getItem(BOOKS_KEY)))
        return Promise.resolve(
            fetch('js/book/services/books.json')
            .then(response => response.json())
            .then(data => {
                storageService.save(BOOKS_KEY, data);
                return data
            }))
    else return Promise.resolve(JSON.parse(localStorage.getItem(BOOKS_KEY)));
}

function getById(bookId) {
    return storageService.get(BOOKS_KEY, bookId);
}

function getAdjcntBooksId(bookId) {
    return query()
        .then(books => {
            const idx = books.findIndex(book => book.id === bookId)
            return {
                prevBookId: (idx - 1 < 0) ? books[books.length - 1].id : books[idx - 1].id,
                nextBookId: (idx + 1 > books.length - 1) ? books[0].id : books[idx + 1].id,
            }
        })
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId);
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOKS_KEY, book);
    } else {
        return storageService.post(BOOKS_KEY, book);
    }
}

function addGoogleBook(googleBook) {
    return storageService.post(BOOKS_KEY, googleBook)
}

function addReview(bookId, review) {
    review.id = storageService.makeId();
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            if (!book.reviews) book.reviews = [];
            book.reviews.push(review);
            return storageService.put(BOOKS_KEY, book)
        })
}

function removeReview(bookId, reviewId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id === reviewId);
            book.reviews.splice(idx, 1)
            return storageService.put(BOOKS_KEY, book)
        })
}
