import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-email-verify',
  templateUrl: 'email-verify.html',
})
export class EmailVerifyPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alert: AlertController,
    public loading: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    
  }

  goLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  sendVerificationEmail() {
    let loading = this.loading.create();
    loading.present();
    this.auth.sendEmailVerification().then(res => {
      loading.dismiss();
      this.alert.create({
        message: 'We just sent verification link to your email. Please check your email.',
        buttons: ['OK']
      }).present();
      this.navCtrl.setRoot("LoginPage");
    }).catch(err => {
      loading.dismiss();
      this.alert.create({
        message: err.message,
        buttons: ['OK']
      }).present();
    });
  }
}
