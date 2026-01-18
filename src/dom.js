const container = document.getElementById("container");

export function updateDisplay(memos) {
  for (let i = 0; i < memos.length; i++) {
    const memoData = memos[i];
    const memoCard = document.createElement("p");
    memoCard.textContent = memoData.title;
    memoCard.classList.add("memo-card");
    container.append(memoCard);
  }
}

//to render memos, our dom should
//iterate through the array of memos
//and post each one!
