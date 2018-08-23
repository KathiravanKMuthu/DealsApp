import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsListPage } from './deals-list';
import { SwipeSegmentDirective } from '../../directives/swipe-segment.directive';
import { SearchBarLayout1Module } from '../../components/search-bar/layout-1/search-bar-layout-1.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    DealsListPage,
    SwipeSegmentDirective
  ],
  imports: [
    IonicPageModule.forChild(DealsListPage),
    SearchBarLayout1Module,
    MomentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DealsListPageModule {}
