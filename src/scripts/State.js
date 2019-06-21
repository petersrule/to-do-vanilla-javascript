import { Todo } from './Todo';

export class State {
  constructor() {
    this.todos = [];
    this.filters = {
      searchText: '',
      hideCompleted: false
    };
  }

  toggleCompletionStatus(id) {
    const todo = this.todos.find(todo => todo.id === id);

    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      this.saveTodos();
    }
  }

  getSavedTodos() {
    const todosJSON = localStorage.getItem('todos');

    try {
      this.todos = todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
      this.todos = [];
    }
  }

  removeTodo(id) {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex > -1) {
      this.todos.splice(todoIndex, 1);
    } else {
      console.log('Error on removal');
    }
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  createTodo(todo) {
    this.todos.push(new Todo(todo));
    this.saveTodos();
  }

  // getTodos() {
  //   return this.todos;
  // }

  // getFilters() {
  //   return this.filters;
  // }
}
