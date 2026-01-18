// index.js
import "./styles.css";

// src/index.js
import { createMemo } from "./memo.js";
import { getMemos, storeMemo } from "./storage.js";

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
