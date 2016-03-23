"use strict";

class CanvasImage {
  constructor(canvas, width, height){
    //canvas -> actual canvas DOM object
    //width  -> pixel width of image
    //height -> pixel height of image

    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    //TODO:
    this.canvas_imageData = this.context.getImageData(0, 0, width, height);
    this.canvas_data = this.canvas_imageData.data;

    this.width = width;
    this.height = height;

    this._rawData = new ArrayBuffer(this.width * this.height);
    this.data = new Uint8ClampedArray(this._rawData);
  }

  //This will replace write_tga_file
  render(){
    this.canvas_data.set(this.data);
    this.context.putImageData(this.canvas_imageData, 0, 0);
  }

  set(x, y, color){
    this.data[(y * this.width) + x] = color;
  }
}
