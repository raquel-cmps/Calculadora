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

  constructor() { }

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
          this.resultado = this.resultado + valor;
        }
      }
    }
  }

  operador(valor: string) {
    if (!this.checa_operador || this.verificacao_nova_operacao() == true) {
      this.operador_selecionado = valor;
      this.primeiro_elemento = this.resultado;
      this.resultado += valor;
      this.checa_operador = true;
      this.comeca_segundo_elemento = true;

      if (this.operador_selecionado in Operadores_complexos) {
        this.opercao_complexa();
        /*let aux_expoente = parseFloat(this.primeiro_elemento);
        this.resultado = Math.pow(aux_expoente, 2).toFixed(2).toString();
        this.memoria = this.primeiro_elemento + this.operador_selecionado + "=" + this.resultado;
        this.primeiro_elemento = this.resultado;
        */
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
  }

  calcular() {
    if (this.operador_selecionado == "+" && this.segundo_elemento != "") {
      let aux_adicao = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento));
      this.resultado = aux_adicao.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == "-" && this.segundo_elemento != "") {
      let aux_subtracao = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento))
      this.resultado = aux_subtracao.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == "*" && this.segundo_elemento != "") {
      let aux_multicacao = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento))
      this.resultado = aux_multicacao.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == "/" && this.segundo_elemento != "") {
      let aux_divisao = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento))
      this.resultado = aux_divisao.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == "^2") {
      let aux_expoente = parseFloat(this.primeiro_elemento);
      this.resultado = Math.pow(aux_expoente, 2).toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + "=" + this.resultado;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == "%") {
      let aux_porcentagem = (parseFloat(this.primeiro_elemento) / 100.00);
      this.resultado = aux_porcentagem.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;
    }
    else if (this.operador_selecionado == "+/-") {
      let aux = parseFloat(this.primeiro_elemento);
      this.resultado = (- aux).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + "=" + this.resultado;
      this.resultado_concluido = true;
    }
  }

  opercao_complexa() {
    if (this.operador_selecionado == "^2") {
      let aux_expoente = parseFloat(this.primeiro_elemento);
      this.resultado = Math.pow(aux_expoente, 2).toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + "=" + this.resultado;
      this.primeiro_elemento = this.resultado;
    }
    else if (this.operador_selecionado == "%") {
      let aux_porcentagem = (parseFloat(this.primeiro_elemento) / 100.00);
      this.resultado = aux_porcentagem.toFixed(2).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.primeiro_elemento = this.resultado;
    }
    else if (this.operador_selecionado == "+/-") {
      let aux = parseFloat(this.primeiro_elemento);
      this.resultado = (- aux).toString();
      this.memoria = this.primeiro_elemento + this.operador_selecionado + "=" + this.resultado;
      this.primeiro_elemento = this.resultado;
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
  '^2',    // 4
  '%',     // 5
  '+/-'    // 6
}

enum Operadores_complexos {
  '^2',
  '%',
  '+/-'
}



