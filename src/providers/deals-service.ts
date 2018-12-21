import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment as ENV } from '../environments/environment';
import { DealInfoCache, DealInfo } from '../interfaces/deal-info';
import { UserDealsCache, UserDeals } from '../interfaces/user-deals';

@Injectable()
export class DealsService {
    data: any = [];
    apiUrl: string;
    dealCache: DealInfoCache;
    userDealsCache: UserDealsCache;

    constructor(public http : Http) {
        this.apiUrl = ENV.API_URL;
        this.dealCache = new DealInfoCache();
        this.userDealsCache = new UserDealsCache();
    }

    getAllDeals() : Promise< DealInfo[] >{
      if(this.dealCache.isAvailable)
      {
          return new Promise(resolve => {
            let deals = this.dealCache.deals.filter((deal) => {
                let end_date = new Date(deal.end_date);
                let today = new Date();
                return (end_date.getTime() > today.getTime())
            });
            resolve(deals);
          });
      }
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'/deals.php?action=all').subscribe(data => {
          var resp = JSON.parse(data['_body']);

          if(resp.return_code == 0) {
              resp.return_message = [];
          }
          else {
            this.dealCache.deals = resp.return_message;
            this.dealCache.isAvailable = true;
          }

          resolve(resp.return_message);
        }, err => {
          var resp = { "return_code" : 0, "return_message" : []};
          resolve(resp.return_message);
          console.log("Error in calling Deals API " + JSON.stringify(err));
        });
      });
    }

    getAllParentDeals(start): Promise< DealInfo[] >{
        return new Promise(resolve => {
            this.getAllDeals().then((deals) => {
                var parentDeals = [];
                parentDeals = deals.filter((deal) => {
                    return (parseInt(deal.parent_deal_id) == 0);
                }); // end of filter
                resolve(parentDeals);
            }, err => {
              var parentDeals = [];
              resolve(parentDeals);
              console.log(err);
            }); // end of this.getAllDeals
        }); // end of Promise
    }

    getDealById(dealId: any): Promise< DealInfo >{
        return new Promise(resolve => {
            this.getAllDeals().then((deals) => {
                var parentDeals = [];
                parentDeals = deals.filter((deal) => {
                    return (deal.deal_id == dealId);
                }); // end of filter
                resolve(parentDeals[0]);
            }, err => {
              var parentDeals = new DealInfo;
              resolve(parentDeals);
              console.log(err);
            }); // end of this.getAllDeals
        }); // end of Promise
    }

    getExpiringDeals(start, count=20): Promise< DealInfo[] > {
      if(this.dealCache.isExpireDealsAvailable)
      {
          return new Promise(resolve => {
              resolve(this.dealCache.expireDeals);
          });
      }

      return new Promise(resolve => {
        this.http.get(this.apiUrl+'/deals.php?action=expire&count='+count+'&start='+start).subscribe(data => {
          var resp = JSON.parse(data['_body']);

          if(resp.return_message == "No Record Found!") {
            resp.return_message = [];
          }
          else {
            this.dealCache.expireDeals = resp.return_message;
            this.dealCache.isExpireDealsAvailable = true;
          }

          resolve(resp.return_message);
        }, err => {
          var resp = { "return_code" : 0, "return_message" : []};
          resolve(resp.return_message);
          console.log(err);
        });
      });
    }

    getParentDealImages(parentDealId: any) {
        return new Promise(resolve => {
          this.http.get(this.apiUrl+'/deals.php?action=images&parent_deal_id='+parentDealId).subscribe(data => {
            var resp = JSON.parse(data['_body']);
            if(resp.return_message == "No Record Found!")
            {
              resp.return_message = [];
            }
            resolve(resp.return_message);
          }, err => {
            var resp = { "return_code" : 0, "return_message" : []};
            resolve(resp.return_message);  
            console.log(err);
          });
        });
    }

    getAllChildDeals(parentDealId: number) : Promise< DealInfo[] >{
      return new Promise(resolve => {
        this.getAllDeals().then((deals) => {
            var childDeals = [];
            childDeals = deals.filter((deal) => {
                return (parseInt(deal.parent_deal_id) == parentDealId);
            }); // end of filter
            resolve(childDeals);
        }, err => {
          var childDeals = [];
          resolve(childDeals);
          console.log(err);
        }); // end of this.getAllDeals
      }); // end of Promise
    }

    getParentDealsByMerchant(merchantId: number) : Promise< DealInfo[] >{
      return new Promise(resolve => {
        this.getAllDeals().then((deals) => {
            var childDeals = [];
            childDeals = deals.filter((deal) => {
                return ((parseInt(deal.parent_deal_id) == 0) && (parseInt(deal.merchant_id) == merchantId));
            }); // end of filter
            resolve(childDeals);
        }, err => {
          console.log("Error thrown in getParentDealsByMerchant" + err);
          var childDeals = [];
          resolve(childDeals);
        }); // end of this.getParentDealsByMerchant
      }); // end of Promise
    }

    getAllUserDeals(authToken: any): Promise < UserDeals[] > {
      if(this.userDealsCache.isAvailable)
      {
          return new Promise(resolve => {
              resolve(this.userDealsCache.userDeals);
          });
      }

      return new Promise(resolve => {
          this.http.get(this.apiUrl+'/deals.php?action=user&token='+authToken).subscribe(data => {
            var resp = JSON.parse(data['_body']);

            if(resp.return_code != 1) {
                resp.return_message = [];
            }
            else {
              this.userDealsCache.userDeals = resp.return_message;
              this.userDealsCache.isAvailable = true;
            }
            resolve(resp.return_message);
          }, err => {
            console.log("Error thrown in getAllUserDeals" + err);
            var resp = [];
            resolve(resp);  
          });
      }); // end of promise
    }

    getAllMyDeals(authToken: any): Promise < UserDeals[] > { /* this function returns only my deals */
        return new Promise(resolve => {
            this.getAllUserDeals(authToken).then((userDeals) => {
                let deals = userDeals.filter(obj => {
                    return (obj.qrcode_string != null && obj.is_redeemed != "1");
                });
                resolve(deals);
            } , err => {
                console.log("Error thrown in getAllMyDeals" + err);
                var deals = [];
                resolve(deals);
            }); // end of this.getAllMyDeals
        });
    }

    getAllUserFavorite(authToken: any): Promise < UserDeals[] > {
        return new Promise(resolve => {
            this.getAllUserDeals(authToken).then((userDeals) => {
                let deals = userDeals.filter(obj => {
                        return (obj.is_wished == "1");
                });
                resolve(deals);
            } , err => {
                console.log("Error thrown in getAllUserFavorite" + err);
                var deals = [];
                resolve(deals);
            }); // end of this.getAllUserDeals
        });
    }

    getAllUserRedeemed(authToken: any): Promise < UserDeals[] > {
        return new Promise(resolve => {
            this.getAllUserDeals(authToken).then((userDeals) => {
                let deals = userDeals.filter(obj => {
                        return (obj.is_redeemed == "1");
                });
                resolve(deals);
            } , err => {
                console.log("Error thrown in getAllUserRedeemed" + err);
                var deals = [];
                resolve(deals);
            }); // end of this.getAllUserRedeemed
        });
    }
    setUserDeal(authToken: any, dealId: any, qrCode: string = "", isWished: number=0) {
        let req = { action: "set_user_deal", token: authToken, deal_id: dealId, qrcode_string: qrCode, is_wished: isWished };  

        return new Promise(resolve => {
            this.http.post(this.apiUrl+'/deals.php', JSON.stringify(req)).subscribe(data => {
                var resp = JSON.parse(data['_body']);

                if(resp.return_code == 1) { // Clear the cache if record is updated successfully
                    this.userDealsCache.userDeals = [];
                    this.userDealsCache.isAvailable = false;
                }
                resolve(resp.return_code);
            }, err => {
                console.log("Error thrown in setUserDeal" + err);
                resolve(false);
            });
        });
    }

    setWishDeal(authToken: any, dealId: any, isWished: number=0) {
      let req = { action: "set_wish_deal", token: authToken, deal_id: dealId, is_wished: isWished };  

      return new Promise(resolve => {
          this.http.post(this.apiUrl+'/deals.php', JSON.stringify(req)).subscribe(data => {
              var resp = JSON.parse(data['_body']);

              if(resp.return_code == 1) { // Clear the cache if record is updated successfully
                  this.userDealsCache.userDeals = [];
                  this.userDealsCache.isAvailable = false;
              }
              resolve(resp.return_code);
          }, err => {
              console.log("Error thrown in setWishDeal" + err);
              resolve(false);
          });
      });
    }
}
