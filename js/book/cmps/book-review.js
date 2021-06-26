import { i18nService } from '../../services/i18n-service.js'

export default {
    props: ['review'],
    template: `
        <div class="book-review">
            <div class="review-title"><span>Review by:</span>&nbsp; {{review.name}} 
                <span v-html="showRating" class="review-rating"></span>
                <span class="review-read-date">Read on: {{showDate}}</span>
                <span @click="onRemoveReview" class="remove-review">🗑️</span>
            </div>
            <p class="review-text">
                {{review.txt}}
            </p>
        </div>
    `,
    methods: {
        onRemoveReview() {
            this.$emit('removed', this.review.id)
        }
    },
    computed: {
        showRating() {
            const star = '⭐';
            return `${star.repeat(this.review.rating)}<span class="gray-star">${star.repeat(5-this.review.rating)}</span>`
        },
        showDate() {
            return i18nService.dateForDisplay(this.review.readOn)
        }
    },
    components: {
        i18nService
    }
}