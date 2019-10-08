import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class DataProvider {

  constructor(public http: HttpClient,
    public angularFirestore: AngularFirestore) {
    console.log('Hello DataProvider Provider');
  }

  getReports(uid: string) {
    return new Promise((resolve, reject) => {
      let sub = this.angularFirestore.doc('user-reports/' + uid).valueChanges().subscribe(reports => {
        sub.unsubscribe();
        resolve(reports);
      }, err => {
        reject(err);
      });
    });
  }
}
