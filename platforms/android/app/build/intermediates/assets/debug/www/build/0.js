webpackJsonp([0,14],{

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarLayout1Module", function() { return SearchBarLayout1Module; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_bar_layout_1__ = __webpack_require__(474);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchBarLayout1Module = /** @class */ (function () {
    function SearchBarLayout1Module() {
    }
    SearchBarLayout1Module = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__search_bar_layout_1__["a" /* SearchBarLayout1 */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search_bar_layout_1__["a" /* SearchBarLayout1 */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__search_bar_layout_1__["a" /* SearchBarLayout1 */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], SearchBarLayout1Module);
    return SearchBarLayout1Module;
}());

//# sourceMappingURL=search-bar-layout-1.module.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DealsListPageModule", function() { return DealsListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deals_list__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_swipe_segment_directive__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_search_bar_layout_1_search_bar_layout_1_module__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_moment__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DealsListPageModule = /** @class */ (function () {
    function DealsListPageModule() {
    }
    DealsListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__deals_list__["a" /* DealsListPage */],
                __WEBPACK_IMPORTED_MODULE_3__directives_swipe_segment_directive__["a" /* SwipeSegmentDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__deals_list__["a" /* DealsListPage */]),
                __WEBPACK_IMPORTED_MODULE_4__components_search_bar_layout_1_search_bar_layout_1_module__["SearchBarLayout1Module"],
                __WEBPACK_IMPORTED_MODULE_5_angular2_moment__["MomentModule"]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], DealsListPageModule);
    return DealsListPageModule;
}());

//# sourceMappingURL=deals-list.module.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarLayout1; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SearchBarLayout1 = /** @class */ (function () {
    function SearchBarLayout1() {
        this.searchTerm = "";
    }
    SearchBarLayout1.prototype.getItems = function (event) {
        var _this = this;
        if (!this.allItems) {
            this.allItems = this.data.items;
        }
        this.data.items = this.allItems.filter(function (item) {
            return item.title.toLowerCase().indexOf(_this.searchTerm.toLowerCase()) > -1;
        });
    };
    SearchBarLayout1.prototype.onEvent = function (event, item) {
        if (this.events[event]) {
            if ('onTextChange' === event) {
                this.getItems(item);
                this.events[event](this.searchTerm);
            }
            else {
                this.events[event](item);
            }
        }
        console.log(event);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SearchBarLayout1.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SearchBarLayout1.prototype, "events", void 0);
    SearchBarLayout1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'search-bar-layout-1',template:/*ion-inline-start:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/components/search-bar/layout-1/search-bar.html"*/'<!-- Theme Search - Simple -->\n\n<ion-header header-ios>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    <ion-title *ngIf="data != null" text-left>{{data.headerTitle}}</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar no-padding>\n\n    <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="onEvent(\'onTextChange\', $event)"></ion-searchbar>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<!-- Content -->\n\n<ion-content>\n\n  <ion-grid no-padding *ngIf="data != null">\n\n    <!-- List Search-->\n\n    <ion-row card-background-page>\n\n      <ion-col col-12 col-md-6 col-lg-4 *ngFor="let item of data.items;" (click)="onEvent(\'onItemClick\', item)">\n\n        <ion-card>\n\n          <img images-filter [src]="item.image" />\n\n          <!--- Big Title -->\n\n          <h2 card-title>{{item.title}}</h2>\n\n          <!-- Description -->\n\n          <h3 card-subtitle>{{item.subtitle}}</h3>\n\n        </ion-card>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/components/search-bar/layout-1/search-bar.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], SearchBarLayout1);
    return SearchBarLayout1;
}());

//# sourceMappingURL=search-bar-layout-1.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealsListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_deals_service__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_merchant_service__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_map_map__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DealsListPage = /** @class */ (function () {
    function DealsListPage(navCtrl, dealsService, merchantService, mapProvider, storage) {
        this.navCtrl = navCtrl;
        this.dealsService = dealsService;
        this.merchantService = merchantService;
        this.mapProvider = mapProvider;
        this.storage = storage;
        this.searchTerm = '';
        this.deals = [];
        this.merchants = [];
        this.category = 'Deals';
        this.categories = ['NearMe', 'Deals', 'ExpiredSoon', 'MyDeals'];
        this.category = 'Deals';
        this.getCurrentCity();
        this.onTabChanged('Deals');
    }
    DealsListPage.prototype.getCurrentCity = function () {
        var _this = this;
        this.currentCity = "";
        if (this.mapProvider.currentLocation()) {
            console.log(" Got current location");
            this.storage.get("current_city").then(function (city) {
                console.log("Current City is " + city);
                _this.currentCity = city;
            }).catch(function (err) { console.log("City name is empty " + err); });
        }
        ;
    };
    DealsListPage.prototype.openLocationPage = function () {
        this.navCtrl.push("LocationPage");
    };
    DealsListPage.prototype.getAllDeals = function () {
        var _this = this;
        this.dealsService.getAllDeals(0).then(function (data) {
            _this.deals = data;
        });
    };
    DealsListPage.prototype.getNearByMerchants = function () {
        var _this = this;
        this.merchantService.getNearByMerchants(0).then(function (data) {
            _this.merchants = data;
        });
    };
    DealsListPage.prototype.onTabChanged = function (tabName) {
        this.category = tabName;
        switch (this.category) {
            case 'NearMe':
                this.getNearByMerchants();
                break;
            case 'Deals':
                this.getAllDeals();
                break;
            case 'ExpiredSoon':
                this.getAllDeals();
                break;
            case 'MyDeals':
                this.getAllDeals();
                break;
            default:
                break;
        }
    }; // end of onTabChanged
    DealsListPage.prototype.navMerchantPage = function (merchant) {
        this.navCtrl.push("MerchantPage", { merchant: merchant });
    };
    DealsListPage.prototype.navDealPage = function (deal) {
        this.navCtrl.push("DealPage", { deal: deal });
    };
    DealsListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-deals-list',template:/*ion-inline-start:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/deals-list/deals-list.html"*/'<ion-header color="secondary">\n  <ion-toolbar no-border-top>\n      <ion-row no-padding style="height:50px !important">\n        <ion-col col-4 no-padding >\n            <ion-item class="searchText" no-padding no-margin style="height:20px !important">\n                <ion-icon name="ios-search" small item-right></ion-icon>\n                <ion-input type="text" placeholder="Search" ></ion-input>\n            </ion-item>\n        </ion-col>\n        <ion-col col-4 no-padding>\n                <button ion-button round text-left class="customBtn" float-right (click)="openLocationPage()">\n                  <ion-icon name="ios-locate-outline"></ion-icon>{{currentCity}}\n                </button>\n        </ion-col>\n        <ion-col col-4>\n            <button ion-button round no-margin class="customBtn" float-right>All Categories</button>\n        </ion-col>\n      </ion-row>\n  \n    <ion-segment [(ngModel)]="category" (ionChange)="onTabChanged(category)" >\n      <ion-segment-button value="NearMe">Near Me</ion-segment-button>\n      <ion-segment-button value="Deals">Deals</ion-segment-button>\n      <ion-segment-button value="ExpiredSoon">Expired Soon</ion-segment-button>\n      <ion-segment-button value="MyDeals">My Deals</ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div [ngSwitch]="category" swipeSegment class="swipe-area">\n    <ion-list no-lines *ngSwitchCase="\'NearMe\'">\n        <ion-item no-margin no-padding *ngFor="let merchant of merchants" style="background-color:rgb(99, 76, 76)">\n            <ion-card text-wrap tappable (click)="navMerchantPage(merchant)">\n              <ion-row>\n                <ion-col col-4 align-self-start>\n                  <img [src]="merchant.first_image" height="50px" width="100%">\n                </ion-col>\n                <ion-col col-8 align-self-start>\n                  <h2>{{merchant.business_name}}</h2>\n                  <h4>{{merchant.description.substr(0,50)}}</h4>\n                </ion-col>\n              </ion-row>\n            </ion-card>\n          </ion-item>\n    </ion-list>\n\n    <ion-list no-lines *ngSwitchCase="\'Deals\'">\n        <ion-item no-margin no-padding *ngFor="let deal of deals" style="background-color:rgb(99, 76, 76)">\n            <ion-card text-wrap tappable (click)="navDealPage(deal)">\n              <ion-row>\n                <ion-col col-10 align-self-start>\n                  <h2>{{deal.business_name}}</h2>\n                  <p class="primary">{{deal.redemption_count}}+ Redeemed</p>\n                </ion-col>\n                <ion-col col-2 align-self-start>\n                  <button ion-button color="primary" clear small icon-right (click)="like(deal)" align-self-end>\n                    <ion-icon name="ios-heart" isActive="true"></ion-icon>\n                  </button>\n                </ion-col>\n              </ion-row>\n              <img [src]="deal.first_image" height="200px" width="100%">\n              <ion-row>\n                <ion-col col-9 align-self-start>\n                  <h2>{{deal.title}}</h2>\n                </ion-col>\n                <ion-col col-3 align-self-end>\n                    <p class="secondary">{{deal.deal_amount | currency:\'GBP\':\'symbol\':\'1.2-2\'}}</p>\n                    <p class="strikethrough">{{deal.actual_amount | currency:\'GBP\':\'symbol\':\'1.2-2\'}}</p>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                  <ion-col>\n                    <p style="color:black">{{deal.description.substr(0,50)}}...</p>\n                  </ion-col>\n              </ion-row>\n              <ion-row>\n                  <ion-col>\n                    <h4 class="primary">{{(deal.end_date| amFromUnix) | amLocal | amDifference: null :\'days\'}} days left</h4>\n                  </ion-col>\n              </ion-row>\n            </ion-card>\n          </ion-item>      \n    </ion-list>\n\n    <ion-list no-lines *ngSwitchCase="\'ExpiredSoon\'">\n      <ion-item>\n        Ice Age\n      </ion-item>\n      <ion-item>\n        Lion King\n      </ion-item>\n      <ion-item>\n        Up\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/kkadarkaraimuthu/Desktop/Rex/DealsApp/src/pages/deals-list/deals-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_deals_service__["a" /* DealsService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_merchant_service__["a" /* MerchantService */], __WEBPACK_IMPORTED_MODULE_4__providers_map_map__["a" /* MapProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], DealsListPage);
    return DealsListPage;
}());

//# sourceMappingURL=deals-list.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwipeSegmentDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_gestures_gesture__ = __webpack_require__(350);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SwipeSegmentDirective = /** @class */ (function () {
    function SwipeSegmentDirective(_el) {
        this._el = _el;
        this.tabsList = [];
        this.currentTab = '';
        this.tabChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.el = _el.nativeElement;
    }
    SwipeSegmentDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.swipeGesture = new __WEBPACK_IMPORTED_MODULE_1_ionic_angular_gestures_gesture__["a" /* Gesture */](this.el);
        this.swipeGesture.listen();
        this.swipeGesture.on('swipe', function (event) {
            _this.swipeHandler(event);
        });
    };
    SwipeSegmentDirective.prototype.swipeHandler = function (event) {
        if (event.direction == '2') {
            // move forward
            var currentIndex = this.tabsList.indexOf(this.currentTab), nextIndex = currentIndex + 1;
            if (nextIndex < this.tabsList.length) {
                this.currentTab = this.tabsList[nextIndex];
                this.tabChanged.emit(this.currentTab);
            }
        }
        else if (event.direction == '4') {
            // move backward
            var currentIndex = this.tabsList.indexOf(this.currentTab), nextIndex = currentIndex - 1;
            if (nextIndex >= 0) {
                this.currentTab = this.tabsList[nextIndex];
                this.tabChanged.emit(this.currentTab);
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], SwipeSegmentDirective.prototype, "tabsList", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SwipeSegmentDirective.prototype, "currentTab", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SwipeSegmentDirective.prototype, "tabChanged", void 0);
    SwipeSegmentDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[swipeSegment]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], SwipeSegmentDirective);
    return SwipeSegmentDirective;
}());

//# sourceMappingURL=swipe-segment.directive.js.map

/***/ })

});
//# sourceMappingURL=0.js.map