import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { FcmProvider } from '../providers/fcm/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public auth: AuthProvider,
    public fcm: FcmProvider,
  ) {
    platform.ready().then(() => {
      this.rootPage = this.auth.isLoggedIn() ? TabsPage : LoginPage;

      if (this.auth.isLoggedIn() && platform.is('cordova')) {
        this.fcm.getToken();
      }
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
