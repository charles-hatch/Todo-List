//lists.js

export function addList(title) {
  return {
    id: crypto.randomUUID(),
    title,
    memos: [],
  };
}
