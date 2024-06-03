export class Task {
  id: number;
  content: string;
  isDone: boolean;
  category: string;

  constructor(id: number, content: string, isDone: boolean, category: string) {
    this.id = id;
    this.content = content;
    this.isDone = isDone;
    this.category = category;
  }
}
