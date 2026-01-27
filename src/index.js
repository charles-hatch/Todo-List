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

//FINAL TO DO LIST
// reduction, does everything, all the modules, etc. make sense where they are? are there strange imports?
// is it a well designed project?
// ADD COMMENTS (IN JP?)
// REMOVE / REDUCE complexity
// review styling and make sure it all looks good for portfolio
// i want to understand the code and make sure i understand it
// is my font sizing ok?
// is it uniform? are we using proper resizability?
