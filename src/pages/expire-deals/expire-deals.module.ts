import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpireDealsPage } from './expire-deals';

@NgModule({
  declarations: [
    ExpireDealsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpireDealsPage),
  ],
})
export class ExpireDealsPageModule {}
