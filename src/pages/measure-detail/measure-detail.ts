import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-measure-detail',
  templateUrl: 'measure-detail.html',
})
export class MeasureDetailPage {
  charts = [
    {
      percent: 4,
      num: 15,
    },
    {
      percent: 9,
      num: 21,
    },
    {
      percent: 11,
      num: 33,
    },
    {
      percent: 16,
      num: 40,
    },
    {
      percent: 24,
      num: 50,
    },
    {
      percent: 33,
      num: 60,
    },
  ];
  maxDeskChart = 33;
  selectedIndex = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasureDetailPage');
  }

  goMeasure() {
    this.events.publish('showMeasureDetail', false);
    this.navCtrl.setRoot('MeasurePage');
  }
}
