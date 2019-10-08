import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    company: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    location: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.minLength(8)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  });
  public loading = null;
  public passwordType = 'password';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController,
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    this.showLoading();
    this.auth.signup(this.signupForm.value).then(res => {
      this.hideLoading();
      this.showAlert('Success!', 'Verification email has been sent!');
      this.navCtrl.setRoot("LoginPage");
    }).catch(err => {
      this.hideLoading();
      this.showAlert('Failed!', err.message);
    });
  }

  login() {
    this.navCtrl.setRoot("LoginPage");
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
}
