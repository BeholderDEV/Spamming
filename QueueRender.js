class QueueRender {
  constructor(){
    this.actualColor = -1
    this.colors = ['#2ecc71', '#e67e22','#3498db',  '#34495e','#9b59b6','#1abc9c', '#f1c40f',  '#e74c3c', '#7f8c8d']
    this.colWidth = 150
    this.colHeight = 30
  }
  getNextColor(){
    this.actualColor = (this.actualColor+1)%this.colors.length
    return this.colors[this.actualColor]
  }

  invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);           // remove #
    color = parseInt(color, 16);          // convert to integer
    color = 0xFFFFFF ^ color;             // invert three bytes
    color = color.toString(16);           // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color;                  // prepend #
    return color;
  }

  render (id, queue) {
    this.canvas = document.getElementById(id)
    this.canvasContext = this.canvas.getContext('2d')

    // this.canvasContext.fillStyle = '#333'
    // this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.colWidth = this.canvas.width / ((queue.length * 2 - 1) + 2)
    var maior = 0
    for(var i = 0 ; i < queue.length ; i++){
      var totalTilHere = 0
      for(var j = 0 ; j < queue[i].tarefasAlocadas.length ; j++){
        totalTilHere += queue[i].tarefasAlocadas[j]
      }
      if(totalTilHere > maior){
        maior = totalTilHere
      }
    }
    this.colHeight = (this.canvas.height-60) / maior
    this.canvasContext.font= this.colHeight*0.9+'px Arial'
    for(var i = 0 ; i < queue.length ; i++){
      var totalTilHere = 0
      for(var j = 0 ; j < queue[i].tarefasAlocadas.length ; j++){
        this.canvasContext.fillStyle = this.getNextColor()
        this.canvasContext.fillRect((1+(i*2))*this.colWidth, this.canvas.height - (totalTilHere*this.colHeight) - (queue[i].tarefasAlocadas[j]*this.colHeight), this.colWidth, queue[i].tarefasAlocadas[j]*this.colHeight)
        this.canvasContext.fillStyle = "#ddd"
        this.canvasContext.fillText(queue[i].tarefasAlocadas[j], ((1+(i*2))*this.colWidth)+(this.colWidth/2)-10, this.canvas.height - (totalTilHere*this.colHeight) - ((queue[i].tarefasAlocadas[j]*this.colHeight)/2)+10)
        totalTilHere += queue[i].tarefasAlocadas[j]
      }
      this.canvasContext.fillStyle = '#333'
      this.canvasContext.fillText(queue[i].makespan, (1+(i*2))*this.colWidth, this.canvas.height - (totalTilHere*this.colHeight) - this.colHeight/2)
    }
  }

}
