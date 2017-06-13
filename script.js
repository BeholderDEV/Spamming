var numeroProcessadores = 2
var numeroIteracoes = 1

$(document).ready(function(){

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

class GerenciadorTarefas{

  constructor(nProcessadores){
    this.listaProcessadores = []
    this.melhorSolucao = []
    this.listaTarefas = []
    for (var i = 0; i < nProcessadores; i++) {
      this.listaProcessadores[i] = new Processador()
      this.melhorSolucao[i] = new Processador()
    }
  }

  alocarTarefas(ite){
    for (var i = 0; i < ite; i++) {
      this.gerarSolucao()
    }
  }

  gerarSolucao(){
    // this.listaProcessadores[0].alocarTarefa(5)
    // this.melhorSolucao[0].clonarTarefas(this.listaProcessadores[0].getTarefasAlocadas())
    // this.listaProcessadores[0].alocarTarefa(19)
    // for (var i = 0; i < this.listaProcessadores.length; i++) {
    //   console.log('Listando processadores atuais ' + this.listaProcessadores[i].makespan)
    // }
    // for (var i = 0; i < this.melhorSolucao.length; i++) {
    //   console.log('Listando melhor solucao ' + this.melhorSolucao[i].makespan)
    // }

    for (var i = 0; i < this.listaTarefas.length; i++) {
      console.log('Tarefa com tempo ' + this.listaTarefas[i])
    }

    var processadorAtual
    for (var i = 0; i < this.listaTarefas.length; i++) {
      processadorAtual = this.verificarProcessadorMenorMakespan()
      processadorAtual.alocarTarefa(this.listaTarefas[i])
    }

    console.log('Total Makespan ' + this.definirMakespanTotal(this.listaProcessadores))

  }

  verificarProcessadorMenorMakespan() {
    var menorProcessador = this.listaProcessadores[0]
    for (var i = 1; i < this.listaProcessadores.length; i++) {
      if (menorProcessador.makespan > this.listaProcessadores[i].makespan) {
        menorProcessador = this.listaProcessadores[i]
      }
    }
    return menorProcessador
  }

  definirMakespanTotal(processadores){
    var maiorMakespan = 0
    for (var i = 0; i < processadores.length; i++) {
      // console.log('Testando makespan ' + processadores[i].makespan)
      if(processadores[i].makespan > maiorMakespan){
        maiorMakespan = processadores[i].makespan
      }
    }
    return maiorMakespan
  }

  criarNovaTarefa(tempoTarefa){
    this.listaTarefas.push(tempoTarefa)
  }

  getTarefas(){
    return this.listaTarefas
  }
}

class Processador {

  constructor() {
    this.tarefasAlocadas = []
  }

  alocarTarefa(novaTarefa){
    this.tarefasAlocadas.push(novaTarefa)
  }

  get makespan(){
    var out = 0
    for(var i = 0 ; i < this.tarefasAlocadas.length ; i++) {
      out += this.tarefasAlocadas[i]
    }
    return out
  }

  getTarefasAlocadas(){
    return this.tarefasAlocadas
  }

  clonarTarefas(tarefas){
    this.tarefasAlocadas = []
    console.log('AAA')
    for (var i = 0; i < tarefas.length; i++) {
      console.log('aa ' + tarefas[i])
      this.tarefasAlocadas[i] = tarefas[i]
    }
  }

}
