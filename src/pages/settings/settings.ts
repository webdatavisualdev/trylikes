import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public subscribers = [];
  public user = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public app: App,
  ) {
  }

  ionViewDidLoad() {
    this.auth.getUser().then(res => {
      this.user = res;
    });
  }

  ionViewDidLeave() {
    this.subscribers.forEach(sub => {
      sub.unsubscribe();
    });
  }

  logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot('LoginPage');
  }

  goNotification() {
    this.navCtrl.setRoot('NotificationSettingsPage');
  }

  goTerms() {
    this.navCtrl.setRoot('TermsAndConditionsPage', {from: 'Settings'});
  }

  goPrivacy() {
    this.navCtrl.setRoot('PrivacyPage');
  }

  goProfile() {
    this.navCtrl.setRoot('ProfilePage');
  }
}
