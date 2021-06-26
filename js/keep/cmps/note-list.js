// import notePreview from './note-preview.js';
import noteTxt from './notes-cmps/note-txt.js';
import noteImg from './notes-cmps/note-img.js';
import noteTodos from './notes-cmps/note-todos.js';
import noteVideo from './notes-cmps/note-video.js';

import { eventBus } from '../../services/event-bus-service.js';

export default {
	props: ['notes'],
	template: `
	
    <ul class="notesList">
            <li v-for="note in notes" :key="note.id"  class="note-container" :style="note.style"> 
                <component :style="note.style" :is="note.type" :note="note" > </component>
					<div class="note-control-panel">
					<button title="Pink" class="button-keep" @click="changeBcg('lightpink',note)"> <span class="circle circle-pink"> </span> </button>
					<button  title="Gray"  class="button-keep" @click="changeBcg('gray',note)"> <span  class="circle circle-gray"></span> </button>
					<button  title="Blue"  class="button-keep" @click="changeBcg('lightblue',note)"> <span  class="circle circle-lightblue"></span> </button>
					<button  title="Green"  class="button-keep" @click="changeBcg('lightgreen',note)"> <span  class="circle circle-lightgreen"></span> </button>


					<img title="Click to Pin" class="keep-button-img" @click="onPin(note)" :src="note.pinSrc" > 
				
					<button title="Delete Note" class="button-keep" @click="onDelNote(note)"> <img class="keep-button-img" src="img/apps/keep/delete.png" alt="Delete"> </button>
					<button title="Edit Note" class="button-keep" @click="onEditNote(note)"> <img class="keep-button-img" src="img/apps/keep/edit.png" alt="Edit"> </button>
					<button title="Email Note" class="button-keep" @click="email(note)"> <img class="keep-button-img" src="img/apps/keep/email.png" alt="Email"> </button>
					</div>
					
                <!-- <notePreview :note="note" /> -->
            </li>
        </ul>
    `,

	components: {
		// notePreview,
		noteTxt,
		noteImg,
		noteTodos,
		noteVideo,
	},

	data() {
		return {
			currNote: null,
			pinSrc: null,
			bcgColor: null,
		};
	},

	methods: {
		email(note) {
			this.$router.push({
				name: 'noteToEmail',
				params: { note: note },
			});
		},

		onPin(note) {
			if (!note.isPinned) {
				note.isPinned = !note.isPinned;
				note.style.order = '-1';
				note.pinSrc = 'img/apps/keep/pinned.png';
			} else {
				this.pinSrc = 'img/apps/keep/pin.png';
				note.isPinned = !note.isPinned;
				note.style.order = '0';

				note.pinSrc = 'img/apps/keep/pin.png';
			}

			eventBus.$emit('pinned', note);
		},

		changeBcg(color, note) {
			note.style.backgroundColor = color;
			eventBus.$emit('bcgolored', note);
		},

		onDelNote(note) {
			this.$emit('deleted', note.id);
		},

		// TODO FIGURE OUT WHY ONLY BUS WORKS ON EDITNOTE (DIRECT EMIT DID NOT WORK)
		onEditNote(note) {
			eventBus.$emit('editedNote', note);
			// this.$emit('editing', note);
			// this.$emit('editedNote', note.id);
		},
	},

	computed: {},

	created() {},
};
