import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { AuthProvider } from '../providers/auth/auth';
import { FIREBASE_CONFIG } from '../providers/config';
import { HttpClientModule } from '@angular/common/http';
import { EventsPageModule } from '../pages/events/events.module';
import { FcmProvider } from '../providers/fcm/fcm';
import { ForgotPasswordPageModule } from '../pages/forgot-password/forgot-password.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { MeasurePageModule } from '../pages/measure/measure.module';
import { NotificationSettingsPageModule } from '../pages/notification-settings/notification-settings.module';
import { TermsAndConditionsPageModule } from '../pages/terms-and-conditions/terms-and-conditions.module';
import { MeasureDetailPageModule } from '../pages/measure-detail/measure-detail.module';
import { ArticlesPageModule } from '../pages/articles/articles.module';
import { ProductsPageModule } from '../pages/products/products.module';
import { PrivacyPageModule } from '../pages/privacy/privacy.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { EmailVerifyPageModule } from '../pages/email-verify/email-verify.module';
import { FirebaseMessagingProvider } from '../providers/firebase-messaging';
import { DataProvider } from '../providers/data/data';
import { ReportDetailPageModule } from '../pages/report-detail/report-detail.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    TabsPageModule,
    LoginPageModule,
    SignupPageModule,
    EventsPageModule,
    SettingsPageModule,
    AngularFirestoreModule,
    ForgotPasswordPageModule,
    DashboardPageModule,
    MeasurePageModule,
    NotificationSettingsPageModule,
    TermsAndConditionsPageModule,
    MeasureDetailPageModule,
    ArticlesPageModule,
    ProductsPageModule,
    PrivacyPageModule,
    ProfilePageModule,
    EmailVerifyPageModule,
    ReportDetailPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Firebase,
    FcmProvider,
    FirebaseMessagingProvider,
    DataProvider,
  ]
})
export class AppModule {}
