import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { environment as ENV } from '../../environments/environment';
import { AuthService } from '../../providers/auth-service';
import { DealsService } from '../../providers/deals-service';

@IonicPage()
@Component({
  selector: 'page-my-deals',
  templateUrl: 'my-deals.html',
})
export class MyDealsPage {

  authToken: String;
  mydeals: any = [];
  image_dir: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService, private dealsService: DealsService,
              private modalCtrl: ModalController, public events: Events) 
  {
      this.authToken = "";
      this.image_dir = ENV.BASE_URL;

      this.events.subscribe('load:mydeals', () => { 
        this.getMyDeals();
      });

      //this.events.unsubscribe('load:mydeals');
  }

  ionViewDidLeave() {
  }

  getMyDeals() {
    if(this.authToken === "") {
        this.authService.getAuthToken().then((data) => {
            if(data) {
              this.authToken = data;
              this.dealsService.getAllMyDeals(this.authToken).then(data => {
                  this.mydeals = data;
              });
            }
            else {
              this.mydeals = [];
              const tabs = this.navCtrl.parent;
              tabs.push("LoginPage");
            }
        });
    } else {
      this.dealsService.getAllMyDeals(this.authToken).then(data => {
          this.mydeals = data;
      });
    }
  }

  navDealPage(deal: any, loadParent:boolean = false) {
    if(loadParent) {
      this.dealsService.getAllParentDeals(0).then(data => {
        data.filter((obj) => {
            if (obj.deal_id == deal.parent_deal_id){
              const tabs = this.navCtrl.parent;
              tabs.push("DealPage", {deal: obj});
            }
        });
      });
    }
    else {
      const tabs = this.navCtrl.parent;
      tabs.push("DealPage", {deal: deal});
    }
  }

  openQrModal(title, qrcode_string){
    var qrData = { qrCode : qrcode_string, dealName: title };

    var qrPage = this.modalCtrl.create('QrCodePage', qrData, {cssClass: 'select-modal' });
    qrPage.present();
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
