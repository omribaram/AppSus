import { eventBus } from '../../services/event-bus-service.js';

export default {
    props: ['bookName'],
    template: `
        <section class="modal-content">
            <h1 class="review-book-title">Add a review for <span>{{bookName}}</span></h1>
            <form @submit.prevent="addReview" class="review-add-page" id="add-review">
                <div class="name">
                    Name:
                    <input ref="name" v-model="review.name" type="text" maxlength="15" placeholder="Name" tabindex="1">
                </div>
                <div class="star-rating">
                    Rating: 
                    <fieldset form="add-review" class="rating">
                        <input v-model.number="review.rating" type="radio" id="star5" value="5" />
                        <label for="star5"></label>
                        <input v-model.number="review.rating" type="radio" id="star4" value="4" />
                        <label for="star4"></label>
                        <input v-model.number="review.rating" type="radio" id="star3" value="3" />
                        <label for="star3"></label>
                        <input v-model.number="review.rating" type="radio" id="star2" value="2" />
                        <label for="star2"></label>
                        <input v-model.number="review.rating" type="radio" id="star1" value="1" />
                        <label for="star1"></label>
                    </fieldset>
                </div>
                <div class="date">
                    Date of Reading:
                    <input v-model="review.readOn" type="date" tabindex="3">
                </div>
                Review:
                <textarea v-model="review.txt" rows="10" cols="50" tabindex="4"></textarea>
                <button>submit</button>
            </form>
        </section>
    `,
    data() {
        return {
            review: {
                name: '',
                rating: 0,
                readOn: null,
                txt: '',
            }
        }
    },
    mounted() {
        this.$refs.name.focus();
    },
    methods: {
        addReview() {
            if (!this.review.name || this.review.rating === 0 || !this.review.readOn || !this.review.txt) {
                const msg = {
                    txt: 'All fields must be filled out properly',
                    type: 'error'
                };
                eventBus.$emit('show-msg', msg);
                return
            }

            this.$emit('reviewAdd', this.review)
        }
    }
}