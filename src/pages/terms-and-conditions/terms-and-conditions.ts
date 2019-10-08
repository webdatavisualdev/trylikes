import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage, TermsModal } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-terms-and-conditions',
  templateUrl: 'terms-and-conditions.html',
})
export class TermsAndConditionsPage {
  from = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public auth: AuthProvider,
  ) {
    this.from = this.navParams.data.from;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsAndConditionsPage');
  }

  goHome() {
    if (this.from === 'Settings') {
      this.navCtrl.setRoot('SettingsPage');
    } else {
      const modal = this.modalCtrl.create(TermsModal);
      modal.onDidDismiss(res => {
        if (res === 'ok') {
          const alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Welcome to TryLikes',
            buttons: [{
              text: 'OK',
              handler: data => {
                this.navCtrl.setRoot(TabsPage);                
              }
            }],
            enableBackdropDismiss: false
          });
          alert.present();
        } else if (res === 'cancel') {
          this.auth.logout();
          this.navCtrl.setRoot(LoginPage);
        }
      });
      modal.present();
    }
  }

  accept() {
    this.auth.updateEulaAcceptedStatus().then(() => {
      const alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Welcome to TryLikes',
        buttons: [{
          text: 'OK',
          handler: data => {
            this.navCtrl.setRoot(TabsPage);
          }
        }],
        enableBackdropDismiss: false
      });
      alert.present();
    });
  }
}
