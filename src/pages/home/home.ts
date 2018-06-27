import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CbolaoPage } from '../cbolao/cbolao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  createBolao(){ this.navCtrl.push(CbolaoPage); }

}
