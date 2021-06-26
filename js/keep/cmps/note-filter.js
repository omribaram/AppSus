// import x from ';

export default {
	template: `
    <section class="note-filter ">
		<div class="search-bar-container">
		<img class="img-note-filter" src="img/apps/keep/search.svg" alt="search">
		
        <input class="input-keep" v-model="filterBy.txt" @change="filter" type="text" placeholder="    Search Notes...">
		</div>
    </section>`,
	data() {
		return {
			filterBy: {
				txt: '',
			},
		};
	},

	methods: {
		filter() {
			this.$emit('filtered', { ...this.filterBy });
		},
	},
};
