import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment as ENV } from '../environments/environment';
import { MerchantInfo, MerchantInfoCache } from '../interfaces/merchant-info';

@Injectable()
export class MerchantService {
    apiUrl: String;
    cache: MerchantInfoCache;

  constructor(public http : Http) {
      this.apiUrl = ENV.API_URL; 
      this.cache = new MerchantInfoCache();
  }

  getNearByMerchants(start, count=20) : Promise < MerchantInfo[] > {
    if(this.cache.isAvailable)
    {
        return new Promise(resolve => {
            resolve(this.cache.merchants);
        });
    }
    
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/merchant.php?action=all&count='+count+'&start='+start).subscribe(data => {
          var resp = JSON.parse(data['_body']);
          if(resp.return_message == "No Record Found!") {
            resp.return_message = [];
          }
          else {
            this.cache.merchants = resp.return_message;
            this.cache.isAvailable = true;
          }
          resolve(resp.return_message);
        }, err => {
          var resp = [];
          resolve(resp);
          console.log(err);
        });
    });
  } // end of getNearByMerchants

  getMerchantDetails(merchantId: any) {
      return new Promise(resolve => {
        this.getNearByMerchants(0).then((merchants) => {
            var merchantDetails = {};
            merchantDetails = merchants.filter((merchant) => {
                return (parseInt(merchant.merchant_id) == merchantId);
            }); // end of filter
            resolve(merchantDetails);
        }, err => {
          var merchantDetails = {};
          resolve(merchantDetails);
          console.log(err);
        }); // end of this.getAllDeals
      }); // end of Promise
  }

  getAllMerchantLocations() : Promise < any[] > {
      return new Promise(resolve => {
          this.getNearByMerchants(0).then((merchants) => {
              var merchantLocations = [];
              merchants.forEach((merchant) => {
                if(merchant.map_position != "") {
                    merchantLocations.push(JSON.parse(merchant.map_position));
                }
              }); // end of filter
              resolve(merchantLocations);
          }, err => {
              var merchantLocations = [];
              resolve(merchantLocations);
              console.log(err);
          }); // end of this.getAllDeals
      }); // end of Promise
  }
}
