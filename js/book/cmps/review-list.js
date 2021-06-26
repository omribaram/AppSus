import bookReview from "./book-review.js";

export default {
    props: ['reviews', 'bookId'],
    template: `
        <ul class="book-reviews">
            <li v-for="review in reviews" :key="review.id">
                <book-review :review="review" @removed="onRemoveReview"/>
            </li>
        </ul>
    `,
    methods: {
        onRemoveReview(reviewId) {
            this.$emit('removed', reviewId)
        }
    },
    components: {
        bookReview
    }
};