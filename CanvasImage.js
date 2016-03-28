"use strict";

class CanvasImage {
  static get bytespp(){
    return 4; //pretty sure we don't have a choice here
  }

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

    this._rawData = new ArrayBuffer(
      this.width * this.height * CanvasImage.bytespp
    );
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

  flip_vertically(){
    //TODO: There's probably a lot better way to do this
    //consider having multiple views for the data buffer,
    //if we're not doing math on the colors, why not use
    //a Uint32 instead?

    for (let i = 0; i < (this.data.length / 2); i+=4){
      const swapR = this.data[i];
      const swapG = this.data[i+1];
      const swapB = this.data[i+2];
      const swapA = this.data[i+3];

      this.data[i]   = this.data[this.data.length - i - 1];
      this.data[i+1] = this.data[this.data.length - i - 2];
      this.data[i+2] = this.data[this.data.length - i - 3];
      this.data[i+3] = this.data[this.data.length - i - 4];

      this.data[this.data.length - i - 1] = swapR;
      this.data[this.data.length - i - 2] = swapG;
      this.data[this.data.length - i - 3] = swapB;
      this.data[this.data.length - i - 4] = swapA;
    }
  }

  //This will replace write_tga_file
  render(){
    this.canvas_data.set(this.data);
    this.context.putImageData(this.canvas_imageData, 0, 0);
  }

  set(x, y, color){
    //x -> int
    //y -> int

    const pixelIndex = ((y * this.width) + x) * CanvasImage.bytespp;
    this.data[pixelIndex] = color[0];
    this.data[pixelIndex + 1] = color[1];
    this.data[pixelIndex + 2] = color[2];
    this.data[pixelIndex + 3] = color[3];
  }
}
