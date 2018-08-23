webpackJsonp([10],{

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationPageModule", function() { return LocationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location__ = __webpack_require__(480);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LocationPageModule = /** @class */ (function () {
    function LocationPageModule() {
    }
    LocationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__location__["a" /* LocationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__location__["a" /* LocationPage */]),
            ],
        })
    ], LocationPageModule);
    return LocationPageModule;
}());

//# sourceMappingURL=location.module.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_spinner_spinner__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_map_map__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LocationPage = /** @class */ (function () {
    function LocationPage(navCtrl, geolocation, zone, platform, localStorage, mapService, spinner, viewCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.zone = zone;
        this.platform = platform;
        this.localStorage = localStorage;
        this.mapService = mapService;
        this.spinner = spinner;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.addressElement = null;
        this.address = '';
        this.platform.ready().then(function () { return _this.loadMaps(); });
    }
    LocationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
    };
    LocationPage.prototype.loadMaps = function () {
        if (!!google) {
            this.initializeMap();
            this.initAutocomplete();
        }
        else {
            this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.');
        }
    };
    LocationPage.prototype.initializeMap = function () {
        var _this = this;
        var that = this;
        var userLatLangObj = that.currentLocation();
        this.zone.run(function () {
            var mapEle = _this.mapElement.nativeElement;
            _this.map = new google.maps.Map(mapEle, {
                zoom: 16,
                center: { lat: 0, lng: 0 }
            });
            var marker = new google.maps.Marker({
                position: userLatLangObj,
                map: _this.map,
                title: 'My current location'
            });
            console.log(marker);
        });
    };
    LocationPage.prototype.initAutocomplete = function () {
        var _this = this;
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
            console.log('Searchdata', location);
            var latLngObj = { 'lat': location.lat(), 'long': location.lng() };
            _this.getAddress(latLngObj);
            var options = {
                center: location,
                zoom: 16
            };
            _this.map.setOptions(options);
        });
    };
    LocationPage.prototype.currentLocation = function () {
        var _this = this;
        this.spinner.load();
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            console.log(JSON.stringify(latLng));
            var latLngObj = { 'lat': position.coords.latitude, 'long': position.coords.longitude };
            // Display  Marker
            _this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            _this.getAddress(latLngObj);
            _this.spinner.dismiss();
            localStorage.setItem('current_latlong', JSON.stringify(latLngObj));
            return latLngObj;
        }, function (err) {
            console.log(err);
        });
    };
    LocationPage.prototype.getAddress = function (latLngObj) {
        var _this = this;
        // Get the address object based on latLngObj
        this.mapService.getStreetAddress(latLngObj).subscribe(function (s_address) {
            if (s_address.status == "ZERO_RESULTS") {
                _this.mapService.getAddress(latLngObj).subscribe(function (address) {
                    _this.address = address.results[0].formatted_address;
                    _this.getAddressComponentByPlace(address.results[0], latLngObj);
                }, function (err) { return console.log("Error in getting the street address " + err); });
            }
            else {
                _this.address = s_address.results[0].formatted_address;
                _this.getAddressComponentByPlace(s_address.results[0], latLngObj);
                console.log(_this.address);
            }
        }, function (err) {
            console.log('No Address found ' + err);
        });
    };
    LocationPage.prototype.getMapCenter = function () {
        return this.map.getCenter();
    };
    LocationPage.prototype.createAutocomplete = function (addressEl) {
        var _this = this;
        var autocomplete = new google.maps.places.Autocomplete(addressEl);
        autocomplete.bindTo('bounds', this.map);
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    var latLngObj = { 'lat': place.geometry.location.lat(), 'long': place.geometry.location.lng() };
                    _this.getAddress(latLngObj);
                    sub.next(place.geometry.location);
                }
            });
        });
    };
    LocationPage.prototype.getAddressComponentByPlace = function (place, latLngObj) {
        var components;
        components = {};
        for (var i = 0; i < place.address_components.length; i++) {
            var ac = place.address_components[i];
            components[ac.types[0]] = ac.long_name;
        }
        var addressObj = {
            street: (components.street_number) ? components.street_number : 'not found',
            area: components.route,
            city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
            country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
            postCode: components.postal_code,
            loc: [latLngObj.long, latLngObj.lat],
            address: this.address
        };
        localStorage.clear();
        localStorage.setItem('carryr_customer', JSON.stringify(addressObj));
        this.localStorage.set('current_city', (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality);
        return components;
    };
    LocationPage.prototype.resizeMap = function () {
        var _this = this;
        setTimeout(function () {
            google.maps.event.trigger(_this.map, 'resize');
        }, 200);
    };
    LocationPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    LocationPage.prototype.errorAlert = function (title, message) {
        alert('Error in Alert');
    };
    LocationPage.prototype.navDealsListPage = function () {
        this.navCtrl.push("DealsListPage");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], LocationPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchbar', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], LocationPage.prototype, "searchbar", void 0);
    LocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-location',template:/*ion-inline-start:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/location/location.html"*/'<ion-header color="secondary">\n    <ion-toolbar no-border-top>\n        <ion-buttons float-end class="current-location">\n            <button ion-button icon-only (click)="currentLocation()">\n              <img src="./assets/icon/current-location.png" alt="">\n            </button>\n          </ion-buttons>\n        \n          <ion-searchbar autocorrect="off" autocapitalize="off" spellcheck="off" #searchbar placeholder="Search..." class="search-box"></ion-searchbar>      \n    </ion-toolbar>\n  </ion-header>\n  \n\n<ion-content>\n\n    <div #map id="map" class="map"></div>\n    <div class="centerMarker"></div>\n    <div class="address-view">\n      <ion-list>\n        <ion-item no-lines class="help-text">\n          Drag map to select Address\n        </ion-item>\n        <ion-item no-lines class="address-item">\n          <ion-label stacked class="title-label">ADDRESS</ion-label>\n          <ion-textarea class="address" [(ngModel)]="address"></ion-textarea>\n        </ion-item>\n        <ion-item>\n            <button ion-button round no-margin class="customBtn" float-right (click)="navDealsListPage()">Set location</button>\n        </ion-item>\n      </ion-list>\n    </div>\n  </ion-content>\n  '/*ion-inline-end:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/location/location.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__providers_map_map__["a" /* MapProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_spinner_spinner__["a" /* SpinnerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], LocationPage);
    return LocationPage;
}());

//# sourceMappingURL=location.js.map

/***/ })

});
//# sourceMappingURL=10.js.map