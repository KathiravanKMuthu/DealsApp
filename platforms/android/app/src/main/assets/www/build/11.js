webpackJsonp([11],{

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DealPageModule", function() { return DealPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deal__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DealPageModule = /** @class */ (function () {
    function DealPageModule() {
    }
    DealPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__deal__["a" /* DealPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__deal__["a" /* DealPage */]),
                __WEBPACK_IMPORTED_MODULE_3_angular2_moment__["MomentModule"]
            ],
        })
    ], DealPageModule);
    return DealPageModule;
}());

//# sourceMappingURL=deal.module.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_deals_service__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_merchant_service__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(344);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DealPage = /** @class */ (function () {
    function DealPage(navCtrl, navParams, loadingCtrl, dealsService, merchantService, authService, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.dealsService = dealsService;
        this.merchantService = merchantService;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.images = ["../../assets/images/slide-1.jpg", "../../assets/images/slide-2.jpg", "../../assets/images/slide-3.jpg"];
        this.parentDeal = navParams.get("deal");
        this.childDealId = "";
        this.getAllChildDeals(this.parentDeal.id);
        this.getUserInfo();
    }
    DealPage.prototype.getUserInfo = function () {
        var _this = this;
        this.authService.getUserInfo().then(function (data) {
            console.log("inside getUserInfo");
            _this.userId = data.user_id;
        });
        this.userId = "";
    };
    DealPage.prototype.getAllChildDeals = function (parentDealId) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Fetching Deals Information...',
            duration: 5000
        });
        this.loading.present();
        this.deals = [];
        this.dealsService.getAllChildDeals(parentDealId).then(function (data) {
            _this.deals = data;
        });
        this.loading.dismiss();
    };
    DealPage.prototype.isFavorite = function () {
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
    };
    DealPage.prototype.setChildDeal = function (dealId) {
        var _this = this;
        console.log("setChildDeal");
        console.log(dealId);
        this.acceptedDealId = 0;
        if (this.userId != "") {
            this.dealsService.getAllUserDeals(this.userId).then(function (data) {
                console.log("Got the data as " + data);
                if (data != null) {
                    data.filter(function (obj) {
                        if (obj.deal_id == dealId) {
                            _this.acceptedDealId = dealId;
                        }
                    });
                }
            });
        }
    };
    DealPage.prototype.isAcceptedDeal = function () {
        return (this.acceptedDealId > 0);
    };
    DealPage.prototype.navMerchantPage = function (merchantId) {
        var _this = this;
        this.merchantService.getMerchantDetails(merchantId).then(function (data) {
            if (data != undefined)
                _this.navCtrl.push("MerchantPage", { merchant: data[0] });
            else
                alert('Unable to navigate to Merchant Page');
        }).catch(function (err) { return alert('Error launching Merchant Page: ' + err); });
    };
    DealPage.prototype.openQrModal = function () {
        var _this = this;
        var qrData = { qrCode: "", dealName: "" };
        this.deals.filter(function (obj) {
            if (obj.id == _this.childDealId)
                qrData.dealName = obj.title;
        });
        if (this.userId != "") {
            this.dealsService.getAllUserDeals(this.userId).then(function (data) {
                console.log("openQrModal : Got the data as " + data);
                if (data != null) {
                    data.filter(function (obj) {
                        if (obj.deal_id == _this.childDealId) {
                            qrData.qrCode = obj.qrcode_string;
                        }
                    });
                }
            });
        }
        var qrPage = this.modalCtrl.create('QrCodePage', qrData, { cssClass: 'select-modal' });
        qrPage.present();
    };
    DealPage.prototype.acceptDeal = function () {
        if (this.childDealId != "") {
            if (this.userId != "") {
                console.log("User is authenticated");
                var qrCodeStr = this.childDealId + this.userId + Date.now;
                this.dealsService.setUserDeal(this.userId, this.childDealId, qrCodeStr);
                this.acceptedDealId = this.childDealId;
            }
            else {
                console.log("User is not authenticated");
                this.navCtrl.push("LoginPage");
            }
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Error', subTitle: 'Please select a deal before accepting it!', buttons: ['OK'], cssClass: "customLoader"
            });
            alert_1.present();
        }
        console.log("acceptDeal");
        console.log(this.childDealId);
    };
    DealPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-deal',template:/*ion-inline-start:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/deal/deal.html"*/'<ion-header>\n    <ion-navbar color="primary">\n      <ion-title>{{parentDeal.business_name}}</ion-title>\n      <ion-buttons end>\n          <button class="white" ion-button clear (click)="share(parentDeal)"><ion-icon name="share"></ion-icon></button>\n          <button class="white" ion-button clear *ngIf="!isFavorite()" (click)="favorite()"><ion-icon name="ios-heart-outline"></ion-icon></button>\n          <button class="white" ion-button clear *ngIf="isFavorite()" (click)="unFavorite()"><ion-icon name="ios-heart"></ion-icon></button>\n      </ion-buttons>\n  </ion-navbar>\n  </ion-header>\n  \n  <ion-content no-padding>\n    <ion-list>\n      <ion-item no-padding no-margin>\n          <ion-slides autoplay="500" loop="true" speed="1000" pager="true" paginationType="bullets">\n              <ion-slide *ngFor="let image of images">\n                <img src="{{image}}" />\n              </ion-slide>\n            </ion-slides>        \n      </ion-item>\n      <ion-item no-padding>\n          <h2 class="title">{{parentDeal.title}}</h2>\n          <p class="details">{{parentDeal.description}}</p>\n      </ion-item>\n      <ion-item no-padding>DEALS</ion-item>\n      <ion-item no-padding *ngFor="let obj of deals">\n          <ion-row>\n              <ion-col col-1>\n                  <input type="radio" [(ngModel)]="childDealId" class="radio-square" value="{{obj.id}}" (change)="setChildDeal(obj.id)">\n              </ion-col>\n              <ion-col col-11>\n                <p class="title">{{obj.title}}</p>\n              </ion-col>\n          </ion-row>\n          <ion-row>\n                <ion-col col-1>\n                </ion-col>\n                <ion-col col-9>\n                    <p color="primary">{{(obj.end_date| amFromUnix) | amLocal | amDifference: null :\'days\'}} days left</p>\n                    <p class="details">{{obj.redemption_count}}+ Redeemed</p>\n                </ion-col>\n                <ion-col col-2 *ngIf="obj.deal_amount > 0">\n                    <p color="primary">{{obj.deal_amount | currency:\'GBP\':\'symbol\':\'1.2-2\'}}</p>\n                    <p class="strikethrough">{{obj.actual_amount | currency:\'GBP\':\'symbol\':\'1.2-2\'}}</p>\n                </ion-col>\n                <ion-col col-2 *ngIf="obj.deal_amount <= 0">\n                    <p color="primary">{{obj.percentage}}% off</p>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                    <ion-col col-1>\n                    </ion-col>\n                    <ion-col col-9>\n                            <p class="details">{{obj.description}}</p>\n                        </ion-col>\n                    <ion-col col-2>\n                        <p class="primary" *ngIf="obj.actual_amount > 0">{{((obj.actual_amount - obj.deal_amount) / obj.actual_amount) | percent}} off</p>\n                    </ion-col>\n            </ion-row>\n\n        </ion-item>\n    </ion-list>\n  </ion-content>\n\n  <ion-footer>\n      <ion-row>\n          <ion-col>\n              <button no-margin ion-button full round text-center class="customBtn" (click)="navMerchantPage(parentDeal.business_id)">VISIT US</button>\n          </ion-col>\n          <ion-col>\n              <button no-margin ion-button full round text-center class="customBtn" (click)="acceptDeal()" *ngIf="!isAcceptedDeal()">ACCEPT</button>\n              <button no-margin ion-button full round text-center class="customBtn" (click)="openQrModal()" *ngIf="isAcceptedDeal()">QR Code</button>\n          </ion-col>\n      </ion-row>\n  </ion-footer>\n  '/*ion-inline-end:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/deal/deal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_deals_service__["a" /* DealsService */], __WEBPACK_IMPORTED_MODULE_3__providers_merchant_service__["a" /* MerchantService */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], DealPage);
    return DealPage;
}());

//# sourceMappingURL=deal.js.map

/***/ })

});
//# sourceMappingURL=11.js.map