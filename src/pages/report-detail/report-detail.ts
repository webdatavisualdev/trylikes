import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Report } from '../../providers/types';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-report-detail',
  templateUrl: 'report-detail.html',
})
export class ReportDetailPage {

  report: Report;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController) {
    this.report = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportDetailPage');
  }

  goBack() {
    this.navCtrl.setRoot('MeasurePage');
  }

  getUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
