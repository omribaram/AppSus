import { bookService } from '../services/book-service.js';
import { eventBus } from '../../services/event-bus-service.js';
import { i18nService } from '../../services/i18n-service.js';
import longText from '../../cmps/long-text.js';
import reviewList from '../cmps/review-list.js';
import reviewAdd from '../cmps/review-add.js'

export default {
    template: `
    <section class="book-app">
        <div class="books-nav">
            <router-link :to="'/book/' + AdjcntBooks.prevBookId">
                <span class="tooltip">
                    🢀
                    <span class="prev-book-tip left">Previous Book</span>
                </span>
            </router-link>
            <router-link :to="'/book/' + AdjcntBooks.nextBookId">
                <span class="tooltip">
                    🢂
                    <span class="next-book-tip right">Next Book</span>
                </span>
            </router-link>
        </div>
        <article v-if="book" class="book">
        <div class="book-img">
            <div class="frame full-size">
                <img :src="book.thumbnail">
                <div v-if="isOnSale" class="ribbon ribbon-top-right">
                    <span>sale</span>
                </div>
            </div>
        </div>  
        <section class="book-details">
            <h2 class="book-title">
                <span>{{book.title}} |</span>
                <span v-if="book.authors" class="book-authors"> {{...book.authors}} </span>
                <span class="book-date">{{showPublishDate}}</span>
                <span class="tooltip close-book">
                    <span @click="closeDetails" class="close-book">❌</span>
                    <span class="close-book-tip right">Back to books list</span>
                </span>
            </h2>
            <h3 class="book-subtitle">{{book.subtitle}}</h3>
            <long-text :txt="book.description" :length="100" class="book-desc"/>
            <div v-if="toggleAddReview" class="modal-container" @click.self="toggleAddReview = false">
                <review-add :bookName="book.title" @reviewAdd="onAddReview"/>
            </div>
            <div class="add-review" @click="onToggleAddReview">➕Add review</div>
            <review-list v-if="book.reviews && book.reviews.length > 0" :reviews="book.reviews" :bookId="book.id" @removed="onRemoveReview"/>
            <footer class="book-footer">
                <span class="book-categories">
                    {{showCategories}}
                </span>
                <span class="reading">
                    {{showReading}}
                </span>
                <span class="book-language">
                    {{showLanguage}}
                </span>
                <span class="book-price" v-bind:class="priceClassObject">
                    {{showPrice}}
                </span>
            </footer>
        </section>
        </article>
    </section>
    `,
    data() {
        return {
            book: null,
            AdjcntBooks: {},
            toggleAddReview: false
        }
    },
    created() {
        const { bookId } = this.$route.params;
        this.assignBook(bookId);
    },
    methods: {
        closeDetails() {
            this.$router.push('/book')
        },
        assignBook(bookId) {
            bookService.getById(bookId)
                .then(book => {
                    this.book = book
                });
        },
        onToggleAddReview() {
            this.toggleAddReview = true;
        },
        onAddReview(review) {
            bookService.addReview(this.book.id, review)
                .then(() => {
                    this.assignBook(this.book.id)
                    const msg = {
                        txt: 'Review has been deleted successfully',
                        type: 'success'
                    };
                    eventBus.$emit('show-msg', msg);
                    this.toggleAddReview = false;
                })
        },
        onRemoveReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(res => {
                    this.assignBook(this.book.id)
                    const msg = {
                        txt: 'Review has been deleted successfully',
                        type: 'success'
                    };
                    eventBus.$emit('show-msg', msg);
                })
        }
    },
    computed: {
        showPrice() {
            return i18nService.priceForDisplay(this.book)
        },
        priceClassObject: function() {
            return {
                'high-price': this.book.listPrice.amount > 150,
                'low-price': this.book.listPrice.amount < 20
            }
        },
        isOnSale() {
            return this.book.listPrice.isOnSale
        },
        showCategories() {
            return this.book.categories.join(' , ')
        },
        showReading() {
            if (this.book.pageCount > 500) return '📖📖📖 Long Reading'
            if (this.book.pageCount > 200) return '📖📖 Decent Reading'
            return '📖 Light Reading'
        },
        showLanguage() {
            if (this.book.language === 'he') return 'Hebrew'
            if (this.book.language === 'sp') return 'Spanish'
            return 'English'
        },
        showPublishDate() {
            if (new Date().getFullYear() - this.book.publishedDate > 10) return 'Veteran Book'
            return 'New!'
        }
    },
    watch: {
        '$route.params.bookId': {
            immediate: true,
            handler() {
                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => this.book = book);
                bookService.getAdjcntBooksId(bookId)
                    .then(bookIds => this.AdjcntBooks = bookIds);
            }
        }
    },
    components: {
        longText,
        reviewList,
        reviewAdd
    }
}