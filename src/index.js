// index.js
import "./styles.css";
import { createMemo } from "./memo.js";
import { addList } from "./lists.js";
import { openModal } from "./modal.js";
import { storeMemo, storeList, setCurrentList } from "./storage.js";

const defaultList = addList("Default");
storeList(defaultList);
setCurrentList(defaultList);
//sets our default list for page setup

// #### TESTING CODE #### //
const TEST_DUE_DATE = "2026-02-01T00:00:00.000Z";
const memo1 = createMemo(
  "Memo Example",
  "Description goes here",
  TEST_DUE_DATE,
);
// storeMemo(memo1);
// const secondList = addList("List 2!");
// storeList(secondList);
// #### TESTING CODE #### //

//BUTTONS
const newMemoBtn = document.getElementById("new-memo-btn");
newMemoBtn.addEventListener("click", () => {
  const title = prompt("Memo title:");
  if (!title) return;
  const description = prompt("Memo description:");
  // TEMP: no UI yet, so no due date
  const memo = createMemo(title, description, null);
  storeMemo(memo);
});

const newListBtn = document.getElementById("new-list-btn");
newListBtn.addEventListener("click", () => {
  openModal({
    title: "New List",
    placeholder: "List name",
    onSubmit: (value) => {
      if (!value.trim()) return;
      const list = addList(value.trim());
      storeList(list);
      setCurrentList(list);
    },
  });
});

//TO DO LIST
// UPDATE THE INPUT FORM FOR MEMOS, then add due date. Functionality is already there. Just need to be posted to DOM.
// due date?
//priority dropdown
//if the list is empty, could we make a message like
//"your list is empty, add it from below!"
// we could have a ?? button to get help or info
// edit button for memos, to pull up an input box for creation
//https://github.com/date-fns/date-fns
//local storage
//Create a better "FORM" for inputting new memos/lists
//delete list warning popup design improved
//clean and fix AI and spacing
//code check
//comments and GPT review

// console.log("Current list memos:", getCurrentList().memos);
// console.log("Current list: ", getCurrentList().title);
// console.log("Default list memos:", defaultList.memos);
// console.log("List 2 list memos:", secondList.memos);

// const memo1 = createMemo("Memo Example", "Description goes here");
// storeMemo(memo1);
// memo1.toggleCompleted();
// console.log(memo1.completed); // true
// memo1.setTitle("Homework");
// console.log(memo1);
// // TOGGLE AND TITLE SET TEST CODE
