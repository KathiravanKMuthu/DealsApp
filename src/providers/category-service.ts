import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryCache } from '../interfaces/category';
import { environment as ENV } from '../environments/environment';

@Injectable()
export class CategoryService {

    cache : CategoryCache;
    apiUrl : String;

    constructor(public http: HttpClient) {
        this.cache = new CategoryCache();
        this.apiUrl = ENV.API_URL;
    }

    getAllCategories() : Promise< Category[] >{
      if(this.cache.isAvailable)
      {
          return new Promise(resolve => {
              resolve(this.cache.categories);
          });
      }
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'/categories.php?action=all').subscribe(data => {
          if(data["return_message"] == "No Record Found!") {
            data["return_message"] = [];
          }
          else {
            this.cache.categories = data["return_message"];
            this.cache.isAvailable = true;
          }

          resolve(data["return_message"]);
        }, err => {
          var resp = [];
          resolve(resp);
          console.log(err);
        }); // end of this.http
      }); // End of Promise 
    }
}
