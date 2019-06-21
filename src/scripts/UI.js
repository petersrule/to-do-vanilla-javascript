export class UI {
  constructor() {
    this.todosEle = document.querySelector('#todos');
    this.filterInput = document.querySelector('#filter-text');
    this.hideCompletedCheckbox = document.querySelector('#hide-completed');
    this.newTodoForm = document.querySelector('#new-todo');
    this.status = document.querySelector('#status');
  }

  renderTodos(state) {
    const filteredTodos = state.todos.filter(todo => {
      return todo.todo
        .toLowerCase()
        .includes(state.filters.searchText.toLowerCase());
    });

    const incompleteTodos = filteredTodos.filter(todo => !todo.isCompleted);
    this.status.textContent = `You have ${
      incompleteTodos.length
    } todos unfinished`;

    this.todosEle.innerHTML = '';
    filteredTodos.forEach(todo => {
      if (!this.hideCompletedCheckbox.checked) {
        this.generateTodosDOM(todo, state);
      } else if (!todo.isCompleted) {
        this.generateTodosDOM(todo, state);
      }
    });
  }

  generateTodosDOM(todo, state) {
    const todoDiv = document.createElement('div');
    const removeButton = document.createElement('button');
    const todoLabel = document.createElement('label');
    const todoCheckbox = document.createElement('input');
    const todoCheckMark = document.createElement('i');
    const todoText = document.createElement('span');

    // set up todo text(span)
    todoText.innerText = todo.todo;

    // set up 'i'/checkMark element
    todoCheckMark.setAttribute('class', 'fas fa-check fi-xwsuxl-check');

    // set up checkbox
    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.checked = todo.isCompleted;
    todoCheckbox.addEventListener('change', e => {
      state.toggleCompletionStatus(todo.id, this);
      this.renderTodos(state);
    });

    // set up the button
    removeButton.innerText = 'X';
    removeButton.addEventListener('click', () => {
      state.removeTodo(todo.id, this);
      this.renderTodos(state);
    });

    // add elements to label
    todoLabel.appendChild(todoCheckbox);
    todoLabel.appendChild(todoCheckMark);
    todoLabel.appendChild(todoText);

    // add elements to div
    todoDiv.appendChild(todoLabel);
    todoDiv.appendChild(removeButton);
    todoDiv.setAttribute('class', 'todo');
    this.todosEle.appendChild(todoDiv);
  }
}
