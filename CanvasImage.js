class CanvasImage {
  constructor(canvas){
    //canvas -> actual canvas DOM object
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }
}
