import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CbolaoPage } from '../cbolao/cbolao';
import { DetailsPage } from '../details/details';
import { BetPage } from '../bet/bet';
import { ScoreboardPage } from '../scoreboard/scoreboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  openBoloes = [];
  closedBoloes = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.getBoloes();
  }

  getBoloes(){
    //Recuperar os dados armazenados
    let tableBoloes:any = localStorage.getItem("tableBoloes");

    //Converter em um objeto para ser utilizado
    tableBoloes = JSON.parse(tableBoloes);

    //Esvaziar os atuais vetores
    this.openBoloes = [];
    this.closedBoloes = [];
    
    //Se a tabela de respostas for igual a NULL, retornar string vazia
    if (tableBoloes == null || tableBoloes.length < 0) {
      tableBoloes = [];
    }

    //Andar na tabela para filtrar os elementos:
    for (let i = 0; i < tableBoloes.length; i++) {

      const tmp = JSON.parse(tableBoloes[i]);

      if (tmp.status == 'thumbs-up'){ this.openBoloes.push(tmp); }

      if (tmp.status == 'thumbs-down'){ this.closedBoloes.unshift(tmp); }
    }
  }

  //Chamar página para criar um novo bolão:
  createBolao(){ this.navCtrl.push(CbolaoPage); }

  //Fechar um bolão:
  _closeBolao(id){
    //Recuperar os dados armazenados
    let tableBoloes: any = localStorage.getItem('tableBoloes');
    tableBoloes = JSON.parse(tableBoloes);

    //Se a tabela não existir, somente criar uma tabela:
    if (tableBoloes == null) { tableBoloes = []; }

    let pos = -1; 
    let elm: any = '';
    //Andar na tabela em busca do registro:
    for (let i = 0; i < tableBoloes.length; i++) {
      let tmp = JSON.parse(tableBoloes[i]);

      if (tmp.id == id){
        pos = i;
        tmp.status = 'thumbs-down';
        elm = JSON.stringify(tmp);
        break;
      }
    }
    //Adicionar o elemento na tabela
    if (pos < 0){ tableBoloes.push(elm); }else{ tableBoloes[pos] = elm; }
    
    localStorage.setItem("tableBoloes", JSON.stringify(tableBoloes));
    
    this.getBoloes();
  }

  closeBolao(id){
    const confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Se você fechar este bolão, não será mais possível adicionar apostas. Tem certeza que deseja fechá-lo?',
      buttons: [
        { text: 'Cancelar', handler: () => { console.log('Desistiu de fechar o bolão'); } },
        { text: 'Confirmar', handler: () => { this._closeBolao(id); } }
      ]
    });
    confirm.present();
  }

  //Ir para os detalhes do bolão
  goToBolao(bolao){ this.navCtrl.push(DetailsPage, bolao); console.log("ham?");}

  //Adicionar uma nova aposta
  addBet(bolao){ this.navCtrl.push(BetPage, bolao); }

  //Alterar o placar do jogo
  addScoreboard(id){ this.navCtrl.push(ScoreboardPage, {id : id}); }

}