import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-bet',
  templateUrl: 'bet.html',
})
export class BetPage {
  id: string = "";//Id da aposta
  bolao: any = '';//Id do bolão
  name: string = '';//Nome completo

  //Palpite de gTime
  gTime1: number = 0;
  gTime2: number = 0;
  
  value: number = 0;//Valor da aposta

  //Times que vão jogar
  time1: any = '';
  time2: any = '';
  
  minValue: number = 0;//Valor mínimo da aposta
  award: number = 0;//Premio
  total: number = 0;//Valor total do bolão

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController
  ){
    this.bolao = this.navParams.get('id');
    this.minValue = (+this.navParams.get('minValue'));
    this.award = +this.navParams.get('award');
    this.total = +this.navParams.get('totalValue');
    this.time1 = this.navParams.get('time1');
    this.time2 = this.navParams.get('time2');
  }

  //Atualizar os dados do bolão, neste caso. O valor total e o valor do prêmio
  updateBolao(v){
    //Recuperar os dados armazenados
    const _tableBoloes: any = localStorage.getItem('tableBoloes');
    let tableBoloes = JSON.parse(_tableBoloes);

    //Se a tabela não existir, somente criar uma:
    if (tableBoloes == null) { tableBoloes = []; }

    let pos = -1; 
    let elm: any = '';
    //Andar na tabela em busca do registro:
    for (let i = 0; i < tableBoloes.length; i++) {
      let tmp = JSON.parse(tableBoloes[i]);
      if (tmp.id == this.bolao){
        pos = i;
        const num: number = (parseFloat(v) + parseFloat(tmp.totalValue));
        console.log(typeof(v),typeof(tmp.totalValue));
        tmp.totalValue = num;

        const _premio: number = (num * 0.65)
        tmp.award = _premio;
      
        elm = JSON.stringify(tmp);
        break;
      }
    }
    //Adicionar o elemento na tabela
    if (pos < 0){ tableBoloes.push(elm); }else{ tableBoloes[pos] = elm; }
    
    localStorage.setItem("tableBoloes", JSON.stringify(tableBoloes));
    return;
  }

  //Salvar um palpite
  saveHunch(){
    if((this.value <= 0) || (this.name == '') || 
      (this.gTime1 <= 0) || (this.gTime2 <= 0)){
      this.alertIncompletData();
      return;
    }

    //Chave da aposta
    this.id = this.name + this.gTime1 + this.gTime2;

    if ((+this.value) < (+this.minValue) ){
      this.alertMinValue();
      return;
    }

    //Encapsular a aposta
    const _hunch:any = [
      this.gTime1, this.gTime2, 
      this.name, this.value,
      this.bolao, this.id
    ];

    //Preparar para adicionar a aposta
    const hunch = JSON.stringify(_hunch);

    //Recuperar os dados armazenados
    const _hunchTable: any = localStorage.getItem('hunchTable');
    let hunchTable = JSON.parse(_hunchTable);

    //Se a tabela não existir, somente criar uma tabela:
    if (hunchTable == null) { hunchTable = []; }

    //Adicionar a aposta na Tabela
    hunchTable.push(hunch);

    //Depois de adicionar, é preciso atualizar a tabela de bolões:
    this.updateBolao(this.value);

    //Armazenando os dados
    localStorage.setItem("hunchTable", JSON.stringify(hunchTable));

    //Voltando para a tela inicial
    this.navCtrl.setRoot(HomePage);
  }

  //Simular a Aposta:
  //Simular uma aposta
  viewHunch(){
    //Avisar quando os dados estiverem incompletos
    if (this.gTime1 < 0 || this.gTime2 < 0){
      this.alertIncompletData();
      return;
    }

    //Avisar quando o valor mínimo não for atendido
    if ((this.value) < (this.minValue) ){
      this.alertMinValue();
      return;
    }

    //Valor toral de apostas:
    let total: number = (+this.value);

    //Valor total das apostas iguais:
    let hunchs: number = (+this.value);

    //Recuperar os dados armazenados
    let hunchTable: any = localStorage.getItem('hunchTable');
    hunchTable = JSON.parse(hunchTable);

    //Se a tabela não existir, somente criar uma tabela:
    if (hunchTable == null) { hunchTable = []; }

    for (let i = 0; i < hunchTable.length; i++) {
      let tmp = JSON.parse(hunchTable[i]);
      //Somar todos os valores
      if (parseInt(tmp[0]) == this.gTime1 && parseInt(tmp[1]) == this.gTime2){
        hunchs = hunchs + (+tmp[3]);
      }
    }
    
    //Calcular as proporções:
    total = ((+this.total) + (+this.value));
    this.award = total * 0.65;//65% do valor total

    let _num: number = (+this.value);

    let _hunch: number = ((((_num * 100)/hunchs) * (+this.award) ) * 0.01);

    const alert = this.alertCtrl.create({
      title: 'Simulação',
      subTitle: 'Se acertar, você ganha' + ' R$ ' + _hunch,
      buttons: ['OK']
    });
    alert.present();
  }

  //Alertar quando os dados estiverem incompletos
  alertIncompletData(){
    const alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Informe todos dos dados!',
      buttons: ['OK']
    });
    alert.present();
  }

  //Alertar quando o valor da aposta não for suficiente
  alertMinValue(){
    const alertVM = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'O valor mínimo da aposta é ' + 'R$ ' + this.minValue,
      buttons: ['OK']
    });
    alertVM.present();
  }

}
