import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.js';
import bookFilter from '../cmps/book-filter.js';
import bookDetails from '../pages/book-details.js';
import bookAdd from '../cmps/book-add.js';
import waitLoader from '../../cmps/loader.js'

export default {
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter" @addBook="onAddBook"></book-filter>
            <book-list v-if="books.length>0" :books="booksToShow"></book-list>
            <wait-loader v-else/>
            <div v-if="toggleAddBook" class="modal-container" @click.self="toggleAddBook = false">
                <book-add @addedBook="loadBooks"/>
            </div>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
            toggleAddBook: false
        };
    },
    created() {
        this.loadBooks()
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => {
                    this.books = books.reverse();
                });
        },
        setFilter(filterBy) {
            this.filterBy = {...filterBy }
        },
        onAddBook() {
            this.toggleAddBook = true;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy || (this.filterBy.byName === '' && this.filterBy.fromPrice === -Infinity && this.filterBy.toPrice === Infinity)) return this.books;
            if (this.filterBy.fromPrice === '') this.filterBy.fromPrice = -Infinity;
            if (this.filterBy.toPrice === '') this.filterBy.toPrice = Infinity;
            const filterStr = this.filterBy.byName.toLowerCase();
            return this.books.filter(book => {
                return book.title.toLowerCase().includes(filterStr) &&
                    book.listPrice.amount >= this.filterBy.fromPrice &&
                    book.listPrice.amount <= this.filterBy.toPrice;
            });
        }
    },
    components: {
        bookFilter,
        bookList,
        bookDetails,
        bookAdd,
        waitLoader
    }
};