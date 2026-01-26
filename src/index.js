// index.js
import "./styles.css";
import { createMemo } from "./memo.js";
import { addList } from "./lists.js";
import { openModal } from "./modal.js";
import {
  getLists,
  loadFromStorage,
  storeMemo,
  storeList,
  setCurrentList,
} from "./storage.js";

loadFromStorage();

if (getLists().length === 0) {
  const defaultList = addList("Default");
  storeList(defaultList);
  setCurrentList(defaultList);
}

//BUTTONS
const newMemoBtn = document.getElementById("new-memo-btn");
newMemoBtn.addEventListener("click", () => {
  openModal({
    title: "New Memo",
    placeholder: "Enter your Memo's title... ",
    textareaPlaceholder: "Enter your Description...",
    showTextarea: true,
    showDate: true,
    onSubmit: ({ title, description, dueDate }) => {
      if (!title?.trim()) return;

      const memo = createMemo(title.trim(), description, dueDate || null);

      storeMemo(memo);
    },
  });
});

const newListBtn = document.getElementById("new-list-btn");
newListBtn.addEventListener("click", () => {
  openModal({
    title: "New List",
    placeholder: "List name",
    onSubmit: ({ title }) => {
      if (!title?.trim()) return;

      const list = addList(title.trim());
      storeList(list);
      setCurrentList(list);
    },
  });
});

//fix design
//clean and fix AI and spacing
//code check -- comments, AI spicing up, removing any redundant code

//shadow on memo highlight
// make it look "clean"
//"calm code down
// we relied on ai for styling and reworking the final parts too much
// //make sure we undertand the code and rework it to look
// more simple in places so i can talk about it

//style buttons
//style form
// fix modal spacing
//unify fonts
