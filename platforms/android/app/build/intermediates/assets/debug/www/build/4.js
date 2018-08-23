webpackJsonp([4],{

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantPageModule", function() { return MerchantPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__merchant__ = __webpack_require__(484);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MerchantPageModule = /** @class */ (function () {
    function MerchantPageModule() {
    }
    MerchantPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__merchant__["a" /* MerchantPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__merchant__["a" /* MerchantPage */]),
            ],
        })
    ], MerchantPageModule);
    return MerchantPageModule;
}());

//# sourceMappingURL=merchant.module.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MerchantPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_launch_navigator__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_app_config__ = __webpack_require__(485);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MerchantPage = /** @class */ (function () {
    function MerchantPage(navCtrl, navParams, zone, platform, launchNavigator, callNumber) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.platform = platform;
        this.launchNavigator = launchNavigator;
        this.callNumber = callNumber;
        this.images = ["../../assets/images/slide-1.jpg", "../../assets/images/slide-2.jpg", "../../assets/images/slide-3.jpg"];
        this.merchant = navParams.get("merchant");
        this.platform.ready().then(function () { return _this.loadMap(); });
        this.address = this.getAddress();
        if (this.merchant.website == undefined || this.merchant.website == "")
            this.merchant.website = __WEBPACK_IMPORTED_MODULE_4__config_app_config__["a" /* environment */].DEFAULT_WEBSITE;
        if (this.merchant.youtube == undefined || this.merchant.youtube == "")
            this.merchant.youtube = __WEBPACK_IMPORTED_MODULE_4__config_app_config__["a" /* environment */].DEFAULT_YOUTUBE;
        if (this.merchant.facebook == undefined || this.merchant.facebook == "")
            this.merchant.facebook = __WEBPACK_IMPORTED_MODULE_4__config_app_config__["a" /* environment */].DEFAULT_FACEBOOK;
        if (this.merchant.instagram == undefined || this.merchant.instagram == "")
            this.merchant.instagram = __WEBPACK_IMPORTED_MODULE_4__config_app_config__["a" /* environment */].DEFAULT_INSTAGRAM;
    }
    MerchantPage.prototype.isFavorite = function () {
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
    MerchantPage.prototype.addMarker = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        var content = "<p>" + this.address + "</p>";
        this.addInfoWindow(marker, content);
    };
    MerchantPage.prototype.loadMap = function () {
        if (!!google) {
            this.initializeMap();
        }
        else {
            console.log('Error', 'Something went wrong with the Internet Connection. Please check your Internet.');
        }
    };
    MerchantPage.prototype.initializeMap = function () {
        var _this = this;
        var latLng = new google.maps.LatLng(12.985319, 80.213906);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'none',
            draggable: false,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false
        };
        this.zone.run(function () {
            var mapEle = _this.mapElement.nativeElement;
            _this.map = new google.maps.Map(mapEle, mapOptions);
            _this.addMarker();
        });
    };
    MerchantPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    MerchantPage.prototype.getAddress = function () {
        var address = this.merchant.address;
        if (this.merchant.state != "")
            address = address + ", " + this.merchant.state;
        if (this.merchant.country != "")
            address = address + ", " + this.merchant.country;
        return address;
    };
    MerchantPage.prototype.openURL = function (website) {
        window.open(website, '_blank', 'location=yes');
    };
    MerchantPage.prototype.openMap = function () {
        var options = {
            start: ""
        };
        this.launchNavigator.navigate(this.address, options)
            .then(function (success) { return console.log('Launched navigator' + success); }, function (error) { return alert('Error launching navigator: ' + error); });
    };
    MerchantPage.prototype.callMerchant = function () {
        this.callNumber.callNumber(this.merchant.phone_number, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return alert('Error launching navigator: ' + err); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MerchantPage.prototype, "mapElement", void 0);
    MerchantPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-merchant',template:/*ion-inline-start:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/merchant/merchant.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>{{merchant.business_name}}</ion-title>\n    <ion-buttons end>\n        <button class="white" ion-button clear (click)="share(merchant)"><ion-icon name="share"></ion-icon></button>\n    </ion-buttons>\n</ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-list>\n    <ion-item no-padding no-margin>\n        <ion-slides autoplay="500" loop="true" speed="1000" pager="true" paginationType="bullets">\n            <ion-slide *ngFor="let image of images">\n              <img src="{{image}}" />\n            </ion-slide>\n          </ion-slides>        \n    </ion-item>\n    <ion-item no-padding no-margin>\n        <h2 class="title">{{merchant.business_name}}</h2>\n        <p class="details">{{merchant.description}}</p>\n        <p>OPENING HOURS</p>\n        <p class="details">{{merchant.operating_hours}}</p>\n    </ion-item>\n    <ion-item no-padding no-margin>\n        <button clear  text-center small (click)="openURL(merchant.website)"><ion-icon name="ios-globe" color="primary"></ion-icon></button>\n        <button clear  text-center small (click)="openURL(merchant.facebook)"><ion-icon name="logo-facebook" color="primary"></ion-icon></button>\n        <button clear  text-center small (click)="openURL(merchant.youtube)"><ion-icon name="logo-youtube" color="primary"></ion-icon></button>\n        <button clear  text-center small (click)="openURL(merchant.instagram)"><ion-icon name="logo-instagram" color="primary"></ion-icon></button>\n        <button clear item-right text-center small (click)="callMerchant()"><ion-icon name="md-call" color="primary"></ion-icon>{{merchant.phone_number}}</button>\n    </ion-item>\n    <ion-item no-padding no-margin>\n        <button item-left text-left small (click)="openMap()"><ion-icon name="ios-navigate" color="primary"></ion-icon>{{address}}, {{merchant.postal_code}}</button>\n        <button item-right text-left small (click)="openMap()">Open Map</button>\n    </ion-item>\n  </ion-list>\n  <div #map class="map" id="map"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/merchant/merchant.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_launch_navigator__["a" /* LaunchNavigator */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */]])
    ], MerchantPage);
    return MerchantPage;
}());

//# sourceMappingURL=merchant.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FB_APP_ID */
/* unused harmony export GOOGLE_MAP_API_KEY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var FB_APP_ID = 1789345494452836;
var GOOGLE_MAP_API_KEY = 'AIzaSyC-8VBQYTJAUMfPK401zUu2Awj12DU30sU';
var environment = {
    BASE_URL: 'http://localhost:3000/api',
    FB_APP_ID: 1789345494452836,
    GOOGLE_MAP_API_KEY: 'AIzaSyC-8VBQYTJAUMfPK401zUu2Awj12DU30sU',
    DEFAULT_WEBSITE: "http://www.dealdio.com",
    DEFAULT_FACEBOOK: "https://www.facebook.com/dealdio/",
    DEFAULT_YOUTUBE: 'https://www.youtube.com/channel/UCRaZ29oPDSG4sF-z39VTzzQ/featured',
    DEFAULT_INSTAGRAM: 'https://www.instagram.com/explore/tags/dealdio/?hl=en'
};
//# sourceMappingURL=app-config.js.map

/***/ })

});
//# sourceMappingURL=4.js.map