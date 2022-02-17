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

function getColorClicked() {
  const r = hexToRgb(getInitialColor()).r;
  const g = hexToRgb(getInitialColor()).g;
  const b = hexToRgb(getInitialColor()).b;

  const h = rgbToHsl(r, g, b).h;
  const s = rgbToHsl(r, g, b).s;
  const l = rgbToHsl(r, g, b).l;

  document.querySelector("#hex0").innerHTML = `HEX: ${getInitialColor()}`;
  document.querySelector("#rgb0").innerHTML = `RGB: ${r}, ${g}, ${b}`;
  document.querySelector("#hsl0").innerHTML = `HSL: ${Math.round(
    h
  )}°, ${Math.round(s)}%, ${Math.round(l)}%`;

  const selectedOption = modePicker.options[modePicker.selectedIndex].value;
  modesAvailable[selectedOption](h, s, l);
}

function showStuff() {}

modePicker.addEventListener("change", getColorClicked);

function showNewColors(h, s, l, changeH, changeS, changeL) {
  if (h + changeH >= 360) {
    h = 0 + (h + changeH - 360);
  }

  if (h + changeH * 2 >= 360) {
    h = 0 + (h + changeH * 2 - 360);
  }

  if (l - changeL * 6 < 0) {
    l = 100;
  }

  if (s - changeS < 0) {
    s = 100;
  }
  allInfoBoxes[0].querySelector(".box").style.backgroundColor =
    showInfoHexRgbHsl(
      h,
      s,
      l,
      -changeH * 2,
      changeS * 1.2,
      -changeL * 1.2
    ).backColor;

  allInfoBoxes[1].querySelector(".box").style.backgroundColor =
    showInfoHexRgbHsl(h, s, l, -changeH, changeS, -changeL * 2.7).backColor;

  allInfoBoxes[2].querySelector(".box").style.backgroundColor =
    showInfoHexRgbHsl(h, s, l, changeH, changeS, changeL * 4.5).backColor;

  allInfoBoxes[3].querySelector(".box").style.backgroundColor =
    showInfoHexRgbHsl(h, s, l, changeH * 2, changeS, changeL * 6).backColor;

  allInfoBoxes[0].querySelector(".box-hsl").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    -changeH * 2,
    changeS * 1.2,
    -changeL * 1.2
  ).hsl;

  allInfoBoxes[0].querySelector(".box-rgb").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    -changeH * 2,
    changeS * 1.2,
    -changeL * 1.2
  ).rgb;

  allInfoBoxes[0].querySelector(".box-hex").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    -changeH * 2,
    changeS * 1.2,
    -changeL * 1.2
  ).hex;

  allInfoBoxes[1].querySelector(".box-hsl").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    -changeH,
    changeS,
    -changeL * 2.7
  ).hsl;

  allInfoBoxes[1].querySelector(".box-rgb").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    -changeH,
    changeS,
    -changeL * 2.7
  ).rgb;

  allInfoBoxes[1].querySelector(".box-hex").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    -changeH,
    changeS,
    -changeL * 2.7
  ).hex;

  if (h - changeH < 0) {
    h = 360;
  }

  allInfoBoxes[2].querySelector(".box-hsl").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    changeH,
    changeS,
    changeL * 4.5
  ).hsl;

  allInfoBoxes[2].querySelector(".box-rgb").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    changeH,
    changeS,
    changeL * 4.5
  ).rgb;

  allInfoBoxes[2].querySelector(".box-hex").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    changeH,
    changeS,
    changeL * 4.5
  ).hex;

  allInfoBoxes[3].querySelector(".box-hsl").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    changeH * 2,
    changeS,
    changeL * 6
  ).hsl;

  allInfoBoxes[3].querySelector(".box-rgb").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    changeH * 2,
    changeS,
    changeL * 6
  ).rgb;

  allInfoBoxes[3].querySelector(".box-hex").innerHTML = showInfoHexRgbHsl(
    h,
    s,
    l,
    changeH * 2,
    changeS,
    changeL * 6
  ).hex;
}

function showInfoHexRgbHsl(h, s, l, changeH, changeS, changeL) {
  const changedH = h - changeH;
  const changedS = s - changeS;
  const changedL = l - changeL;

  const hexRgbHsl = {
    hex: `HEX: ${rgbToHex(
      hslToRgb(changedH, changedS, changedL).r,
      hslToRgb(changedH, changedS, changedL).g,
      hslToRgb(changedH, changedS, changedL).b
    )}`,

    rgb: `RGB: ${hslToRgb(changedH, changedS, changedL).r}, ${
      hslToRgb(changedH, changedS, changedL).g
    }, ${hslToRgb(changedH, changedS, changedL).b}`,

    hsl: `HSL: ${Math.round(changedH)}°, ${Math.round(changedS)}%, ${Math.round(
      changedL
    )}%`,

    backColor: `hsl(${Math.round(changedH)}, ${Math.round(
      changedS
    )}%, ${Math.round(changedL)}%)`,
  };
  return hexRgbHsl;
}

const modesAvailable = {
  ana: function (h, s, l) {
    showNewColors(h, s, l, 10, 0, 0);
  },
  mono: function (h, s, l) {
    showNewColors(h, s, l, 0, 46, 5);
  },
  triad: function (h, s, l) {
    showNewColors(h, s, l, 90, 0, 0);
  },
  comp: function (h, s, l) {
    showNewColors(h, s, l, 45, 0, 0);
  },
  compound: function (h, s, l) {
    showNewColors(h, s, l, 90, 50, 1);
  },
  shades: function (h, s, l) {
    showNewColors(h, s, l, 0, 0, 5);
  },
};

colorPicker.addEventListener("change", getColorClicked);

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

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

console.log(hslToRgb(350, 100, 25.1));
