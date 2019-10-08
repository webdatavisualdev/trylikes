import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions';
import { AuthType } from '../../providers/types';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  });
  public loading = null;
  public passwordType = 'password';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.showLoading();
    this.auth.login(this.loginForm.value).then(res => {
      this.hideLoading();
      this.auth.getUser().then((user: AuthType) => {
        if (user.eulaAccepted) {
          this.navCtrl.setRoot(TabsPage);
        } else {
          const modal = this.modalCtrl.create(TermsModal);
          modal.onDidDismiss(res => {
            if (res === 'ok') {
              this.auth.updateEulaAcceptedStatus().then(() => {
                this.navCtrl.setRoot(TabsPage);
              });
            } else if (res === 'cancel') {
              this.auth.logout();
              this.navCtrl.setRoot(LoginPage);
            } else if (res === 'goTerm') {
              this.navCtrl.setRoot(TermsAndConditionsPage);
            }
          });
          modal.present();
        }
      });
    }).catch(err => {
      this.hideLoading();
      if (err.message === 'Email is not verified.') {
        this.navCtrl.setRoot('EmailVerifyPage');
      } else {
        this.showAlert('Failed', 'Wrong e-mail address or wrong password');
      }
    });
  }

  signup() {
    this.navCtrl.setRoot("SignupPage");
  }

  showLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  goToForgot() {
    this.navCtrl.setRoot("ForgotPasswordPage");
  }
}

@Component({
  templateUrl: 'terms-modal.html',
})
export class TermsModal {

  constructor(
    public viewCtrl: ViewController,
  ) {

  }

  dismiss(param) {
    this.viewCtrl.dismiss(param);
  }

  goTerms() {
    this.viewCtrl.dismiss('goTerm');
  }
}