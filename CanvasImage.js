export default class CanvasImage {
  constructor(canvas, width, height){
    //canvas -> actual canvas DOM object
    //width  -> pixel width of image
    //height -> pixel height of image
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = width;
    this.height = height;
    
    this._rawData = new ArrayBuffer(x * y);
    this.data = new Uint8ClampedArray(this._rawData);
  }
  
  //This will replace write_tga_file
  render(){
    this.context.putImageData(this.data, 0, 0);
  }
  
  set(x, y, color){
    this.set(color, [(y * this.width) + x]);
  }
}