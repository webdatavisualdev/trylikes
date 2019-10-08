import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage, TermsModal } from './login';

@NgModule({
  declarations: [
    LoginPage,
    TermsModal,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [
    TermsModal,
  ]
})
export class LoginPageModule {}
