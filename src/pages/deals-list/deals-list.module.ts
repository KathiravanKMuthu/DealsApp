import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsListPage } from './deals-list';
import { SwipeSegmentDirective } from '../../directives/swipe-segment.directive';
import { MomentModule } from 'angular2-moment';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    DealsListPage,
    SwipeSegmentDirective
  ],
  imports: [
    IonicPageModule.forChild(DealsListPage),
    MomentModule, NgxQRCodeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DealsListPageModule {}
