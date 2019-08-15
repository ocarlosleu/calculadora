import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})

export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  // tslint:disable-next-line: comment-format
  //Inicializa os valores padrão
  ngOnInit() {
  	this.limpar();
  }

  //Sempre que o componente é criado o ngOnInit é chamado
  limpar(): void {
  	this.numero1 = '0';
  	this.numero2 = null;
  	this.resultado = null;
  	this.operacao = null;
  }

  //Adiciona o número selecionado para o cálculo posteriormente.
  adicionarNumero(numero: string): void {
  	if (this.operacao === null) {
  	  this.numero1 = this.concatenarNumero(this.numero1, numero);
  	} else {
  	  this.numero2 = this.concatenarNumero(this.numero2, numero);
  	}
  }

  //Returna o valor concatenado. Trata o separador decimal.
  concatenarNumero(numAtual: string, numConcat: string): string {
  	// caso contenha apenas '0' ou null, reinicia o valor
    if (numAtual === '0' || numAtual === null) {
  	  numAtual = '';
  	}

    // primeiro dígito é '.', concatena '0' antes do ponto
  	if (numConcat === '.' && numAtual === '') {
  	  return '0.';
  	}

    // caso '.' digitado e já contenha um '.', apenas retorna
  	if (numConcat === '.' && numAtual.indexOf('.') > -1) {
  	  return numAtual;
  	}

  	return numAtual + numConcat;
  }


  definirOperacao(operacao: string): void {
    // apenas define a operação caso não exista uma
  	if (this.operacao === null) {
      this.operacao = operacao;
      return;
  	}

    //Se 2ª número é selecionado, efetua o cálculo da operação
  	if (this.numero2 !== null) {
  		this.resultado = this.calculadoraService.calcular(
  			parseFloat(this.numero1),
  			parseFloat(this.numero2),
  			this.operacao);
  		this.operacao = operacao;
  		this.numero1 = this.resultado.toString();
  		this.numero2 = null;
  		this.resultado = null;
  	}
  }

  //Realiza o cálculo da operação
  calcular(): void {
  	if (this.numero2 === null) {
  		return;
  	}

  	this.resultado = this.calculadoraService.calcular(
  		parseFloat(this.numero1),
  		parseFloat(this.numero2),
  		this.operacao);
  }

  //Retorna o valor a ser exibido na tela da calculadora.
  get display(): string {
  	if (this.resultado !== null) {
  		return this.resultado.toString();
  	}
  	if (this.numero2 !== null) {
  		return this.numero2;
  	}
  	return this.numero1;
  }

}
