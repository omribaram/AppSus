import bookAddPreview from './book-add-preview.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-add-list">
        <li v-for="book in books" :key="book.id">
            <book-add-preview :book="book.volumeInfo" @click.native="selected(book.volumeInfo)"/>
        </li>
    </ul>
    `,
    methods: {
        selected(googleBook) {
            this.$emit('selected', googleBook)
        }
    },
    components: {
        bookAddPreview
    }
};