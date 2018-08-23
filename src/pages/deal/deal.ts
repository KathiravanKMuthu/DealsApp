import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DealsService, UserDeal } from '../../providers/deals-service';
import { MerchantService } from '../../providers/merchant-service';
import { LoadingController } from 'ionic-angular';
import { AuthService, UserInfo } from '../../providers/auth-service';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html',
})
export class DealPage {
  parentDeal: any;
  deals: any;
  loading: any;
  images: any = ["../../assets/images/slide-1.jpg", "../../assets/images/slide-2.jpg", "../../assets/images/slide-3.jpg" ];
  childDealId: any;
  userId: any;
  acceptedDealId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              public dealsService: DealsService, public merchantService: MerchantService, public authService: AuthService,
              public alertCtrl: AlertController, public modalCtrl: ModalController) 
  { 
    this.parentDeal = navParams.get("deal");
    this.childDealId = "";
    this.getAllChildDeals(this.parentDeal.id);
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getUserInfo().then((data: UserInfo) => {
      console.log("inside getUserInfo");
      this.userId = data.user_id;
    });
    this.userId = "";
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
    this.loading.dismiss();
  }

  isFavorite()
  {
    return false;
    /*var fav = JSON.parse(localStorage.getItem("msm_favorite"));
    if(fav){
      //check if the article is in favorite
      for(let i = 0; i < fav.length; i++)
      {
            if(this.msg.id === fav[i].id)
                return true;
      }
    }*/
  }

  setChildDeal(dealId: any) {
    console.log("setChildDeal");
    console.log(dealId);
    this.acceptedDealId = 0;

    if(this.userId != "") {
      this.dealsService.getAllUserDeals(this.userId).then((data: UserDeal[]) => {
        console.log("Got the data as " + data);
        if(data != null){
          data.filter((obj: UserDeal)=> {
            if (obj.deal_id == dealId) {
              this.acceptedDealId = dealId;
            }
          });
        }
      });
    }
  }

  isAcceptedDeal() {
    return (this.acceptedDealId > 0);
  }

  navMerchantPage(merchantId: string){
    this.merchantService.getMerchantDetails(merchantId).then(data => {
        if(data != undefined)
          this.navCtrl.push("MerchantPage", {merchant: data[0]});
        else
          alert('Unable to navigate to Merchant Page');
    }).catch(err => alert('Error launching Merchant Page: ' + err));
  }
  
  openQrModal(){
    var qrData = { qrCode : "", dealName: "" };

    this.deals.filter((obj) => {
      if(obj.id == this.childDealId)
      qrData.dealName = obj.title;
    });

    if(this.userId != "") {
      this.dealsService.getAllUserDeals(this.userId).then((data: UserDeal[]) => {
        console.log("openQrModal : Got the data as " + data);
        if(data != null){
          data.filter((obj: UserDeal)=> {
            if (obj.deal_id == this.childDealId) {
              qrData.qrCode = obj.qrcode_string;
            }
          });
        }
      });
    }

    var qrPage = this.modalCtrl.create('QrCodePage', qrData, {cssClass: 'select-modal' });
    qrPage.present();
  }

  acceptDeal() {
    if(this.childDealId != "") {
      if(this.userId != "")
      {
        console.log("User is authenticated");
        let qrCodeStr = this.childDealId + this.userId + Date.now;
        this.dealsService.setUserDeal(this.userId, this.childDealId, qrCodeStr);
        this.acceptedDealId = this.childDealId;
      }
      else
      {
        console.log("User is not authenticated");
        this.navCtrl.push("LoginPage");
      }
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Error', subTitle: 'Please select a deal before accepting it!', buttons: ['OK'], cssClass: "customLoader"
      });
      alert.present();
    }
    console.log("acceptDeal");
    console.log(this.childDealId);
  }
}
