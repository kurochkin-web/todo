const todoItem = {
	props: ["todo", "index"],
	emits: ["complete-todo"],
	methods: {
		makeComplete(){
			this.$emit("complete-todo");
		}
	},
	
	template: `
		<div>
			{{ todo.title }}
			<input type="checkbox" :checked="todo.completed"
			v-on:click="makeComplete">
		</div>
	`,
};

const app = Vue.createApp({
	data(){
		return {
			todoList: [ ],
		}
	},

	components: {
		"todo-item": todoItem,
	},

	methods:{
		makeDone(index){
			this.todoList[index].completed = !this.todoList[index].completed;
		},
		add() {
			if(!this.itemForAdd.trim()) {
				return;
			}
			this.todoList.push(
				{
					"title": this.itemForAdd,
					"completed": false,
					"noActive": false,
					"id": this.todoList.lenght,
				},
			);
		},

		del(index) {
			this.todoList.splice(index, 1);
		},

		filter1(){
			this.todoList.forEach(element => {
				if(element.completed == false) {
					element.noActive = true
				}

				else {
					element.noActive = false;
				}
			})
		},

		filter2(){
			this.todoList.forEach(element => {
				if(element.completed == true) {
					element.noActive = true
				}
				else {
					element.noActive = false;
				}
			})
		},

		filter3(){
			this.todoList.forEach(element => {
				element.noActive = false;
			})
		},

		sort1(){
			this.todoList = this.todoList.sort((a,b)=> a.title > b.title ? 1 : -1);
		},

		sort2(){
			this.todoList = this.todoList.sort((a,b)=> a.id < b.id ? 1 : -1);
		},

		sort3(){
			this.todoList = this.todoList.sort((a,b)=> a.id > b.id ? 1 : -1);
		},

	},

	mounted(){
		// fetch('https://jsonplaceholder.typicode.com/todos/')
		// .then(response => response.json())
		// .then(json => (this.todoList = json))
	},
});

app.mount("#app");