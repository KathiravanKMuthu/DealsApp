import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage1Page } from './tabs-page1';

@NgModule({
  declarations: [
    TabsPage1Page,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage1Page),
  ],
})
export class TabsPage1PageModule {}
