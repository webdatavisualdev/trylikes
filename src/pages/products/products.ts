import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products = [
    {
      img: 'dashboard-2.png',
      title: 'Button StarterKit',
      desc: 'The basic one, that will make you wanna measure everything around you.  Stick it to the wall, connect to app and get the real valuable info!',
      price: 199
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  goBack() {
    this.navCtrl.setRoot('DashboardPage');
  }
}
