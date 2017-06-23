class QueueRender {
  constructor(){
    this.actualColor = -1
    this.colors = ['#2ecc71', '#e67e22','#3498db',  '#34495e','#9b59b6','#1abc9c', '#f1c40f',  '#e74c3c', '#7f8c8d']
    this.colWidth = 150
    this.colHeight = 30
  }
  getNextColor(){
    this.actualColor++
    return this.colors[this.actualColor]
  }
  render (id, queue) {
    this.canvas = document.getElementById(id)
    this.canvasContext = this.canvas.getContext('2d')
    // this.canvasContext.fillStyle = '#333'
    // this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for(var i = 0 ; i < queue.length ; i++){
      var totalTilHere = 0
      for(var j = 0 ; j < queue[i].tarefasAlocadas.length ; j++){
        this.canvasContext.fillStyle = this.getNextColor()
        this.canvasContext.fillRect((1+(i*2))*this.colWidth, this.canvas.height - (totalTilHere*this.colHeight) - (queue[i].tarefasAlocadas[j]*this.colHeight), this.colWidth, queue[i].tarefasAlocadas[j]*this.colHeight)
        totalTilHere += queue[i].tarefasAlocadas[j]
      }
    }
  }

}
