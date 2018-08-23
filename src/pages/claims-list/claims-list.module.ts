import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClaimsListPage } from './claims-list';

@NgModule({
  declarations: [
    ClaimsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClaimsListPage),
  ],
})
export class ClaimsListPageModule {}
