import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { environment as ENV } from '../environments/environment';
import { UserInfo, UserInfoCache } from '../interfaces/user-info';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
export const firebaseConfig = ENV.firebaseConfig;
firebase.initializeApp(firebaseConfig);

@Injectable()
export class AuthService {

  apiUrl: string;
  userInfoCache: UserInfoCache;

  constructor(public http : Http, public storage: Storage, private googlePlus: GooglePlus, private platform: Platform) {
    this.apiUrl = ENV.API_URL;
    this.userInfoCache = new UserInfoCache(storage);
  }

  signin(email, password) {
    var request = {"role": "member", "mem_email": email, "mem_password": password};
    return new Promise(resolve => {
        this.postData(request, '/signin.php').then((data) => {
            if(data && data["token"])
            {
                this.userInfoCache.authToken = data["token"];
                this.storage.remove("authToken");
                this.storage.set("authToken", this.userInfoCache.authToken);
            }
            resolve(data);
        });
    });
  }

  signup(email, password, phone_number) {
    var request = {'mem_email': email, 'mem_phone': phone_number, 'mem_password': password, 'token': 'SignUp'};
    return new Promise(resolve => {
        this.postData(request, '/member.php').then((data) => {
            if(data && data["token"])
            {
                this.userInfoCache.authToken = data["token"];
                this.storage.remove("authToken");
                this.storage.set("authToken", this.userInfoCache.authToken);
            }
            resolve(data);
        });
    });
  }

  updateProfile(value) {
    var request = {'mem_firstname': value.first_name, 'mem_phone': value.phone_number, 'mem_country': value.country, 'mem_address1': value.address1, 'mem_state': value.state, 'token': this.userInfoCache.authToken};

    return new Promise(resolve => {
        this.postData(request, '/member.php').then((data) => {
            if(data && data["token"])
            {
                this.userInfoCache.authToken = data["token"];
                this.storage.remove("authToken");
                this.storage.set("authToken", this.userInfoCache.authToken);
            }
            resolve(data);
        });
    });
  }

  uploadProfilePic(image) {
    var request = {'image': image, 'action': 'upload_image', 'token': this.userInfoCache.authToken};

    return new Promise(resolve => {
        this.postData(request, '/mobile_signin.php').then((data) => {
            resolve(data);
        });
    });
  }

  isAutheticated(): boolean {
    this.storage.get("authToken").then((token) => {
      return true;
    }).catch((err) => {
      console.log("Invalid user " + err);
      return false;
    });
    return false;
  }

  getAuthToken(): Promise < any > {
    if(this.userInfoCache.authToken != undefined && this.userInfoCache.authToken != "") {
      return new Promise(resolve => {
        resolve(this.userInfoCache.authToken);
      });
    }

    return new Promise(resolve => {
      this.storage.get("authToken").then((data) => {
          if(data)
            this.userInfoCache.authToken = data;
         resolve(data);
      }).catch((err) => {
        console.log("Invalid user" + err);
      });
    });
  }

  getUserInfo(): Promise< UserInfo > {
    if(this.userInfoCache.isAvailable)
    {
        return new Promise(resolve => {
          let userInfo = this.userInfoCache.getUserInfoCache();
          resolve(userInfo);
        });
    }

    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/member.php?action=token&token=' + this.userInfoCache.authToken).subscribe(data => {
          let resp = JSON.parse(data["_body"]);
          if(resp.return_code == 1) {
            this.userInfoCache.setUserInfoCache(resp.return_message[0]);
            this.userInfoCache.isAvailable = true;
            resp = this.userInfoCache.userInfo;
          }
          resolve(resp);
        }, err => {
          var resp = new UserInfo;
          resolve(resp);
          console.log(err);
        });
    }); // end of promise
  }

  socialSignin(user, social_partner) {
    console.log("socialSigning entering");
      var request = {"action": "social_login", "role": "member", "mem_email": user.email, "social_login_id": user.id, "first_name": user.name, "image": user.image, "social_login_partner": social_partner};
      return new Promise(resolve => {
          this.postData(request, '/mobile_signin.php').then((data) => {
              if(data && data["token"])
              {
                  this.userInfoCache.authToken = data["token"];
                  this.storage.remove("authToken");
                  this.storage.set("authToken", this.userInfoCache.authToken);
              }
              else {
                var token_req = {"action": "get_token", "role": "member", "mem_email": user.email, "social_login_id": user.id};
                this.postData(token_req, '/mobile_signin.php').then((resp) => {
                  if(resp && resp["token"])
                  {
                      this.userInfoCache.authToken = resp["token"];
                      this.storage.remove("authToken");
                      this.storage.set("authToken", this.userInfoCache.authToken);
                  }
                });
              }
              resolve(data);
          });
      });
  }


  googleLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.googlePlus.login({
        'webClientId': ENV.webClientId,
        'offline': true,
        scopes: 'profile',
      }).then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider
          .credential(res.idToken);

        if (this.platform.is('core') || this.platform.is('mobileweb')) {
          firebase.auth().signInWithCredential(googleCredential)
            .then(response => {
              console.log("Firebase success: " + JSON.stringify(response));
              resolve(response)
            });
        }
        else {
          firebase.auth().signInWithRedirect(googleCredential)
            .then(response => {
              console.log("Firebase success: " + JSON.stringify(response));
              resolve(response)
            });
        }

      }, err => {
        console.error("Error: ", JSON.stringify(err));
        resolve(JSON.stringify(err));
      }).catch(err => {
        console.error("Error: ", JSON.stringify(err));
        resolve(JSON.stringify(err));
      });
    });
  }


  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      
      this.http.post(this.apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
