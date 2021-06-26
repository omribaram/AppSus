export default {
	props: ['editedNote'],
	template: `  
    
        <form class="keep-form" v-on:keyup.enter="submit">
		<h3 v-if="editedNote"> Edit Video Note  </h3>
		<h4 class="keep-add-text" v-else> Add Video Note </h4>
            <input class="input-keep" v-model="info.title"  type="text" placeholder="Write Title">
            <input class="input-keep" type="url" v-model="info.url" placeholder="Enter URL" >
			
    </form> 
    `,

	data() {
		return {
			info: {
				url: null,
				title: null,
			},
		};
	},

	methods: {
		submit() {
			const newInfo = { ...this.info };
			this.$emit('submitting', newInfo, 'noteVideo');
			this.info.url = '';
			this.info.title = '';
		},

		updateUrl(val) {},
		isFromFile() {
			this.fromFile = !this.fromFile;
		},
	},
	created() {
		if (this.editedNote) {
			this.info.title = this.editedNote.info.title;
			this.info.url = this.editedNote.info.url;
		}
	},
};

// id: storageService.makeId(),
// 			style: { backgroundColor: 'lightblue' },
// 			type: 'noteImg',
// 			info: {
// 				url: 'https://img.vcomments.com/en/funny/47.jpg',
// 				title: 'Me   playing Mi',
// 			},

// https://cdn.vox-cdn.com/thumbor/8CIbT8aMgmLzG6vTzbWil2LwdWk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19938259/3zlqxf_copy.jpg
