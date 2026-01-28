// index.js
// App entry point: initializes state and wires main UI actions

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

// New Memo Button
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

// New List Button
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
