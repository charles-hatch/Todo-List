//storage.js

import { updateDisplay } from "./dom";
import { addList } from "./lists";

const lists = [];
let currentList = null;

const STORAGE_KEY = "memo-app-data";

export function saveToStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      lists,
      currentListId: currentList?.id ?? null,
    }),
  );
}

export function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw) {
    const data = JSON.parse(raw);
    lists.length = 0;
    lists.push(...data.lists);
    currentList = lists.find((l) => l.id === data.currentListId) || null;
  }

  if (!lists.some((l) => l.isDefault)) {
    const defaultList = addList("Default");
    defaultList.isDefault = true;
    lists.unshift(defaultList);
    currentList = defaultList;
  }

  saveToStorage();
  updateDisplay();
}

//LISTS
export function setCurrentList(list) {
  currentList = list;
  saveToStorage();
  updateDisplay();
}

export function storeList(list) {
  lists.push(list);
  saveToStorage();
  updateDisplay();
}

export function storeMemo(memo) {
  if (!currentList) return;
  currentList.memos.push(memo);
  saveToStorage();
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
  saveToStorage();
  updateDisplay();
}

export function renameList(list, newTitle) {
  if (!list) return;
  if (!newTitle.trim()) return;

  list.title = newTitle;
  saveToStorage();
  updateDisplay();
}

export function deleteList(list) {
  if (list.isDefault) {
    alert("The Default list cannot be deleted.");
    return;
  }

  const index = lists.findIndex((l) => l.id === list.id);
  if (index === -1) return;

  const wasCurrent = currentList?.id === list.id;

  lists.splice(index, 1);

  if (wasCurrent) {
    currentList =
      lists.find((l) => l.isDefault) ||
      lists[index - 1] ||
      lists[index] ||
      null;
  }

  saveToStorage();
  updateDisplay();
}

//current list deletion... is it redundant?
export function toggleMemoCompleted(id) {
  const memo = currentList.memos.find((m) => m.id === id);
  if (!memo) return;

  memo.completed = !memo.completed;
  saveToStorage();
  updateDisplay();
}
