import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MerchantService } from '../../providers/merchant-service';
import { environment as ENV } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-near-me',
  templateUrl: 'near-me.html',
})
export class NearMePage {

  merchants: any = [];
  image_dir: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public merchantService: MerchantService) 
  {
      this.image_dir = ENV.BASE_URL;
  }

  ionViewWillEnter() {
      this.getNearByMerchants();
  }

  ionViewDidLoad() {
  }

  getNearByMerchants() {
      this.merchantService.getNearByMerchants(0).then(data => {
          this.merchants = data;
      });   
  }

  navMerchantPage(merchant: any){
      const tabs = this.navCtrl.parent;
      tabs.push("MerchantPage", {merchant: merchant});
  }
}
