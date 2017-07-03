class HistoryRender {
  constructor(){
    this.actualColor = -1
    this.colWidth = 150
    this.colHeight = 30
    this.size = 10
    this.margin = this.size*4
  }

  render (id, hist) {
    this.canvas = document.getElementById(id)
    this.canvasContext = this.canvas.getContext('2d')
    // this.canvasContext.font="30px Arial";
    // this.canvasContext.fillStyle = '#333'
    // this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.colWidth = this.canvas.width / hist.length

    this.canvasContext.lineWidth = 2
    this.canvasContext.strokeStyle = '#2ecc71'
    for(var i = 0 ; i < hist.length ; i++){
      console.log(hist[i])
      this.canvasContext.fillStyle = '#2ecc71'
      this.canvasContext.fillRect(this.margin+i*this.colWidth- this.size/2, this.canvas.height - (hist[i]*this.colHeight + this.size/2),this.size,this.size)
      if(i>0){
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.margin+(i-1)*this.colWidth, this.canvas.height - (hist[(i-1)]*this.colHeight));
        this.canvasContext.lineTo(this.margin+i*this.colWidth, this.canvas.height - (hist[i]*this.colHeight));
        this.canvasContext.stroke();
      }
      this.canvasContext.fillStyle = "#666"
      this.canvasContext.fillText(hist[i],this.margin+i*this.colWidth- this.size/2, this.canvas.height - (hist[i]*this.colHeight + this.size*2))
    }
  }

}
