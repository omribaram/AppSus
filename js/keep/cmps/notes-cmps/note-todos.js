// import notePreviewTodos from './note-preview-todos.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
	props: ['note'],
	template: `
	<section class="note note-todos ">
		<p class="boldTxt">{{note.info.label}}</p>
		<ul>
			<li class="todos" v-for="(todo,idx) in note.info.todos"> 
				<label > 
					<input v-model="todo.isChecked" @click="complete(todo,idx)" type="checkbox" :name="todo.txt" :id="todo.txt">
					{{todo.txt}} 
					<span class="todos-completed" v-if="todo.isChecked" > {{formatDate(todo.doneAt)}} ({{formatTime(todo.doneAt)}})</span>
				</label>
			</li>
		</ul>
		
	</div>
	
	</section>
    `,

	methods: {
		formatTime(time) {
			return new Date(time).toLocaleTimeString('en-il');
		},
		formatDate(time) {
			const date = new Date(time);
			return new Intl.DateTimeFormat('en-il').format(date);
		},

		complete(todo, idx) {
			const completedTodo = { ...todo };
			if (!todo.isChecked) {
				completedTodo.isChecked = true;
				completedTodo.doneAt = Date.now();
				this.note.info.todos[idx] = completedTodo;
				eventBus.$emit('checked', this.note);
			} else {
				todo.isChecked = false;
				eventBus.$emit('checked', this.note);
			}
		},
	},

	mounted() {},

	created() {},
};
