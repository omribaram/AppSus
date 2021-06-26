export default {
	props: ['editedNote'],
	template: `  
	<form class="keep-form" v-on:keyup.enter="submit" >
	<h3 v-if="editedNote"> Edit Text Note  </h3>
	<h4 class="keep-add-text" v-else> Add Text Note </h4>
    <input  v-model="info.txt"  class="input-keep" type="text" placeholder="Write Title">
    <input  v-model="info.title"  class="input-keep" type="text" placeholder="Write Text">
	</form>
    `,

	data() {
		return {
			info: {
				title: null,
				txt: null,
			},
		};
	},

	methods: {
		submit() {
			const newInfo = { ...this.info };
			this.$emit('submitting', newInfo, 'noteTxt');
			this.info.title = '';
			this.info.txt = '';
		},
	},
	created() {
		if (this.editedNote) {
			this.info.title = this.editedNote.info.title;
			this.info.txt = this.editedNote.info.txt;
		}
	},
};
