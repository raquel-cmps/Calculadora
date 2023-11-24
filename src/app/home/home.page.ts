import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  resultado: string = '0';
  checa_operador: boolean = false;
  comeca_segundo_elemento: boolean = false;
  resultado_concluido: boolean = false;
  primeiro_elemento: string = '';
  segundo_elemento: string = '';
  operador_selecionado: string = '';
  memoria: string = '';
  operador_unico: boolean = false;


  constructor() { }

  debug(){
    console.log('Resultado: ' + this.resultado);
    console.log('Primeiro El: ' + this.primeiro_elemento);
    console.log('Segundo El: ' + this.segundo_elemento);
    console.log('Operador: ' + this.operador_selecionado);
    console.log('Memoria: ' + this.memoria);
    console.log('ChecaOp: ' + this.checa_operador);
    console.log('ComecaSegundo: ' + this.comeca_segundo_elemento);
    console.log('ResultadoConcluido: ' + this.resultado_concluido);
    console.log('OpUnico: ' + this.operador_unico);
  }

  digito(valor: string) {
    if (this.resultado_concluido) {
      this.resultado = valor;
      this.resultado_concluido = false;
      this.checa_operador = false;
      this.segundo_elemento = "";
    } else {
      if (this.comeca_segundo_elemento) {
        //preencher o segundo elemento
        this.segundo_elemento = this.segundo_elemento + valor;
        this.resultado = this.resultado + valor;
      } else {
        if (this.resultado == "0") {
          this.resultado = valor;
        } else {
          this.resultado += valor;
        }
      }
    }
  }

  operador(valor: string) {
    const Operadores_obj = Object.values(Operadores);
    //criando um obj, pois nao consegui relacionar
    //as strings do enum, com a string do resultado

    if(Operadores_obj.includes(this.resultado.charAt(this.resultado.length - 1))){
      this.resultado = this.resultado.slice(0, -1) + valor;
      //chece se o ultimo elemento da string Resultado
      //é um operador, e caso seja, retira o operador
      //e concatena o novo
      this.operador_selecionado = valor;
    } else if (this.operador_unico){
      return;
      //faz a verificacao se ja existe um operador
      //caso exista ele retorna a funcao, nao permitindo
      //a adicao de outro operador
    } else {
      if (!this.checa_operador || this.verificacao_nova_operacao() == true) {
        this.operador_selecionado = valor;
        this.primeiro_elemento = this.resultado;
        this.resultado += valor;
        this.checa_operador = true;
        this.comeca_segundo_elemento = true;
        this.operador_unico = true;

        this.segundo_elemento = '';
        //precisa resetar o segundo elemento
        //para que nao aconteca o bug de carregar digitos iguais
  
        if (this.operador_selecionado in Operadores_complexos) {
          this.operacao_complexa();
        }
      }
    }
  }

  redefinir() {
    this.resultado = "0";
    this.checa_operador = false;
    this.primeiro_elemento = '';
    this.segundo_elemento = '';
    this.operador_selecionado = '';
    this.comeca_segundo_elemento = false;
    this.memoria = '';
    this.operador_unico = false;
  }

  redefinirEntrada() {
    if(this.resultado != this.primeiro_elemento && this.resultado_concluido == false){
      this.resultado = this.primeiro_elemento;
      this.resultado_concluido = true;
      this.operador_unico = false;
      this.segundo_elemento = '';
    } else {
      this.redefinir();
    }
  }

  deletar(){
    const Operadores_obj = Object.values(Operadores);

    if(this.resultado_concluido == true){
      return;
    } else {
      if(Operadores_obj.includes(this.resultado.charAt(this.resultado.length -1))){
        return;
      }else{
        if(this.comeca_segundo_elemento = true && this.segundo_elemento != ''){
          this.segundo_elemento = this.segundo_elemento.slice(0, -1);
          this.resultado = this.resultado.slice(0, -1);
        } else {
          this.resultado = this.resultado.slice(0, -1);
        }
      }
    }
  }

  calcular() {
    if (this.operador_selecionado == "+" && this.segundo_elemento != "") {
      let aux_adicao = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento));
      this.resultado = aux_adicao.toString();
      //this.resultado = aux_adicao.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento;
      this.resultado_concluido = true;
      this.operador_unico = false;
    }
    else if (this.operador_selecionado == "-" && this.segundo_elemento != "") {
      let aux_subtracao = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento))
      this.resultado = aux_subtracao.toString();
      //this.resultado = aux_subtracao.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento;
      this.resultado_concluido = true;
      this.operador_unico = false;
    }
    else if (this.operador_selecionado == "*" && this.segundo_elemento != "") {
      let aux_multicacao = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento))
      this.resultado = aux_multicacao.toString();
      //this.resultado = aux_multicacao.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento;
      this.resultado_concluido = true;
      this.operador_unico = false;
    }
    else if (this.operador_selecionado == "/" && this.segundo_elemento != "") {
      let aux_divisao = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento))
      this.resultado = aux_divisao.toString();
      //this.resultado = aux_divisao.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento;
      this.resultado_concluido = true;
      this.operador_unico = false;
    }
  }

  operacao_complexa() {
    if (this.operador_selecionado == "^") {
      let aux_expoente = parseFloat(this.primeiro_elemento);
      this.resultado = Math.pow(aux_expoente, 2).toString();
      //this.memoria = this.primeiro_elemento + this.operador_selecionado;
      let base = this.primeiro_elemento
      let expoente = 2;
      this.memoria = `${base}<sup>${expoente}</sup>`;
      this.primeiro_elemento = this.resultado;
      this.operador_unico = false;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == "%") {
      let aux_porcentagem = (parseFloat(this.primeiro_elemento) / 100.00);
      this.resultado = aux_porcentagem.toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento;
      this.primeiro_elemento = this.resultado;
      this.operador_unico = false;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == "+/-") {
      let aux = parseFloat(this.primeiro_elemento);
      this.resultado = (- aux).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado;
      this.primeiro_elemento = this.resultado;
      this.operador_unico = false;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == 'sqr'){
      let aux_raizQuadrada = parseFloat(this.primeiro_elemento);
      this.resultado = Math.sqrt(aux_raizQuadrada).toString();
      this.memoria = `&#8730;${this.primeiro_elemento}`;
      this.primeiro_elemento = this.resultado;
      this.operador_unico = false;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == '@'){
      let aux_fracao = parseFloat(this.primeiro_elemento);
      this.resultado = (1 / aux_fracao).toString();
      this.memoria = `<sup>1</sup>/<sub>${this.primeiro_elemento}</sub>`;
      this.primeiro_elemento = this.resultado;
      this.operador_unico = false;
      this.resultado_concluido = true;
    }
  }

  verificacao_nova_operacao(): boolean {
    if (this.operador_selecionado in Operadores) {
      //quer dizer que o usuario digitou um operador
      //ou seja, ele que incrementar o resultado
      this.resultado_concluido = false;
      this.segundo_elemento = '';
      return true;
    }
    return false;
  }

}
enum Operadores {
  '+',     // 0
  '-',     // 1
  '*',     // 2
  '/',     // 3
  '^',     // 4
  '%',     // 5
  '+/-',   // 6
  '@',     // 7
  'sqr',   // 8
}

enum Operadores_complexos {
  '^',
  '%',
  '+/-',
  '@',
  'sqr'
}



