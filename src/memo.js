// memo.js
export function createMemo(title, description, dueDate) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    completed: false,
  };
}
