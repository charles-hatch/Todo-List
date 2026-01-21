//memo.js

let memoID = 0;

export function createMemo(title, description, dueDate) {
  return {
    id: memoID++,
    title,
    description,
    dueDate,
    completed: false,
    toggleCompleted() {
      this.completed = !this.completed;
    },
    setTitle(value) {
      [this.title] = value.split(" ");
    }, //rename function
  };
} //factory function to create our memo object
