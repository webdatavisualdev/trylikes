import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { Report } from '../../providers/types';

@IonicPage()
@Component({
  selector: 'page-measure',
  templateUrl: 'measure.html',
})
export class MeasurePage {
  deskCharts = [4, 9, 11, 16, 24, 33];
  maxDeskChart = 33;
  toiletCharts = [
    {
      percent: 4,
      color: 'pink'
    },
    {
      percent: 11,
      color: 'pink'
    },
    {
      percent: 16,
      color: 'yellow'
    },
    {
      percent: 24,
      color: 'pink'
    },
    {
      percent: 33,
      color: 'green'
    },
  ];
  maxToiletChart = 33;
  reports: Report[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public auth: AuthProvider,
    public dataProvider: DataProvider,
    public loadingCtrl: LoadingController
  ) {
    let loading = this.loadingCtrl.create();
    loading.present();
    let sub = this.auth.getCurrentUser().subscribe(res => {
      sub.unsubscribe();
      if (res) {
        this.dataProvider.getReports(res.uid).then((reports: any) => {
          this.reports = reports.reports;
          loading.dismiss();
        }).catch(err => {
          loading.dismiss();
        });
      } else {
        loading.dismiss();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasurePage');
  }

  goDetail() {
    this.events.publish('showMeasureDetail', true);
    this.navCtrl.setRoot('MeasureDetailPage');
  }

  goReportDetail(report: Report) {
    this.navCtrl.setRoot('ReportDetailPage', {...report});
  }
}
