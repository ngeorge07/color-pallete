"use strict";

const roundPicker = document.querySelector("#color-front");
const colorPicker = document.querySelector("#color-input");
const modePicker = document.querySelector("#color-mode");

const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");

const allInfoBoxes = document.querySelectorAll(".info-box");

roundPicker.addEventListener("click", () => {
  colorPicker.click();
});

function getInitialColor() {
  roundPicker.style.backgroundColor = colorPicker.value;
  const initialHexColor = colorPicker.value;

  return initialHexColor;
}

modePicker.addEventListener("change", () => {
  const selectedOption = modePicker.options[modePicker.selectedIndex].value;

  const initialR = hexToRgb(getInitialColor()).r;
  const initialG = hexToRgb(getInitialColor()).g;
  const initialB = hexToRgb(getInitialColor()).b;

  const initialH = rgbToHsl(initialR, initialG, initialB).h;
  const initialS = rgbToHsl(initialR, initialG, initialB).s;
  const initialL = rgbToHsl(initialR, initialG, initialB).l;

  const result = modesAvailable[selectedOption](initialH, initialS, initialL);
});

const modesAvailable = {
  ana: function (h, s, l) {
    let x = 25;

    for (let i = 0; i < allInfoBoxes.length; i++) {
      allInfoBoxes[i].querySelector(".box").style.backgroundColor = `hsl(${
        h + x
      }, ${s}%, ${l}%)`;

      allInfoBoxes[i].querySelector(".box-hsl").innerHTML = `HSL: ${
        h + x
      }°, ${s}%, ${l}%`;

      allInfoBoxes[i].querySelector(".box-rgb").innerHTML = `RGB: ${
        hslToRgb(h + x, s, l).r
      }, ${hslToRgb(h + x, s, l).g}, ${hslToRgb(h + x, s, l).b}`;
      x += 25;
    }
  },
  mono: function (initialColor) {
    // document.querySelector("#box1").style.backgroundColor = initialColor;
  },
  triad: function (a) {
    return `a+ 3`;
  },
  comp: function (a) {
    return `a+4`;
  },
  compound: function (a) {
    return `a+5`;
  },
  shades: function (a) {
    return `a+5`;
  },
};

colorPicker.addEventListener("change", () => {
  const r = hexToRgb(getInitialColor()).r;
  const g = hexToRgb(getInitialColor()).g;
  const b = hexToRgb(getInitialColor()).b;

  const h = rgbToHsl(r, g, b).h;
  const s = rgbToHsl(r, g, b).s;
  const l = rgbToHsl(r, g, b).l;

  document.querySelector("#hex0").innerHTML = `HEX: ${getInitialColor()}`;
  document.querySelector("#rgb0").innerHTML = `RGB: ${r}, ${g}, ${b}`;
  document.querySelector("#hsl0").innerHTML = `HSL: ${h}°, ${s}%, ${l}%`;

  document.querySelector("#box1").style.backgroundColor = getInitialColor();
});

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  const rgbObj = { r, g, b };
  return rgbObj;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = parseFloat(h.toFixed(1));
  s = parseFloat(s.toFixed(1));
  l = parseFloat(l.toFixed(1));

  const hslObj = { h, s, l };

  return hslObj;
  //   `H: ${h.toFixed(1)}% S: ${s.toFixed(1)}% L: ${l.toFixed(1)}%`;
}

function hslToRgb(h, s, l) {
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const rgbObj = { r, g, b };
  return rgbObj;
}
