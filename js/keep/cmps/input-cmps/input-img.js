// TODO: SUPPORT UPLOAD FROM FILE - research File Reader

import { eventBus } from '../../services/event-bus-service.js';

export default {
	props: ['editedNote'],
	template: `  
    
        <form class="keep-form" v-on:keyup.enter="submit">
			<h3 v-if="editedNote"> Edit Image Note  </h3>
			<h4 class="keep-add-text" v-else> Add Image Note </h4>
            <input class="input-keep" v-model="info.title"  type="text" placeholder="Write Title">
            <input v-if="!fromFile" class="input-keep" type="url" v-model="info.url" placeholder="Enter URL" >
            <button type="button" class="button-keep" @click.prevent="isFromFile"> 
			<img  class="keep-button-img" src="img/apps/keep/upload.png" alt="uploadFile"> </button>
            <input v-if="fromFile" @change="loadTxtFromFile" type="file">
        </form> 
    `,

	data() {
		return {
			info: {
				url: null,
				title: null,
			},
			fromFile: false,
		};
	},

	components: {
		eventBus,
	},

	methods: {
		submit() {
			const newInfo = { ...this.info };

			this.$emit('submitting', newInfo, 'noteImg');
			this.info.url = '';
			this.info.title = '';
		},

		loadTxtFromFile(ev) {
			const file = ev.target.files[0];
			const reader = new FileReader();
			reader.onload = (fileLoad) => {
				this.info.url = fileLoad.target.result;
			};
			reader.readAsDataURL(file);
		},

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
