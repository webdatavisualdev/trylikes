import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EventsPage } from '../events/events';
import { SettingsPage } from '../settings/settings';
import { DashboardPage } from '../dashboard/dashboard';
import { MeasurePage } from '../measure/measure';
import { MeasureDetailPage } from '../measure-detail/measure-detail';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = MeasurePage;
  tab3Root = EventsPage;
  tab4Root = SettingsPage;

  tabType = 'default';

  selectedIndex = 0;

  measureTab1 = MeasureDetailPage;
  measureTab2 = MeasureDetailPage;
  measureTab3 = MeasureDetailPage;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public events: Events
  ) {
    this.events.subscribe('showMeasureDetail', (res) => {
      if (res) {
        this.tabType = 'measure';
      } else {
        this.selectedIndex = 1;
        this.tabType = 'default';
      }
    });
  }
}
