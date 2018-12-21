import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DealsService } from '../../providers/deals-service';
import { MerchantService } from '../../providers/merchant-service';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { DealInfo } from '../../interfaces/deal-info';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html',
})
export class DealPage {
  parentDeal: any;
  deals: any;
  loading: any;
  images: any = [];
  childDealId: any;
  authToken: any;
  acceptedDealId: any;
  isFav: boolean = false;
  parentDealId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              public dealsService: DealsService, public merchantService: MerchantService, public authService: AuthService,
              public alertCtrl: AlertController, public modalCtrl: ModalController, private socialSharing: SocialSharing) 
  { 
        this.isFav = false;
        this.parentDeal = navParams.get("deal");
        this.parentDealId = navParams.get("deal_id");
        this.childDealId = "";
  }

  ionViewDidLoad() {
    this.loadParentDeal();
    this.getAllChildDeals(this.parentDeal.deal_id);
    this.getUserInfo();
    this.getMerchantDetails();
  }

  loadParentDeal() {
      if(this.parentDeal == "" && this.parentDealId != "") {
          this.dealsService.getDealById(this.parentDealId).then((record) => {
              this.parentDeal = record;
          });
      }
  }

  getUserInfo() {
    this.authToken = "";
    this.authService.getAuthToken().then((data) => {
      if(data) {
          this.authToken = data;
          this.isFavorite(this.parentDeal.deal_id);
      }
    });
  }

  getAllChildDeals(parentDealId: any){
    this.loading = this.loadingCtrl.create({
      content: 'Fetching Deals Information...',
      duration: 5000
    });
    this.loading.present();

    this.deals = [];
    this.dealsService.getAllChildDeals(parentDealId).then(data => {
      this.deals = data;
    });

    this.dealsService.getParentDealImages(parentDealId).then(data => {
      this.images = data;
    });
    this.loading.dismiss();
  }

  getMerchantDetails() {
      this.merchantService.getMerchantDetails(this.parentDeal.merchant_id).then((data) => {
        if(data && data[0] && data[0]["business_name"])
          this.parentDeal.business_name = data[0]["business_name"];
      });
  }

  setChildDeal(dealId: any) {
    this.acceptedDealId = 0;
    if(this.authToken != "") {
      this.dealsService.getAllMyDeals(this.authToken).then((data) => {
          data.filter((obj)=> {
            if (obj.deal_id == dealId) {
              this.acceptedDealId = dealId;
            }
          });
      });
    }
  }

  isAcceptedDeal() {
    return (this.acceptedDealId > 0);
  }

  navMerchantPage(){
    this.merchantService.getMerchantDetails(this.parentDeal.merchant_id).then(data => {
        if(data != undefined)
          this.navCtrl.push("MerchantPage", {merchant: data[0]});
        else
          alert('Unable to navigate to Merchant Page');
    }).catch(err => alert('Error launching Merchant Page: ' + err));
  }
  
  openQrModal(){
      var qrData = { qrCode : "", dealName: "" };

      this.deals.filter((obj) => {
        if(obj.deal_id == this.childDealId)
            qrData.dealName = obj.title;
      });

      if(this.authToken != "") {
        this.dealsService.getAllMyDeals(this.authToken).then((data) => {
            data.filter((obj)=> {
              if (obj.deal_id == this.childDealId) {
                  qrData.qrCode = obj.qrcode_string;
              }
            });
            var qrPage = this.modalCtrl.create('QrCodePage', qrData, {cssClass: 'select-modal' });
            qrPage.present();      
        });
      }
  }

  acceptDeal() {
      if(this.childDealId != "") {
          if(this.authToken != "")
          {
              let today = new Date();
              let qrCodeStr = "user_id:" + this.authToken;
                  qrCodeStr += " deal_id:" + this.childDealId;
                  qrCodeStr += " merchant_id:" + this.parentDeal.merchant_id;
                  qrCodeStr += " DATE:" + today.getTime() / 1000;
              this.dealsService.setUserDeal(this.authToken, this.childDealId, qrCodeStr).then((success) => {
                  if(success) // Only if deal is accepted successfully
                      this.acceptedDealId = this.childDealId;
              });
          }
          else
          {
              this.navCtrl.push("LoginPage");
          }
      }
      else {
          let alert = this.alertCtrl.create({
            title: 'Error', subTitle: 'Please select a deal before accepting it!', buttons: ['OK'], cssClass: "customLoader"
          });
          alert.present();
      }
  }


  getDateDiff(endDate) {
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
        if(days == 0) {
            returnStr = "only today";
        } 
        else {
            returnStr = days + " days ";
        }
        returnStr += ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + seconds).slice(-2) + " left";
    }
    return returnStr;
  }

  isFavorite(dealId: any) {
    this.isFav = false;
    if(this.authToken != "" ) {          
      this.dealsService.getAllUserFavorite(this.authToken).then(deals => {
          let deal = deals.filter(obj => {
              return (dealId == obj.deal_id);
          });

          if(deal.length > 0) {
              this.isFav = true;
          }
      }).catch(e => { console.log(" Error in isFavorite " + e); });
    }
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

        if(success) {
          this.isFav = fav;
        }
      });
  }

  share() {
    // this code is to use the social sharing plugin
    // message, subject, file, url
    this.socialSharing.share("Check this Deal:  dinjerdealsapp://dinjer/deals/" + this.parentDeal.deal_id, this.parentDeal.title, this.images[0])
    .then(() => {
    })
    .catch(() => {
    });
  }

}
