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

    //loop through each line
    for (let i = 0; i < (this.height / 2); i++){
      const topStart = i * this.width * CanvasImage.bytespp;
      const bottomStart = (this.height - i) * this.width * CanvasImage.bytespp;

      //loop through colors in each line
      //order is the same so we can go by color rather than pixel
      for (let j = 0; j < this.width; j++){
        const swap = this.data[topStart + j];
        this.data[topStart + j] = this.data[bottomStart + j];
        this.data[bottomStart + j] = swap;
      }

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
