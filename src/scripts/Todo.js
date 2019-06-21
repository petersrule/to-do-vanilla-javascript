import uuid from 'uuid/v4';

export class Todo {
  constructor(todo) {
    this.id = uuid();
    this.todo = todo;
    this.isCompleted = false;
  }

  toggleCompletionStatus() {
    this.isCompleted = !this.isCompleted;
  }
}
