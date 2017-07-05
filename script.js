var numeroProcessadores = 2
var probabilidadeRetirar = 0.3
var numeroIteracoes = 50
var fatorPertubacao = 0.5 // Variar entre 0 e 1

function alocar() {
  var gerenciador
  probabilidadeRetirar = +document.getElementById('probRetirar').value
  numeroIteracoes = +document.getElementById('numeroInteracoes').value
  fatorPertubacao = +document.getElementById('fatorPertubacao').value
  gerenciador = new GerenciadorTarefas(+document.getElementById('numeroProcessadores').value)
  for(var i = 1; i <= numeroTarefas ; i++)
  {
    gerenciador.criarNovaTarefa(+document.getElementById('input'+i).value)
  }
  gerenciador.alocarTarefas(numeroIteracoes, fatorPertubacao)
  var render = new QueueRender()
  var histRender = new HistoryRender()
  render.render('queue-canvas', gerenciador.melhorSolucao)
  histRender.render('hist-canvas', gerenciador.makespanHistory)
}

class GerenciadorTarefas {
  constructor (nProcessadores) {
    this.listaProcessadores = []
    this.melhorSolucao = []
    this.makespanHistory = []
    this.listaTarefasTotal = []
    this.listaTarefasLivres = []
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

  alocarTarefas (ite, fatorPertubacao) {
    var melhorMakespan = Number.POSITIVE_INFINITY
    this.listaTarefasLivres.sort(function(a,b){
      return b-a
    })
    var makespanAtual
    for (var i = 0; i < ite; i++) {
      this.gerarSolucao()
      makespanAtual = this.definirMakespanTotal(this.listaProcessadores)
      this.makespanHistory.push(makespanAtual)
      if(melhorMakespan > makespanAtual){
        melhorMakespan = makespanAtual
        this.gravarMelhorSolucao()
      }
      if( i !== ite - 1){
        this.perturbarSolucaoAtual(fatorPertubacao)
      }
    }
  }

  perturbarSolucaoAtual (fatorPertubacao) {
    var totalTarefasPerturbadas = Math.round(this.listaTarefasTotal.length * fatorPertubacao)
    var tarefasPerturbadas = 0
    while(totalTarefasPerturbadas !== tarefasPerturbadas){
      for (var i = 0; i < this.listaProcessadores.length; i++) {
        for (var j = 0; j < this.listaProcessadores[i].getTarefasAlocadas().length; j++) {
          if(Math.random() < probabilidadeRetirar){
            this.listaTarefasLivres.push(this.listaProcessadores[i].tarefasAlocadas[j])
            this.listaProcessadores[i].tarefasAlocadas.splice(j, 1)
            tarefasPerturbadas++
            j--
            if(tarefasPerturbadas === totalTarefasPerturbadas){
              return
            }
            break
          }
        }
      }
    }
  }

  gravarMelhorSolucao () {
    for (var i = 0; i < this.listaProcessadores.length; i++) {
      this.melhorSolucao[i].clonarTarefas(this.listaProcessadores[i].tarefasAlocadas)
    }
  }

  gerarSolucao () {
    var processadorAtual
    for (var j = 0; j < this.listaTarefasLivres.length; j++) {
      processadorAtual = this.verificarProcessadorMenorMakespan()
      processadorAtual.alocarTarefa(this.listaTarefasLivres[j])
    }
    this.listaTarefasLivres = []
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
    this.listaTarefasTotal.push(tempoTarefa)
    this.listaTarefasLivres.push(tempoTarefa)
  }

  getTarefas () {
    return this.listaTarefasTotal
  }

  getMelhorSolucao(){
    return this.melhorSolucao
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
    for (var i = 0; i < tarefas.length; i++) {
      this.tarefasAlocadas[i] = tarefas[i]
    }
  }
}
