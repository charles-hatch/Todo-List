//storage.js

import { updateDisplay } from "./dom";

const memos = [];
//temp storage

const lists = [];

let currentList = null;

//LISTS
export function storeList(list) {
  lists.push(list);
}

export function getLists() {
  return lists;
}

export function setCurrentList(list) {
  currentList = list;
}
export function getCurrentList(list) {
  return currentList;
}

//MEMOS
export function storeMemo(memo) {
  memos.push(memo);
  currentList.memos.push(memo); // correct
}

export function getMemos() {
  return memos;
}

export function deleteMemoById(id) {
  const index = memos.findIndex((m) => m.id === id);
  if (index !== -1) memos.splice(index, 1);
  updateDisplay(memos, lists);
  console.log("After delete, our list of memos is : " + memos);
}
