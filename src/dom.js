//dom.js
import { format, parseISO, isValid } from "date-fns";
import { openModal } from "./modal.js";
import {
  deleteMemoById,
  setCurrentList,
  getCurrentList,
  getLists,
  renameList,
  deleteList,
} from "./storage.js";

const memoContainer = document.getElementById("memo-container");
const listContainer = document.getElementById("list-container");
// const listNameContainer = document.getElementById("list-name-container");

export function updateDisplay() {
  const currentList = getCurrentList();
  if (!currentList) return;
  const lists = getLists();

  memoContainer.innerHTML = "";
  listContainer.innerHTML = "";

  // listNameContainer.textContent = currentList.title;

  lists.forEach((listData) => {
    const listRow = document.createElement("div");
    listRow.classList.add("list-row");

    if (listData === currentList) {
      listRow.classList.add("list-active");
    }

    const titleSpan = document.createElement("span");
    titleSpan.textContent = listData.title;

    const settingsBtn = document.createElement("button");
    settingsBtn.classList.add("list-settings-btn");
    settingsBtn.textContent = "⚙";

    const dropdown = document.createElement("div");
    dropdown.classList.add("list-dropdown");
    dropdown.hidden = true;

    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename List";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete List";

    renameBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.hidden = true;

      openModal({
        title: "Rename List",
        value: listData.title,
        onSubmit: ({ title }) => {
          if (!title?.trim()) return;
          renameList(listData, title.trim());
        },
      });
    });

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.hidden = true;

      openModal({
        title: "Delete this list?",
        showInput: false,
        onSubmit: () => deleteList(listData),
      });
    });

    dropdown.append(renameBtn, deleteBtn);

    listRow.addEventListener("click", () => {
      setCurrentList(listData);
    });

    settingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      document
        .querySelectorAll(".list-dropdown")
        .forEach((d) => (d.hidden = true));

      dropdown.hidden = !dropdown.hidden;
    });

    listRow.append(titleSpan, settingsBtn, dropdown);
    listContainer.append(listRow);
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
    deleteBtn.classList.add("delete-btn");

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

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      openModal({
        title: "Edit Memo",
        value: memoData.title,
        textareaValue: memoData.description,
        showTextarea: true,
        showDate: true,
        dateValue: memoData.dueDate ?? "",
        onSubmit: ({ title, description, dueDate }) => {
          if (!title?.trim()) return;

          memoData.title = title.trim();
          memoData.description = description;
          memoData.dueDate = dueDate;

          updateDisplay();
        },
      });
    });

    const label = document.createElement("label");
    label.textContent = "Done";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = memoData.completed;
    checkbox.addEventListener("change", () => {
      memoData.toggleCompleted();
    });

    label.append(checkbox);
    footer.append(editBtn, label);

    memoCard.append(header, memoDescription, dueDateEl, footer);

    memoContainer.append(memoCard);
  });
}
