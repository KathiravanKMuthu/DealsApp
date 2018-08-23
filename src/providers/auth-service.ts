import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

let apiUrl = 'http://localhost/PHP-Slim-Restful/api/';

export interface UserInfo 
{
  user_id: any, 
  email: any, 
  phone_number: any, address1: any, 
  address2: any, state: any, country: any, postal_code: any
};

@Injectable()
export class AuthService {

  constructor(public http : Http, public storage: Storage) {
    console.log('Hello AuthService Provider');
  }

  login(username, password) {
    this.postData({"mem_username": username, "mem_password": password}, 'login');
  }

  isAutheticated(): boolean {
    this.storage.get("authToken").then((token) => {
      console.log(token);
      return true;
    }).catch((err) => {
      console.log("Invalid user " + err);
      return false;
    });
    console.log("isAuthenticated ");
    return false;
  }

  getUserInfo(): Promise< UserInfo > {
    return new Promise(resolve => {
        this.storage.get("user_info").then((data) => {
           resolve(data);
        }).catch((err) => {
          console.log("Invalid user" + err);
        });
    });
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
