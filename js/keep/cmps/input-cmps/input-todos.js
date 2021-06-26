// TODO: GOT A WEIRD BUG, WAS NOT ABLE TO REPRODUCE
// TODO: CHECK WHAT HAPPENS IN EDIT - CAN ONLY ADD ONE ROW

export default {
	props: ['editedNote'],
	template: `  
    <form class="keep-form-todos" @keyup.enter="submit"  >
		<h3 v-if="editedNote"> Edit Todos Note  </h3>
		<h4 class="keep-add-text" v-else> Add Todos Note </h4>
        <input  v-model="info.label" class="input-keep" type="text" placeholder="Write Task Title">
        <section class="todos-input" v-for="todo in info.todos"> 
	        <input class="input-keep-todo" v-model="todo.txt" @change="makeIdx(todo)"  type="text" placeholder="Add Task"> 
			<button class="button-keep todos" @click="removeLine(todo)"> <img class="keep-button-img" src='img/apps/keep/minus.png' alt="Remove Line"></button>
            <button class="button-keep todos" @click="addLine"> <img class="keep-button-img" src="img/apps/keep/plus.png" alt="Add Line"></button></button>
        </section>
            <button class="button-keep" @click="submit">Submit </button>
    </form>`,

	data() {
		return {
			info: {
				label: null,
				todos: [
					{
						id: null,
						txt: null,
						doneAt: null,
						isMarked: false,
					},
				],
			},
		};
	},

	methods: {
		submit() {
			const newInfo = JSON.parse(JSON.stringify(this.info));
			this.$emit('submitting', newInfo, 'noteTodos');
			this.info.label = '';
			this.info.todos.forEach((todo) => {
				todo.txt = '';
			});
		},

		makeIdx(todo) {
			const idx = 0;
			const id = 'idx' + this.info.todos.length;
			todo.id = id;
		},

		addLine() {
			if (this.editedNote) {
				this.info.todos = [...this.editedNote.info.todos];
			}
			const newTodo = {
				id: null,
				txt: null,
				doneAt: null,
				isMarked: false,
			};
			this.info.todos.push(newTodo);
		},

		removeLine(todo) {
			if (this.editedNote) {
				this.info.todos = [...this.editedNote.info.todos];
			}
			const todoId = todo.id;
			const idx = this.info.todos.findIndex((todo) => todo.id === todoId);
			this.info.todos.splice(idx, 1);
		},
	},
	mounted() {},

	created() {
		if (this.editedNote) {
			this.info.label = this.editedNote.info.label;
			this.info.todos = [...this.editedNote.info.todos];
		}
	},
};
