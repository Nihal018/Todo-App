export class Task {
  constructor(id, content: string, isDone: boolean, category: string) {
    this.id = id;
    this.content = content;
    this.isDone = isDone;
    this.category = category;
  }
}
