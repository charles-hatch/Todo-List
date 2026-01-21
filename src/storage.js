//storage.js

import { updateDisplay } from "./dom";

const lists = [];

let currentList = null;

//LISTS
export function setCurrentList(list) {
  currentList = list;
  updateDisplay();
  console.log("The Current List was changed to " + currentList.title);
}

export function storeList(list) {
  lists.push(list);
  updateDisplay();
}

export function storeMemo(memo) {
  currentList.memos.push(memo);
  updateDisplay();
}

export function getLists() {
  return lists;
}

export function getCurrentList() {
  return currentList;
}

//MEMOS
export function getMemos() {
  return currentList.memos;
}

export function deleteMemoById(id) {
  const index = currentList.memos.findIndex((m) => m.id === id);
  if (index !== -1) currentList.memos.splice(index, 1);
  console.log("Memo deleted");
  updateDisplay();
}

export function deleteCurrentList() {
  if (!currentList) return;

  // never delete Default
  if (currentList.title === "Default") {
    alert("You can't delete your default list.");
    return;
  }

  const index = lists.findIndex((list) => list.id === currentList.id);
  if (index === -1) return;

  lists.splice(index, 1);

  // jump back to Default
  const defaultList = lists.find((list) => list.title === "Default") || null;
  currentList = defaultList;

  updateDisplay();
}
