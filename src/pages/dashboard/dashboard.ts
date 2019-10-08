import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  products = [
    {},
    {}
  ];

  articles = [
    {
      img: 'dashboard-3.png',
      title: 'Offices this days and how to fix them',
      desc: 'The basic one, that will make you wanna measure everything around you.  Stick it to the wall, connect to app and get the real valuable info!'
    },
    {
      img: 'dashboard-3.png',
      title: 'How to make it in America',
      desc: 'The basic one, that will make you wanna measure everything around you.  Stick it to the wall, connect to app and get the real valuable info!'
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goArticles() {
    this.navCtrl.setRoot('ArticlesPage');
  }

  goProducts() {
    this.navCtrl.setRoot('ProductsPage');
  }
}
