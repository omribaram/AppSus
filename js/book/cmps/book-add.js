import { ajaxService } from '../../services/ajax-service.js';
import bookAddList from './book-add-list.js';
import { bookService } from '../services/book-service.js'
import { eventBus } from '../../services/event-bus-service.js';

export default {
    template: `
        <section class="modal-content">
            <h1 class="add-book-title">Add a book</h1>
            <input class="add-book-search" ref="search" v-model="input" type="search" placeholder="What would you like to read today...?">
            <book-add-list v-if="searchOutput" :books="searchOutput" @selected="onAddBook"/>
        </section>
    `,
    data() {
        return {
            timeout: null,
            debouncedInput: '',
            searchOutput: null
        }
    },
    mounted() {
        this.$refs.search.focus();
    },
    methods: {
        onFetchBooks(str) {
            ajaxService.fetchBooks(str)
                .then(res => this.searchOutput = res)
        },
        onAddBook(googleBook) {
            const book = (({
                title,
                subtitle,
                authors,
                description,
                pageCount,
                categories,
                language,
                publishedDate
            }) => ({
                title,
                subtitle,
                authors,
                description,
                pageCount,
                categories,
                language,
                publishedDate
            }))(googleBook);
            book.thumbnail = googleBook.imageLinks.thumbnail
            book.listPrice = this.getRandomListPrice();
            bookService.addGoogleBook(book)
                .then(book => {
                    const msg = {
                        txt: 'Book has been added successfully',
                        type: 'success',
                        id: book.id,
                        route: '/book/'
                    };
                    this.$emit('addedBook');
                    eventBus.$emit('show-msg', msg);
                })
        },
        getRandomListPrice() {
            const amount = Math.floor(Math.random() * (250 - 10 + 1) + 10)
            const currencyCode = Math.random() > 0.5 ? 'USD' : 'EUR';
            const isOnSale = Math.random() > 0.5 ? true : false;
            return {
                amount,
                currencyCode,
                isOnSale
            }
        }
    },
    computed: {
        input: {
            get() {
                return this.debouncedInput
            },
            set(val) {
                if (this.timeout) clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.onFetchBooks(val);
                }, 1000)
            }
        }
    },
    components: {
        bookAddList
    }
}