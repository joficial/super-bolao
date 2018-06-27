import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cbolao',
  templateUrl: 'cbolao.html',
})
export class CbolaoPage {
  id:string;
  minValue: number;
  date: string = '';
  time: string = '';
  teams: any = [];

  _teams = [
    {
      'time': 'Alemanha',
      'bandeira': '../../elementos/fwc-flags/de-alemanha.png'
    },
    {
      'time': 'Argentina',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Arábia Saudita',
      'bandeira': '../../elementos/fwc-flags/sa-arabia-saudita.png'
    }, 
    {
      'time': 'Austrália',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'BRASIL',
      'bandeira': '../../elementos/fwc-flags/br-brasil.png'
    },
    {
      'time': 'Bélgica',
      'bandeira': '../../elementos/fwc-flags/be-belgica.png'
    },
    {
      'time': 'Colômbia',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Coréia do sul',
      'bandeira': '../../elementos/fwc-flags/kr-koreia.png'
    },
    {
      'time': 'Costa Rica',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Croácia',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Dinamarca',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Egito',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Espanha',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'França',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Inglaterra',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Irã',
      'bandeira': '../../elementos/fwc-flags/ir-ira.png'
    },
    {
      'time': 'Islândia',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Japão',
      'bandeira': '../../elementos/fwc-flags/jp-japao.png'
    },
    {
      'time': 'Marrocos',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'México',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Nigéria',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Panamá',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Peru',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Polônia',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Portugal',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Rússia',
      'bandeira': '../../elementos/fwc-flags/ru-russia.png'
    },
    {
      'time': 'Senegal',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Suécia',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Suíça',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Sérvia',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Tunísia',
      'bandeira': '../../elementos/fwc-flags/'
    },
    {
      'time': 'Uruguai',
      'bandeira': '../../elementos/fwc-flags/'
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController
  ){}

  ionViewDidLoad() {}

  showAlert(texto: string) {
    const alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: texto,
      buttons: ['Ok']
    });
    alert.present();
  }

  wrapBolao(){
    this.id = this.teams[0].replace(' ', '') + this.teams[1].replace(' ', '') + this.minValue;
    return ({
      'data' : this.date,
      //Gols marcados pelos times
      'gols1': '-1',
      'gols2': '-1',
      'time': this.time,
      'id': this.id.replace(' ', ''),
      'minValue': this.minValue,
      'award': '0',
      'status': 'thumbs-up',
      'winnerTeam': '?',
      'time1': this.teams[0],
      'time2': this.teams[1],
      'userVencedor': '?',
      'valorTotal': '0'
    });
  }

  insertBolao(b){
    //Recuperar os dados Armazenados
    let tableBoloes: any = localStorage.getItem('tableBoloes');
    tableBoloes = JSON.parse(tableBoloes);

    //Se a tabela não existir, criar uma:
    if (tableBoloes == null) { tableBoloes = []; }

    //Andar na tabela para saber se já existe:
    for (let i = 0; i < tableBoloes.length; i++) {
      let tmp = JSON.parse(tableBoloes[i]);  
      if (tmp.id == b.id){ return -1; }
    }

    //Converter e preparar para adicionar
    let bolao: any = JSON.stringify(b);
    tableBoloes.push(bolao);

    localStorage.setItem("tableBoloes", JSON.stringify(tableBoloes));

    return 0;
  }

  create(){
    //console.log(this.teams); console.log(this.minValue); console.log(this.date); console.log(this.time); console.log(this.teams.length); console.log(this.teams[1]);

    //Para não aceitar mais ou menos de dois times
    if (this.teams.length != 2){
      this.showAlert("Por favor, selecione DOIS times para o bolão");
      return 0;
    }
    //Para aceitar valores maiores que 0
    if (this.minValue <= 0){
      this.showAlert("Por favor, insira um valor mínimo de aposta que seja maior que R$ 0,00");
      return 0;
    }

    //Encapsular o bolão:
    const newBolao = this.wrapBolao();

    //Pegar um status para saber como foi a tentativa de inserção:
    const status = this.insertBolao(newBolao);

    //Caso já tenha um bolão com os mesmos time e mesmo valor mínimo de aposta
    if ( status == -1){ this.showAlert("Este Bolão já está registrado!"); }
    //Quando tudo ocorre tranquilamente:
    if ( status == 0){ this.showAlert("Bolão adicionado com sucesso!"); }

    //Quando eu coloco como Root, ele atuliza a página
    this.navCtrl.setRoot(HomePage);
  }
}
