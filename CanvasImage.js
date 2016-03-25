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

    this.fillBlack();
  }

  fillBlack(){
    const d = this.data;
    for (let i = 0; i < d.length; i+=4){
      d[i] = 0;
      d[i + 1] = 0;
      d[i + 2] = 0;
      d[i + 3] = 255;
    }
  }

  //This will replace write_tga_file
  render(){
    this.canvas_data.set(this.data);
    this.context.putImageData(this.canvas_imageData, 0, 0);
  }

  //TODO: FIXME: Numbers sent as x and y are not integers, need to allow
  //for decimals somehow
  set(x, y, color){
    //x, y represent pixels but this.data is currently indexed by color
    const pixelIndex = ((y * this.width) + x) * 4;
    this.data[pixelIndex] = color[0];
    this.data[pixelIndex + 1] = color[1];
    this.data[pixelIndex + 2] = color[2];
    this.data[pixelIndex + 3] = color[3];
  }
}
