import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SliderPage } from './slider';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    SliderPage
  ],
  imports: [
    IonicPageModule.forChild(SliderPage),
    SuperTabsModule.forRoot()
  ],
})
export class SliderPageModule {}
