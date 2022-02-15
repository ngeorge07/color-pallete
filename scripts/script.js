"use strict";

const roundPicker = document.querySelector("#color-front");
const colorPicker = document.querySelector("#color-input");

roundPicker.addEventListener("click", () => {
  colorPicker.click();
});

colorPicker.addEventListener("change", () => {
  roundPicker.style.backgroundColor = colorPicker.value;
});
