import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthType } from '../types';
import { firestore } from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpClient,
    public afAuth: AngularFireAuth,
    public angularFirestore: AngularFirestore,
  ) {
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }

  signup(data: AuthType) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then((res: any) => {
        this.afAuth.auth.currentUser.sendEmailVerification().then(emailRes => {
          this.angularFirestore.doc('users/' + res.user.uid).set({
            email: data.email,
            company: data.company,
            phone: data.phone,
            emailVerified: false,
            name: data.name,
            location: data.location
          }).then((res) => {
            resolve({
              success: true
            });
          }).catch(() => {
            reject({
              success: false,
              message: 'Unknown error'
            });
          });
        }).catch(err => {
          reject({
            success: false,
            message: 'Sending email verification has failed.'
          });
        });
      }).catch(err => {
        reject({
          success: false,
          message: 'User already exists.'
        });
      });;
    });
  }

  login(data: AuthType) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password).then((res: any) => {
        if (this.afAuth.auth.currentUser.emailVerified) {
          this.angularFirestore.doc(`users/${res.user.uid}`).update({
            emailVerified: true
          }).then(() => {
            localStorage.setItem('token', this.afAuth.auth.currentUser.refreshToken);
            resolve({
              success: true
            });
          }).catch(() => {
            reject({
              success: false,
              message: 'Unknown Error.'
            });
          });
        } else {
          reject({
            success: false,
            message: 'Email is not verified.'
          });
        }
      }).catch(err => {
        reject({
          success: false,
          message: 'Login has failed.'
        });
      });;
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('token');
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  getUser() {
    return new Promise((resolve, reject) => {
      let sub = this.afAuth.authState.subscribe((res: any) => {
        this.angularFirestore.doc('users/' + res.uid).valueChanges().subscribe(user => {
          sub.unsubscribe();
          resolve(user);
        });
      });
    });
  }

  updateUser(data) {
    return new Promise((resolve, reject) => {
      let sub = this.afAuth.authState.subscribe((res: any) => {
        this.angularFirestore.doc('users/' + res.uid).update(data).then(status => {
          sub.unsubscribe();
          resolve('success');
        });
      });
    });
  }

  sendEmailVerification() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  updateEulaAcceptedStatus() {
    return new Promise((resolve, reject) => {
      let sub = this.afAuth.authState.subscribe((res: any) => {
        this.angularFirestore.doc('users/' + res.uid).update({eulaAccepted: true}).then(() => {
          sub.unsubscribe();
          resolve('success');
        });
      });
    });
  }
}
