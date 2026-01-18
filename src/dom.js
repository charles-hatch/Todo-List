//dom.js

const container = document.getElementById("memo-container");

export function updateDisplay(memos) {
  container.innerHTML = "";

  for (let i = 0; i < memos.length; i++) {
    const memoData = memos[i];
    const memoCard = document.createElement("p");

    const memoTitle = document.createElement("p");
    memoTitle.textContent = memoData.title;

    const memoDescription = document.createElement("p");
    memoDescription.textContent = memoData.description;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
      alert("Clicked " + memoData.title);
    });

    memoCard.append(memoTitle, memoDescription, deleteBtn);

    memoCard.classList.add("memo-card");

    container.append(memoCard);
  }
}

//to render memos, our dom should
//iterate through the array of memos
//and post each one!

// HOW DO WE DELETE?
