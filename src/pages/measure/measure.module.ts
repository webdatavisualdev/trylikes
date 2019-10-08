import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeasurePage } from './measure';
import { DataProvider } from '../../providers/data/data';

@NgModule({
  declarations: [
    MeasurePage,
  ],
  imports: [
    IonicPageModule.forChild(MeasurePage),
  ],
  providers: [
    DataProvider,
  ]
})
export class MeasurePageModule {}
