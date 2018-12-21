import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { environment as ENV } from '../../environments/environment';
import { AuthService } from '../../providers/auth-service';
import { DealsService } from '../../providers/deals-service';

@IonicPage()
@Component({
  selector: 'page-claims-list',
  templateUrl: 'claims-list.html',
})
export class ClaimsListPage {

  authToken: String;
  mydeals: any = [];
  image_dir: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService, private dealsService: DealsService) 
  {
      this.authToken = "";
      this.image_dir = ENV.BASE_URL;

      this.getMyRedeemedDeals();
  }

  ionViewDidLeave() {
  }

  getMyRedeemedDeals() {
    if(this.authToken === "") {
        this.authService.getAuthToken().then((data) => {
            if(data) {
              this.authToken = data;
              this.dealsService.getAllUserRedeemed(this.authToken).then(data => {
                  this.mydeals = data;
              });
            }
            else {
              this.mydeals = [];
              this.navCtrl.push("LoginPage");
            }
        });
    } else {
      this.dealsService.getAllUserRedeemed(this.authToken).then(data => {
          this.mydeals = data;
      });
    }
  }

  navDealPage(deal: any, loadParent:boolean = false) {
    if(loadParent) {
      this.dealsService.getAllParentDeals(0).then(data => {
        data.filter((obj) => {
            if (obj.deal_id == deal.parent_deal_id){
              this.navCtrl.push("DealPage", {deal: obj});
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

}
