export default {
    template: `
    <section class="book-filter">
        <form @submit.prevent="onFilter">
            <input v-model="filterBy.byName" @search="onFilter" type="search" placeholder="Book name">
            <input v-model.number="filterBy.fromPrice" type="number" placeholder="Min Price" min="0">
            <input v-model.number="filterBy.toPrice" type="number" placeholder="Max Price" min="0">
            <button>Filter</button>
        </form>
        <span class="btn-add-book" @click="onAddBook">📚 Add Books</span>
    </section>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: -Infinity,
                toPrice: Infinity
            }
        };
    },
    methods: {
        onFilter() {
            this.$emit('filtered', this.filterBy);
        },
        onAddBook() {
            this.$emit('addBook');
        }
    }
};