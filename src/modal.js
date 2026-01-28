// modal.js
// Reusable modal component with configurable inputs and callbacks

const overlay = document.getElementById("modal-overlay");
const titleEl = document.getElementById("modal-title");
const inputEl = document.getElementById("modal-input");
const textareaEl = document.getElementById("modal-textarea");
const dateEl = document.getElementById("modal-date");
const cancelBtn = document.getElementById("modal-cancel");
const confirmBtn = document.getElementById("modal-confirm");

cancelBtn.classList.add("btn", "btn-ghost");
confirmBtn.classList.add("btn", "btn-primary");

// Stores the current submit handler
let onConfirm = null;

export function openModal({
  title,
  placeholder = "",
  textareaPlaceholder = "",
  value = "",
  textareaValue = "",
  showInput = true,
  showTextarea = false,
  showDate = false,
  dateValue = "",
  onSubmit,
}) {
  titleEl.textContent = title;
  onConfirm = onSubmit;

  inputEl.hidden = !showInput;
  textareaEl.hidden = !showTextarea;
  dateEl.hidden = !showDate;

  if (showInput) {
    inputEl.placeholder = placeholder;
    inputEl.value = value;
  }

  if (showTextarea) {
    textareaEl.placeholder = textareaPlaceholder;
    textareaEl.value = textareaValue;
  } else {
    textareaEl.value = "";
  }

  dateEl.value = showDate ? dateValue : "";

  overlay.hidden = false;
  (showInput ? inputEl : textareaEl)?.focus();
}

function closeModal() {
  overlay.hidden = true;
  inputEl.value = "";
  onConfirm = null;
}

cancelBtn.addEventListener("click", closeModal);

confirmBtn.addEventListener("click", () => {
  if (!onConfirm) return;

  onConfirm({
    title: inputEl.value,
    description: textareaEl.value,
    dueDate: dateEl.value || null,
  });

  closeModal();
});

// Keyboard accessibility
overlay.addEventListener("keydown", (e) => {
  if (overlay.hidden) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "Enter") confirmBtn.click();
});
