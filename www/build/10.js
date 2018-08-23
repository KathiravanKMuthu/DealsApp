webpackJsonp([10],{

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationPageModule", function() { return LocationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location__ = __webpack_require__(483);
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

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_spinner_spinner__ = __webpack_require__(352);
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
    LocationPage.prototype.loadMaps = function () {
        if (!!google) {
            this.initializeMap();
        }
        else {
            this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.');
        }
    };
    LocationPage.prototype.initializeMap = function () {
        var _this = this;
        this.spinner.load();
        var latLangObj = this.localStorage.get('current_latlong');
        if (latLangObj == null) {
            latLangObj = this.currentLocation();
        }
        latLangObj.then(function (resp) {
            if (resp != null) {
                var latLng = void 0;
                if (resp.latitude != null) {
                    latLng = new google.maps.LatLng(resp.latitude, resp.longitude);
                }
                else {
                    var jsonObj = JSON.parse(resp);
                    latLng = new google.maps.LatLng(jsonObj.lat, jsonObj.long);
                }
                var mapOptions_1 = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    gestureHandling: 'none',
                    mapTypeControl: false,
                    streetViewControl: false
                };
                _this.zone.run(function () {
                    var mapEle = _this.mapElement.nativeElement;
                    _this.map = new google.maps.Map(mapEle, mapOptions_1);
                    var latLngObj;
                    if (resp.latitude != null) {
                        latLngObj = { 'lat': resp.latitude, 'long': resp.longitude };
                    }
                    else {
                        latLngObj = resp;
                    }
                    _this.localStorage.set('current_latlong', JSON.stringify(latLngObj));
                    _this.addMarker();
                    _this.getAddress(latLngObj);
                    _this.initAutocomplete();
                    _this.spinner.dismiss();
                });
            }
        }).catch(function (err) { console.log("Error intializeMap" + err); });
    };
    LocationPage.prototype.addMarker = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            position: this.map.getCenter(),
            animation: google.maps.Animation.DROP,
            title: 'My current location'
        });
        console.log("Marker " + marker);
    };
    LocationPage.prototype.initAutocomplete = function () {
        var _this = this;
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
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
        //this.spinner.load();
        return this.geolocation.getCurrentPosition().then(function (position) { return position.coords; });
        /*{
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          console.log(JSON.stringify(latLng));
          let latLngObj = {'lat': position.coords.latitude, 'long': position.coords.longitude};
          // Display  Marker
          this.map.setCenter(latLng);
          this.getAddress(latLngObj);
          this.spinner.dismiss();
          this.localStorage.set('current_latlong', JSON.stringify(latLngObj));
          return latLngObj;
  
        });*/
    };
    LocationPage.prototype.getAddress = function (latLngObj) {
        var _this = this;
        // Get the address object based on latLngObj
        this.mapService.getStreetAddress(latLngObj).subscribe(function (s_address) {
            if (s_address.status == "ZERO_RESULTS") {
                _this.mapService.getAddress(latLngObj).subscribe(function (address) {
                    if (address.results[0] != null) {
                        _this.address = address.results[0].formatted_address;
                        _this.getAddressComponentByPlace(address.results[0], latLngObj);
                    }
                }, function (err) { return console.log("Error in getting the street address " + err); });
            }
            else {
                if (s_address.results[0] != null) {
                    _this.address = s_address.results[0].formatted_address;
                    _this.getAddressComponentByPlace(s_address.results[0], latLngObj);
                }
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
        console.log(JSON.stringify(components));
        /*let addressObj = {
          street: (components.street_number) ? components.street_number : 'not found',
          area: components.route,
          city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
          country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
          postCode: components.postal_code,
          loc: [latLngObj.long, latLngObj.lat],
          address: this.address
        }*/
        this.address = (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality;
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
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
    ], LocationPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchbar', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
    ], LocationPage.prototype, "searchbar", void 0);
    LocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-location',template:/*ion-inline-start:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/location/location.html"*/'<ion-header color="secondary">\n    <ion-navbar color="primary">\n      <ion-title>Select Location</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n      <ion-item>\n        <button ion-button icon-only float-end (click)="currentLocation()"><ion-icon name="ios-locate"></ion-icon></button>\n        <ion-searchbar autocorrect="off" autocapitalize="off" spellcheck="off" #searchbar placeholder="Search..." class="search-box"></ion-searchbar>        \n      </ion-item>\n  </ion-list>\n\n    <div #map id="map" class="map"></div>\n    <div class="centerMarker"></div>\n    <div class="address-view">\n      <ion-list>\n        <ion-item no-lines class="help-text">\n          Drag map to select Address\n        </ion-item>\n        <ion-item no-lines class="address-item">\n          <ion-label stacked class="title-label">ADDRESS</ion-label>\n          <ion-textarea class="address" [(ngModel)]="address"></ion-textarea>\n        </ion-item>\n      </ion-list>\n    </div>\n  </ion-content>\n  <ion-footer>\n      <ion-row>\n          <ion-col>\n              <button no-margin ion-button full round text-center class="customBtn" (click)="navDealsListPage()">Use Current location</button>\n            </ion-col>\n          <ion-col>\n              <button no-margin ion-button full round text-center class="customBtn" (click)="navDealsListPage()">Use Searched location</button>\n            </ion-col>\n      </ion-row>\n  </ion-footer>'/*ion-inline-end:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/location/location.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__providers_map_map__["a" /* MapProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_map_map__["a" /* MapProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_5__providers_spinner_spinner__["a" /* SpinnerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_spinner_spinner__["a" /* SpinnerProvider */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _l || Object])
    ], LocationPage);
    return LocationPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=location.js.map

/***/ })

});
//# sourceMappingURL=10.js.map