import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Platform } from 'ionic-angular';
import { DealsService } from '../../providers/deals-service';
import { MerchantService } from '../../providers/merchant-service';
import { MapProvider } from '../../providers/map/map';
import { Storage } from '@ionic/storage';
import { environment as ENV } from '../../environments/environment';
import { AuthService } from '../../providers/auth-service';
import { SpinnerProvider } from '../../providers/spinner/spinner';
import { DealInfo } from '../../interfaces/deal-info';

@IonicPage()
@Component({
  selector: 'page-deals-list',
  templateUrl: 'deals-list.html'
})
export class DealsListPage {
  searchTerm: string = '';
  deals: any = [];
  mydeals: any = [];
  expdeals: any = [];
  merchants: any = [];
  public category: string = 'Deals';
  public categories: Array<string> = ['NearMe', 'Deals', 'ExpiredSoon','MyDeals']
  public currentCity: any;
  image_dir: any;
  authToken: String;

  constructor(public navCtrl: NavController, public dealsService: DealsService, public authService: AuthService,
              public merchantService: MerchantService, public mapProvider: MapProvider, public storage: Storage,
              public modalCtrl: ModalController, public cdRef: ChangeDetectorRef, public spinner : SpinnerProvider,
              public navParams: NavParams, private platform: Platform)
  { 
      this.authToken = "";
      this.platform.ready().then(() => {
      this.getCurrentCity();
      });
      this.image_dir = ENV.BASE_URL;
  }

  ionViewWillEnter() {
    this.category = 'Deals';
    this.setSegments(1); // Deals Segment Tab
  }

  ionViewLoaded() {
    this.cdRef.markForCheck();
  }

  getCurrentCity() {
    this.spinner.load();
    this.currentCity = "";
    if(this.navParams.data["loadCurrentCity"] == false)
    {
        this.storage.get("current_city").then((city) => {
          this.currentCity = city;
          this.spinner.dismiss();
        });
    }

    this.mapProvider.currentLocation().then((success) => {
        if(success && this.currentCity == "") {
          this.storage.get("current_city").then((city) => {
              this.currentCity = city;
          }).catch((err) => {console.log ("City name is empty " + err)});
        }
        this.spinner.dismiss();
    });
  }

  openLocationPage() {
    this.navCtrl.push("LocationPage");
  }

  getAllDeals() {
    this.dealsService.getAllParentDeals(0).then(data => {
      if(data && data.length > 0)
      {
          data.forEach((deal) => {
              this.merchantService.getMerchantDetails(deal.merchant_id).then((merchant) => {
                if(merchant && merchant[0] && merchant[0]["business_name"])
                    deal.business_name = merchant[0]["business_name"];
              }); 
          });
      }
      this.deals = data;
    });
  }

  getNearByMerchants() {
    this.merchantService.getNearByMerchants(0).then(data => {
      this.merchants = data;
    });   
  }

  getMyDeals() {
    if(this.authToken === "") {
        this.authService.getAuthToken().then((data) => {
            if(data) {
              this.authToken = data;
            }
            else {
              this.mydeals = [];
              this.navCtrl.push("LoginPage");
            }
        });
    } else {
      this.dealsService.getAllUserDeals(this.authToken).then(data => {
          this.mydeals = data;
      });
    }
  }

  getExpiringDeals() {
    this.dealsService.getExpiringDeals(0).then(data => {
        this.expdeals = data;
    });
  }

  setSegments(segmentIndex) {
    this.category = this.categories[segmentIndex];

    switch (this.category) {
      case 'NearMe':
        this.getNearByMerchants();
        break;
      case 'Deals':
        this.getAllDeals();
        break;
      case 'ExpiredSoon':
        this.getExpiringDeals();
        break;
      case 'MyDeals':
        this.getMyDeals();
        break;
      default:
        break;
    }
  }

  onTabChanged(e) {
    console.log(" onTab Changed " + e);
  } // end of onTabChanged

  navMerchantPage(merchant: any){
    this.navCtrl.push("MerchantPage", {merchant: merchant});
  }

  navDealPage(deal: any, loadParent:boolean = false){

    if(loadParent) {
      this.dealsService.getAllParentDeals(0).then(data => {
        data.filter((obj) => {
            if (obj.deal_id == deal.parent_deal_id){
              this.navCtrl.setRoot("DealPage", {deal: obj});
            }
        });
      });
    }
    else {
      this.navCtrl.setRoot("DealPage", {deal: deal});
    }
  }

  getDateDiff(endDate, onlyDays=false) {
    //setTimeout(() => { 
        let start = new Date();
        let end = new Date(endDate);
        let diff = end.getTime() - start.getTime();
        var days = Math.floor(diff / (60 * 60 * 24 * 1000));
        var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
        var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
        var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
        var returnStr = "";

        if(days < 0) {
            returnStr = "Deal is Expired !!!";
        }
        else if(days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
            returnStr = "Deal is Expired !!!";
        }
        else {
            if(onlyDays && days == 0) {
                returnStr = "only today";
            } 
            else {
                returnStr = days + " days ";
            }
            if(!onlyDays) {
              returnStr += ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + seconds).slice(-2) + " left";
            }
        }

        return returnStr;
    //});
  }

  openQrModal(title, qrcode_string){
      var qrData = { qrCode : qrcode_string, dealName: title };

      var qrPage = this.modalCtrl.create('QrCodePage', qrData, {cssClass: 'select-modal' });
      qrPage.present();
  }

  navCategoryPage() {
      this.navCtrl.push("CategoryListPage");
  }

  isFavorite(dealId: any): boolean {
      if(this.authToken === "" )
          return false;
          
      console.log("This deal is wished " + dealId);
      this.dealsService.getAllUserDeals(this.authToken).then(deals => {
          let deal = deals.filter(obj => {
              return (dealId == obj.deal_id);
          });
          if(deal.length > 0) {
              return true;
          }
      });
      return false;
  }

  favorite(deal: DealInfo) {
      if(this.authToken === "") {
        this.authService.getAuthToken().then((data) => {
            if(data) {
              this.authToken = data;
              this.setFavoriteDeal(deal, true);
            }
            else {
              this.navCtrl.push("LoginPage");
            }
        });
      } else {
        this.setFavoriteDeal(deal, true);
      }
  }

  unFavorite(deal: DealInfo) {
      if(this.authToken === "") {
        this.authService.getAuthToken().then((data) => {
            if(data) {
              this.authToken = data;
              this.setFavoriteDeal(deal, false);
            }
            else {
              this.navCtrl.push("LoginPage");
            }
        });
      } else {
        this.setFavoriteDeal(deal, false);
      }
  }

  setFavoriteDeal(deal: DealInfo, fav: boolean) {
      this.dealsService.setWishDeal(this.authToken, deal.deal_id, (fav ? 1 : 0) ).then((success) => {
          console.log("setFavoriteDeal " + success);
      });
  }
} // end of class
