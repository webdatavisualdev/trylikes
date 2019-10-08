import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public form = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    company: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    phone: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public formBuilder: FormBuilder,
    public alert: AlertController
  ) {
    this.auth.getUser().then((res: any) => {
      this.form.patchValue({
        name: res.name,
        company: res.company,
        phone: res.phone
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goBack() {
    this.navCtrl.setRoot('SettingsPage');
  }

  update() {
    this.auth.updateUser(this.form.value).then(res => {
      this.alert.create({
        title: 'Success',
        subTitle: 'Updated profile successfully!',
        buttons: ['OK']
      }).present();
    });
  }
}
