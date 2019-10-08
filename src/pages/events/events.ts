import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as thsq from 'thsq';
import { FcmProvider } from '../../providers/fcm/fcm';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  public events = [
    {
      img: '',
      name: '',
      event: ''
    },
    {
      img: '',
      name: '',
      event: ''
    },
  ];

  public deviceAlert = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fcm: FcmProvider,
  ) {
    this.fcm.eventSubject.subscribe((message: string) => {
      this.events.push({
        img: '',
        name: '',
        event: message
      });
    });
  }

  ionViewDidLoad() {
    thsq.on('device-nearby-seen', function (device) {
      let name = 'unknown';
      if (device.s.name) {
          name = device.s.name.value;
      }
  
      let platform = thsq.devicePlatform(device);
      this.deviceAlert = 'Nearby device with name ' + name + ' and platform ' + platform + ' seen';
    });
    
    thsq.init();
  }

}
