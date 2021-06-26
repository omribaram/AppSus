import { keepService } from '../services/keep-service.js';
import { eventBus } from '../../services/event-bus-service.js';
import noteList from '../cmps/note-list.js';
import inputImg from '../cmps/input-cmps/input-img.js';
import inputVideo from '../cmps/input-cmps/input-video.js';
import inputTxt from '../cmps/input-cmps/input-txt.js';
import inputTodos from '../cmps/input-cmps/input-todos.js';
import noteFilter from '../cmps/note-filter.js';

export default {
	template: `
    <section v-if="notes.length" class="keepApp-app" >
		<section class="header-control">
		<note-filter class="note-search-bar" @filtered="setFilter"    />
			<label class="note-add-control-panel" >
				<component v-if="!editedNote" @submitting="renderNote" :is="inputType" :info="newInfo" :editedNote="editedNote" > </component>
				
				<div v-if="editedNote" class="modal-container" @click.self="editedNote = null ">
					<component class="keep-modal-content" @submitting="renderNote" :is="inputType" :info="newInfo" :editedNote="editedNote" > </component>
				</div> 
				<div class="add-buttons">
				<button class="button-keep" @click="setType('noteTxt')">  <img title="Add Text" src="img/apps/keep/text.png" alt="addTxt"> </button>
				<button class="button-keep" @click="setType('noteImg')"> <img title="Add Image" src="img/apps/keep/image.png" alt="addImg"> </button>
				<button class="button-keep" @click="setType('noteTodos')"> <img title="Add Todos" src="img/apps/keep/checkbox.png" alt="addChkBox"> </button>          
				<button class="button-keep" @click="setType('noteVideo')"> <img title="Add Video" src="img/apps/keep/video.png" alt="addChkBox"> </button>          
				</div>
			</label>
		</section>
        <note-list @editing="onUpdateNote(note)" :notes="notesToShow" @deleted="deleteNote" @ /> 
		
    </section>
    `,

	components: {
		noteList,
		eventBus,
		keepService,
		inputImg,
		inputTxt,
		inputTodos,
		inputVideo,
		noteFilter,
	},

	data() {
		return {
			notes: [],
			inputType: 'inputTxt',
			newInfo: null,
			isEdit: false,
			editedNote: null,
			filterBy: null,
		};
	},

	methods: {
		setFilter(filterBy) {
			this.filterBy = filterBy.txt;
		},

		renderNote(info, type) {
			if (!this.isEdit) {
				keepService.addNote(type, info).then(() => {
					this.loadNotes();
					const msg = {
						txt: 'Note has been added successfully',
						type: 'success',
					};
					eventBus.$emit('show-msg', msg);
					document.body.scrollTop = document.body.scrollHeight;
					document.documentElement.scrollTop =
						document.documentElement.scrollHeight;

					//
				});
			} else {
				this.editedNote.info = info;
				this.isEdit = false;
				keepService.updateNote(this.editedNote).then(() => {
					this.loadNotes();
					const msg = {
						txt: 'Note has been edited successfully',
						type: 'success',
					};
					eventBus.$emit('show-msg', msg);
					this.editedNote = null;
				});
			}
			document.body.scrollTop = document.body.scrollHeight;
			document.documentElement.scrollTop =
				document.documentElement.scrollHeight;
		},

		setType(type) {
			switch (type) {
				case 'noteImg':
					this.inputType = 'inputImg';
					break;
				case 'noteTxt':
					this.inputType = 'inputTxt';
					break;
				case 'noteTodos':
					this.inputType = 'inputTodos';
					break;
				case 'noteVideo':
					this.inputType = 'inputVideo';
					break;

				default:
					break;
			}
		},
		loadNotes() {
			keepService.query().then((notes) => {
				this.notes = notes;
			});
		},

		deleteNote(note) {
			keepService.removeNote(note).then(() => {
				this.loadNotes();
				const msg = {
					txt: 'Note has been deleted successfully',
					type: 'success',
				};
				eventBus.$emit('show-msg', msg);
			});
		},

		editNote(note) {
			this.setType(note.type);
			this.editedNote = { ...note };
			// this.editedNote = JSON.parse(JSON.stringify(this.note));
			this.isEdit = true;
		},

		onUpdateNote(note) {
			keepService.updateNote(note).then(() => {
				this.loadNotes();
			});
		},

		pinned(note) {
			this.onUpdateNote(note);
		},
	},

	computed: {
		notesToShow() {
			if (!this.filterBy) {
				return this.notes;
			}
			const searchStr = this.filterBy.toLowerCase();
			const notesToShow = this.notes.filter((note) => {
				if (note.type === 'noteTxt')
					return note.info.txt.toLowerCase().includes(searchStr);
				if (note.type === 'noteImg')
					return note.info.title.toLowerCase().includes(searchStr);
				if (note.type === 'noteVideo')
					return note.info.title.toLowerCase().includes(searchStr);
				// TODO: search fakes??? try 'what'
				if (note.type === 'noteTodos') {
					const foundTodos = note.info.todos.filter((todo) =>
						todo.txt.toLowerCase().includes(searchStr)
					);
					return (
						note.info.label.toLowerCase().includes(searchStr) ||
						foundTodos.length > 0
					);
				}
			});
			return notesToShow;
		},
	},

	watch: {
		'this.$route.params.email': {
			immediate: true,
			handler() {
				if (!this.$route.params.email) return;
				const { email } = this.$route.params;
				const emailNote = {};
				emailNote.info = {
					title: email.subject,
					txt: email.body,
				};
				if (
					emailNote.info.title === undefined &&
					emailNote.info.txt === undefined
				)
					return;
				emailNote.type = 'noteTxt';
				this.renderNote(emailNote.info, emailNote.type);
			},
		},
	},

	// TODO FIGURE OUT WHY ONLY BUS WORKS ON EDITNOTE (DIRECT EMIT DID NOT WORK)
	created() {
		eventBus.$on('checked', this.onUpdateNote);
		eventBus.$on('pinned', this.onUpdateNote);
		eventBus.$on('loadFile', this.onUpdateNote);
		eventBus.$on('bcgolored', this.onUpdateNote);
		eventBus.$on('editedNote', this.editNote);
		this.loadNotes();
	},

	destroyed() {
		eventBus.$off('checked');
		eventBus.$off('pinned');
		eventBus.$off('editedNote');
		eventBus.$off('bcgolored');
	},
};
