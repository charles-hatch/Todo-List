// index.js
import "./styles.css";

// src/index.js
import { createMemo } from "./memo.js";
import { getMemos, storeMemo } from "./storage.js";
import "./dom.js";
import { updateDisplay } from "./dom.js";

// create
const memo1 = createMemo("Buy milk");
storeMemo(memo1);

const memo2 = createMemo("Study JS");
storeMemo(memo2);
//basic flow

console.log(getMemos());
//return our storage

memo1.toggleCompleted();
console.log(memo1.completed); // true
memo1.setTitle("Test");
console.log(memo1);
// TOGGLE AND TITLE SET TEST CODE

const memoState = getMemos();
updateDisplay(memoState);

//pipeline
// Build minimal DOM rendering (list memos, toggle, delete)

// Wire DOM events through index.js only

// Add project support (projects contain memo lists)

// Refactor storage to support multiple lists

// Add persistence (localStorage)

// Clean up module boundaries and naming

// Add basic styling and UX improvements

// Final review and small refactors

// import odinImage from "./img/odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);
