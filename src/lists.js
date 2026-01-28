//lists.js
// Factory function for creating list objects

export function addList(title) {
  return {
    id: crypto.randomUUID(),
    title,
    memos: [],
  };
}
