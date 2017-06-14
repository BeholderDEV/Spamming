var numeroProcessadores = 2
var numeroIteracoes = 1

$(document).ready(function () {
  var gerenciador
  gerenciador = new GerenciadorTarefas(numeroProcessadores)
  gerenciador.criarNovaTarefa(5)
  gerenciador.criarNovaTarefa(10)
  gerenciador.criarNovaTarefa(2)
  gerenciador.criarNovaTarefa(5)
  gerenciador.alocarTarefas(numeroIteracoes)
  // var tarefas = gerenciador.getTarefas()
  // for (var i = 0; i < tarefas.length; i++) {
  //   console.log('Tempo tarefa ' + tarefas[i])
  // }
})

var colorNames = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)']
var config = {
  type: 'bar',
  data: {
    datasets: [{
      data: [
      ],
      backgroundColor: [
      ],
      label: 'Dataset 1'
    }],
    labels: [
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
}

class GerenciadorTarefas {
  constructor (nProcessadores) {
    this.listaProcessadores = []
    this.melhorSolucao = []
    this.listaTarefas = []
    for (var i = 0; i < nProcessadores; i++) {
      this.listaProcessadores[i] = new Processador()
      this.melhorSolucao[i] = new Processador()
    }
  }

  drawChart (divId) {
    for (var index = 0; index < this.listaProcessadores.length; index++) {
      var element = this.listaProcessadores[index]
      config.data.labels.push('Processador' + index)
      var color = colorNames[index % colorNames.length]
      config.data.datasets[0].data.push(element.makespan)
      config.data.datasets[0].backgroundColor.push(color)
    }
    var ctx = $(divId).get(0).getContext('2d')
    window.myDoughnut = new Chart(ctx, config)
  }

  alocarTarefas (ite) {
    for (var i = 0; i < ite; i++) {
      this.gerarSolucao()
      this.drawChart('#chart-area')
    }
  }

  gerarSolucao () {
    for (var i = 0; i < this.listaTarefas.length; i++) {
      console.log('Tarefa com tempo ' + this.listaTarefas[i])
    }
    var processadorAtual
    for (var j = 0; j < this.listaTarefas.length; j++) {
      processadorAtual = this.verificarProcessadorMenorMakespan()
      processadorAtual.alocarTarefa(this.listaTarefas[j])
    }
    console.log('Total Makespan ' + this.definirMakespanTotal(this.listaProcessadores))
  }

  verificarProcessadorMenorMakespan () {
    var menorProcessador = this.listaProcessadores[0]
    for (var i = 1; i < this.listaProcessadores.length; i++) {
      if (menorProcessador.makespan > this.listaProcessadores[i].makespan) {
        menorProcessador = this.listaProcessadores[i]
      }
    }
    return menorProcessador
  }

  definirMakespanTotal (processadores) {
    var maiorMakespan = 0
    for (var i = 0; i < processadores.length; i++) {
      // console.log('Testando makespan ' + processadores[i].makespan)
      if (processadores[i].makespan > maiorMakespan) {
        maiorMakespan = processadores[i].makespan
      }
    }
    return maiorMakespan
  }

  criarNovaTarefa (tempoTarefa) {
    this.listaTarefas.push(tempoTarefa)
  }

  getTarefas () {
    return this.listaTarefas
  }
}

class Processador {
  constructor () {
    this.tarefasAlocadas = []
  }

  alocarTarefa (novaTarefa) {
    this.tarefasAlocadas.push(novaTarefa)
  }

  get makespan () {
    var out = 0
    for (var i = 0; i < this.tarefasAlocadas.length; i++) {
      out += this.tarefasAlocadas[i]
    }
    return out
  }

  getTarefasAlocadas () {
    return this.tarefasAlocadas
  }

  clonarTarefas (tarefas) {
    this.tarefasAlocadas = []
    console.log('AAA')
    for (var i = 0; i < tarefas.length; i++) {
      console.log('aa ' + tarefas[i])
      this.tarefasAlocadas[i] = tarefas[i]
    }
  }
}
