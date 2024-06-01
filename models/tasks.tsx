export class Task {
  constructor(id, content: string, isDone: boolean) {
    this.id = id;
    this.content = content;
    this.isDone = isDone;
  }
}

export class Categories {
  constructor(id, tasks: [Task]) {
    this.id = id;
    this.tasks = tasks;
  }
}
