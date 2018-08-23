import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  params: any = {};
  responseData : any;
  userData = {"username": "", "password": "", "email": "", "country": "", "city": ""};

  constructor(public navCtrl: NavController, public fb: Facebook, public googlePlus: GooglePlus, public authService: AuthService) {

      //this.fb.browserInit(FB_APP_ID, "v2.8");

      this.params.data = {
          "forgotPassword" : "Forgot password?",
          "labelPassword" : "PASSWORD",
          "labelUsername" : "USERNAME",
          "login" : "Login",
          "logo" : "assets/images/logo/2.png",
          "password" : "Enter your password",
          "subtitle" : "Welcome",
          "title" : "Login to your account",
          "username" : "Enter your username"
      }

      this.params.events = {
          onLogin: function(params) {
            console.log('onLogin' + JSON.stringify(params));
            authService.postData(params,'login').then((result) => {
              this.responseData = result;
              if(this.responseData.userData){
                console.log(this.responseData);
                localStorage.setItem('userData', JSON.stringify(this.responseData));
                navCtrl.push("TabsPage");
              }
              else{ console.log("User already exists"); }
          }, (err) => {
              console.log("Unable to signup the user");
              // Error log
          });
        },

          onForgot: function() {
              console.log('onForgot:');
          },
          onRegister: function(params) {
              navCtrl.push("SignupPage");
          },

          onFacebook: function(params) {
            let permissions = new Array<string>();
            //the permissions your facebook app needs from the user
            permissions = ["public_profile", "email"];

            fb.login(permissions).then(function(response){
                let userId = response.authResponse.userID;
                let params = new Array<string>();
        
                //Getting name and gender properties
                fb.api("/me?fields=name,gender", params).then(function(user) {
                    user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                    //now we have the users info, let's save it in the NativeStorage
                    console.log(JSON.stringify(user));
                    localStorage.setItem('user',
                    JSON.stringify({
                      name: user.name,
                      gender: user.gender,
                      picture: user.picture
                    }));
                    /*.then(function(){
                      this.navCtrl.push("TabsPage");
                    }, function (error) {
                      console.log(error);
                    })*/
                })
            });
          }, // End onFacebook

          onGoogle: function(params){
            googlePlus.login({}).then(res => {
                console.log(res);
            })
            .catch(err => console.error(err));
          } // End onGoogle
      };
  }

}
