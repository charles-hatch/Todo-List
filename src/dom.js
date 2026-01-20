//dom.js
import { deleteMemoById, setCurrentList } from "./storage.js";

const memoContainer = document.getElementById("memo-container");
const listContainer = document.getElementById("list-container");

export function updateDisplay(memos, lists) {
  memoContainer.innerHTML = "";
  listContainer.innerHTML = "";

  lists.forEach((listData) => {
    const listBtn = document.createElement("button");
    listBtn.textContent = listData.title;
    listBtn.addEventListener("click", () => {
      console.log("List " + listBtn.title + " was clicked.");
      setCurrentList(listData, listData.title);
    });
    listBtn.classList.add("list-btns");
    listContainer.append(listBtn);
  });

  memos.forEach((memoData) => {
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
