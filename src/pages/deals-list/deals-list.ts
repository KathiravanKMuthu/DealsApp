import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DealsService } from '../../providers/deals-service';
import { MerchantService } from '../../providers/merchant-service';
import { MapProvider } from '../../providers/map/map';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-deals-list',
  templateUrl: 'deals-list.html',
})
export class DealsListPage {
  searchTerm: string = '';
  deals: any = [];
  merchants: any = [];
  public category: string = 'Deals';
  public categories: Array<string> = ['NearMe', 'Deals', 'ExpiredSoon','MyDeals']
  currentCity: any;

  constructor(public navCtrl: NavController, public dealsService: DealsService, 
              public merchantService: MerchantService, public mapProvider: MapProvider, public storage: Storage) { 
    this.category = 'Deals';
    this.getCurrentCity();
    this.onTabChanged('Deals');
  }

  getCurrentCity() {
    this.currentCity = "";
    if(this.mapProvider.currentLocation()) {
      this.storage.get("current_city").then((city) => {
          this.currentCity = city;
      }).catch((err) => {console.log ("City name is empty " + err)});
    }
  }

  openLocationPage() {
    this.navCtrl.push("LocationPage");
  }

  getAllDeals() {
    this.dealsService.getAllDeals(0).then(data => {
      this.deals = data;
    });
  }

  getNearByMerchants() {
    this.merchantService.getNearByMerchants(0).then(data => {
      this.merchants = data;
    });   
  }

  onTabChanged(tabName) {
    this.category = tabName;

    switch (this.category) {
      case 'NearMe':
        this.getNearByMerchants();
        break;
      case 'Deals':
        this.getAllDeals();
        break;
      case 'ExpiredSoon':
        this.getAllDeals();
        break;
      case 'MyDeals':
        this.getAllDeals();
        break;
      default:
        break;
    }
  } // end of onTabChanged

  navMerchantPage(merchant: any){
    this.navCtrl.push("MerchantPage", {merchant: merchant});
  }

  navDealPage(deal: any){
    this.navCtrl.push("DealPage", {deal: deal});
  }
}
