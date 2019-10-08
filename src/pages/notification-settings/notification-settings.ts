import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';

@IonicPage()
@Component({
  selector: 'page-notification-settings',
  templateUrl: 'notification-settings.html',
})
export class NotificationSettingsPage {
  pushSelected = true;
  soundSelected = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fcm: FcmProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationSettingsPage');
  }

  goBack() {
    this.navCtrl.setRoot('SettingsPage');
  }

  changePushToggle() {
    this.pushSelected = !this.pushSelected;
    if (this.pushSelected) {
      this.fcm.saveTokenToFirestore(localStorage.getItem('deviceToken'));
    } else {
      this.fcm.saveTokenToFirestore('');
    }
  }

  changeSoundToggle() {
    this.soundSelected = !this.soundSelected;
    if (this.soundSelected) {
      this.fcm.saveTokenToFirestore(localStorage.getItem('deviceToken'), true);
    } else {
      this.fcm.saveTokenToFirestore(localStorage.getItem('deviceToken'));
    }
  }
}
