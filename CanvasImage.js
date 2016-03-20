class CanvasImage {
  constructor(canvas, width, height){
    //canvas -> actual canvas DOM object
    //width  -> pixel width of image
    //height -> pixel height of image
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = width;
    this.height = height;
    
    this.data = new ArrayBuffer(x * y);
  }
  
  set(x, y, color){
    this.data[(y * this.width) + x] = color;
  }
}
