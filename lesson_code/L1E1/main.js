"use strict";

const white = [255, 255, 255, 255];
const red   = [255, 0,   0,   255];

function line(x0, y0, x1, y1, image, color) {
  for (let t=0; t<1; t+=0.1) {
    let x = x0*(1-t) + x1*t;
    let y = y0*(1-t) + y1*t;
    image.set(x, y, color);
  }
}

function init(canvasEl) {
  const image = new CanvasImage(canvasEl, 100, 100);
  line(13, 20, 80, 40, image, white);
  //image.flip_vertically(); // i want to have the origin at the left bottom corner of the image
  image.render();
}
