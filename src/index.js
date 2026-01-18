// index.js
import "./styles.css";

// src/index.js
import { createMemo } from "./memo.js";
import { getMemos, storeMemo } from "./storage.js";
import "./dom.js";

// create
const memo1 = createMemo("Buy milk");
storeMemo(memo1);

const memo2 = createMemo("Study JS");
storeMemo(memo2);
//basic flow

console.log(getMemos());
//return our storage

// import odinImage from "./img/odin.png";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);

// TOGGLE AND TITLE SET TEST CODE
memo1.toggleCompleted();
console.log(memo1.completed); // true
memo1.setTitle("Test");
console.log(memo1);

//pipeline
// Build minimal DOM rendering (list memos, toggle, delete)

// Wire DOM events through index.js only

// Add project support (projects contain memo lists)

// Refactor storage to support multiple lists

// Add persistence (localStorage)

// Clean up module boundaries and naming

// Add basic styling and UX improvements

// Final review and small refactors
