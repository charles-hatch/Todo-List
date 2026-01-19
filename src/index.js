// index.js
import "./styles.css";

// src/index.js
import { createMemo } from "./memo.js";
import {
  getMemos,
  storeMemo,
  deleteMemoById,
  storeList,
  getLists,
  setCurrentList,
  getCurrentList,
} from "./storage.js";
import { updateDisplay } from "./dom.js";
import { addList } from "./lists.js";

// let currentList;
const defaultList = addList("Default");
storeList(defaultList);
setCurrentList(defaultList);
// currentList = getCurrentList();
//expand into function?

const secondList = addList("List 2!");
storeList(secondList);
console.log("Current list " + getLists());
//by default memos are always added to default unless the user "opens" the other list, or chooses it as a dropdown?

const memo1 = createMemo(
  "Buy milk",
  "Done but I need to remember for next week..",
);
storeMemo(memo1);
//basic flow

const memo2 = createMemo(
  "Buy milk",
  "Not done, I love Milk so much. Dont forget!",
);
storeMemo(memo2);

console.log(getMemos());
memo1.toggleCompleted();
console.log(memo1.completed); // true
memo1.setTitle("Homework");
console.log(memo1);
// TOGGLE AND TITLE SET TEST CODE

const memoState = getMemos(); //return current array
const listState = getLists();
updateDisplay(memoState, listState);
console.log(memoState);

console.log("Current list memos:", getCurrentList().memos);
console.log("Default list memos:", defaultList.memos);
console.log("List 2 list memos:", secondList.memos);

const newMemoBtn = document.getElementById("new-memo-btn");
newMemoBtn.addEventListener("click", () => {
  const title = prompt("Memo title:");
  if (!title) return;
  const description = prompt("Memo description:");
  const memo = createMemo(title, description);
  storeMemo(memo);
  updateDisplay(memoState, listState);
  console.log("Current memos = " + memoState);
});

const newListBtn = document.getElementById("new-list-btn");
newListBtn.addEventListener("click", () => {
  const title = prompt("New List title:");
  if (!title) return;
  const newList = addList(title);
  storeList(newList);
  updateDisplay(memoState, listState);
  console.log("New list added " + newList);
  console.log("Current list " + getLists());
});

//TO DO LIST
//ADD PROJECTS
//Create a better "FORM" for inputting new memos/lists

//pipeline
// Add project support (projects contain memo lists)
// Refactor storage to support multiple lists
// Add persistence (localStorage)
// Clean up module boundaries and naming
// Add basic styling and UX improvements
// Final review and small refactors, code cleanup, add comments

// import odinImage from "./img/odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);
