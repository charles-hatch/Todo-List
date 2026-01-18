//storage.js

const memos = [];
//temp storage

export function storeMemo(memo) {
  memos.push(memo);
}

export function getMemos() {
  return memos;
}

export function deleteMemoById(id) {
  const index = memos.findIndex((m) => m.id === id);
  if (index !== -1) memos.splice(index, 1);
}
