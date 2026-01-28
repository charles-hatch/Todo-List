// storage.js
// Centralized application state and persistence (lists, current selection)

import { updateDisplay } from "./dom";
import { addList } from "./lists";

// In-memory state
const lists = [];
let currentList = null;

// localStorage key
const STORAGE_KEY = "memo-app-data";

// Save current state to localStorage
export function saveToStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      lists,
      currentListId: currentList?.id ?? null,
    }),
  );
}

// Load state from localStorage
export function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw) {
    const data = JSON.parse(raw);

    // Reset and restore lists
    lists.length = 0;
    lists.push(...data.lists);

    // Restore current list selection
    currentList = lists.find((l) => l.id === data.currentListId) || null;
  }

  // Ensure a default list always exists
  if (!lists.some((l) => l.isDefault)) {
    const defaultList = addList("Default");
    defaultList.isDefault = true;
    lists.unshift(defaultList);
    currentList = defaultList;
  }

  saveToStorage();
  updateDisplay();
}

// =====================
// Lists
// =====================

// Add new list
export function storeList(list) {
  lists.push(list);
  saveToStorage();
  updateDisplay();
}

// Rename list
export function renameList(list, newTitle) {
  if (!list) return;
  if (!newTitle.trim()) return;

  list.title = newTitle;
  saveToStorage();
  updateDisplay();
}

// Remove a list and update current selection if needed
export function deleteList(list) {
  if (list.isDefault) {
    alert("The Default list cannot be deleted.");
    return;
  }

  const index = lists.findIndex((l) => l.id === list.id);
  if (index === -1) return;

  const wasCurrent = currentList?.id === list.id;
  lists.splice(index, 1);

  // Choose fallback list
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

// Set the currently active list
export function setCurrentList(list) {
  currentList = list;
  saveToStorage();
  updateDisplay();
}

export function getLists() {
  return lists;
}

export function getCurrentList() {
  return currentList;
}

// =====================
// Memos
// =====================

// Add a memo to the current list
export function storeMemo(memo) {
  if (!currentList) return;
  currentList.memos.push(memo);
  saveToStorage();
  updateDisplay();
}

// Toggle memo completion state
export function toggleMemoCompleted(id) {
  const memo = currentList.memos.find((m) => m.id === id);
  if (!memo) return;

  memo.completed = !memo.completed;
  saveToStorage();
  updateDisplay();
}

// Delete memo
export function deleteMemoById(id) {
  const index = currentList.memos.findIndex((m) => m.id === id);
  if (index !== -1) currentList.memos.splice(index, 1);
  saveToStorage();
  updateDisplay();
}
