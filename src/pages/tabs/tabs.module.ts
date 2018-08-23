import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { TabsLayout2Module } from '../../components/tabs/layout-2/tabs-layout-2.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    TabsLayout2Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsPageModule {}
