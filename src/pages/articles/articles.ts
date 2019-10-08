import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  articles = [
    {
      img: 'dashboard-3.png',
      title: 'How to make it in america?',
      name: 'Janneke',
      date: '2 days ago'
    },
    {
      img: 'article-2.png',
      title: 'How to make it in america?',
      name: 'Janneke',
      date: '2 days ago'
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
  }

  goBack() {
    this.navCtrl.setRoot('DashboardPage');
  }
}
