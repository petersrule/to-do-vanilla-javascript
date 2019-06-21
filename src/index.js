import { State } from './scripts/State';
import { UI } from './scripts/UI';

const state = new State();
const ui = new UI();

state.getSavedTodos();
ui.renderTodos(state);

ui.newTodoForm.addEventListener('submit', e => {
  e.preventDefault();
  const todo = e.target.elements.newTodo.value;
  e.target.elements.newTodo.value = '';
  state.createTodo(todo);
  ui.renderTodos(state);
});

ui.filterInput.addEventListener('input', e => {
  state.filters.searchText = e.target.value;
  ui.renderTodos(state);
});

ui.hideCompletedCheckbox.addEventListener('change', () => {
  state.filters.hideCompleted = !state.filters.hideCompleted;
  ui.renderTodos(state);
});

window.addEventListener('storage', e => {
  console.log('storage start');
  if (e.key === 'todos') {
    console.log('inside if');
    state.getSavedTodos();
    ui.renderTodos(state);
  }
});
