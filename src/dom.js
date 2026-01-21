//dom.js
import { format, parseISO, isValid } from "date-fns";

import {
  deleteMemoById,
  setCurrentList,
  getCurrentList,
  getLists,
} from "./storage.js";

const memoContainer = document.getElementById("memo-container");
const listContainer = document.getElementById("list-container");
const listNameContainer = document.getElementById("list-name-container");

export function updateDisplay() {
  const currentList = getCurrentList();
  if (!currentList) return;
  const lists = getLists();

  memoContainer.innerHTML = "";
  listContainer.innerHTML = "";

  listNameContainer.textContent = currentList.title;

  lists.forEach((listData) => {
    const listBtn = document.createElement("button");
    listBtn.textContent = listData.title;
    listBtn.addEventListener("click", () => {
      console.log("Changing selected list...");
      setCurrentList(listData);
    });
    listBtn.classList.add("list-btns");
    listContainer.append(listBtn);
  });

  currentList.memos.forEach((memoData) => {
    const memoCard = document.createElement("div");
    memoCard.classList.add("memo-card");

    const header = document.createElement("div");
    header.classList.add("memo-header");

    const memoTitle = document.createElement("h3");
    memoTitle.textContent = memoData.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
      deleteMemoById(memoData.id);
    });

    header.append(memoTitle, deleteBtn);

    const memoDescription = document.createElement("p");
    memoDescription.textContent = memoData.description;

    // 👇 Due Date code
    let dueText = "No due date";

    if (memoData.dueDate) {
      const parsed = parseISO(memoData.dueDate);
      if (isValid(parsed)) {
        dueText = format(parsed, "MMM d, yyyy");
      }
    }

    const dueDateEl = document.createElement("small");
    dueDateEl.textContent = `Due: ${dueText}`;
    dueDateEl.classList.add("memo-due-date");
    // 👆Due date code

    const footer = document.createElement("div");
    footer.classList.add("memo-footer");

    const label = document.createElement("label");
    label.textContent = "Completed";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = memoData.completed;
    checkbox.addEventListener("change", () => {
      memoData.toggleCompleted();
    });

    label.append(checkbox);
    footer.append(label);

    memoCard.append(header, memoDescription, footer);
    memoContainer.append(memoCard);
  });
}
