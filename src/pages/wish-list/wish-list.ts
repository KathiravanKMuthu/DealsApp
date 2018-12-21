import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DealsService } from '../../providers/deals-service';
import { environment as ENV } from '../../environments/environment';
import { DealInfo } from '../../interfaces/deal-info';
import { AuthService } from '../../providers/auth-service';

@IonicPage()
@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html',
})
export class WishListPage {
  deals: any = [];
  image_dir: any;
  authToken: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private dealsService: DealsService, private authService: AuthService)
  {
      this.image_dir = ENV.BASE_URL;
      this.deals = [];
  }

  ionViewWillEnter() {
      this.getMyFavorite();
  }

  ionViewDidLeave() {
      this.deals = [];
  }

  getMyFavorite() {
    if(this.authToken === "") {
        this.authService.getAuthToken().then((data) => {
            if(data) {
              this.authToken = data;
              this.getAllUserFavorite();
            }
            else {
              this.navCtrl.push("LoginPage");
            }
        });
      } else {
        this.getAllUserFavorite();
    }
  }

  getAllUserFavorite() {
    this.dealsService.getAllUserFavorite(this.authToken).then(data => {
      if(data && data.length > 0)
      {
          data.forEach((deal) => {
            this.dealsService.getAllDeals().then((allDeals) => {
                this.deals = allDeals.filter((obj) => {
                    return (obj.deal_id == deal.deal_id);
                });
            });
          });
      }
    });
  }

  navDealPage(deal: any, loadParent:boolean = false) {
      if(loadParent) {
        this.dealsService.getAllParentDeals(0).then(data => {
          data.filter((obj) => {
              if (obj.deal_id == deal.parent_deal_id){
                this.navCtrl.push("DealPage", {deal: deal});
              }
          });
        });
      }
      else {
        this.navCtrl.push("DealPage", {deal: deal});
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

  isFavorite(dealId: any): boolean {
    if(this.authToken === "" )
        return false;
        
    console.log("This deal is wished " + dealId);
    this.dealsService.getAllUserFavorite(this.authToken).then(deals => {
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
}
