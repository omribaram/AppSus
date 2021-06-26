import bookPreview from './book-preview.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id">
            <book-preview :book="book" @click.native="select(book.id)"/>
        </li>
    </ul>
    `,
    methods: {
        select(bookId) {
            this.$router.push(`/book/${bookId}`)
        }
    },
    components: {
        bookPreview
    }
};