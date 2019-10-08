import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class FcmProvider {
  public eventSubject = new Subject();

  constructor(
    public http: HttpClient,
    public firebase: Firebase,
    public angularFirestore: AngularFirestore,
    public platform: Platform,
    public toastCtrl: ToastController,
    public auth: AuthProvider
  ) {
    if (this.platform.is('cordova')) {
      this.listenToNotifications().pipe(
        tap(msg => {
          alert(JSON.stringify(msg))
          this.eventSubject.next(msg);
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe()
    }
  }

  async getToken() {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken()
    } 
    if (this.platform.is('ios')) {
      token = await this.firebase.getToken()
      await this.firebase.grantPermission()
    } 
    localStorage.setItem('deviceToken', token);
    return this.saveTokenToFirestore(token)
  }

  public saveTokenToFirestore(token, sound = false) {
    if (!token) return;

    return new Promise((resolve, reject) => {
      this.auth.getCurrentUser().subscribe((res: any) => {
        const devicesRef = this.angularFirestore.collection('devices')
        const docData = { 
          token,
          sound: sound,
          userId: res.uid,
        }
        devicesRef.doc(localStorage.getItem('deviceToken')).set(docData)
        resolve('success')
      });
    });
  }

  listenToNotifications() {
    return this.firebase.onNotificationOpen()
  }

  sendNotification() {}
}
