import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  params: any = {};
  responseData : any;
  userData = {"username": "", "password": "", "email": "", "country": "", "city": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    this.params.data = {
        "city" : "Your home town",
        "country" : "Where are you from?",
        "email" : "Your e-mail address",
        "lableCity" : "CITY",
        "lableCountry" : "COUNTRY",
        "lableEmail" : "E-MAIL",
        "lablePassword" : "PASSWORD",
        "lableUsername" : "USERNAME",
        "logo" : "assets/images/logo/2.png",
        "password" : "Enter your password",
        "register" : "Signup",
        "login" : "Login",
        "title" : "Signup for new account",
        "toolbarTitle" : "Register + logo",
        "username" : "Enter your username"
    };

    this.params.events = {
        onRegister: function(params) {
            authService.postData(params,'signup').then((result) => {
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

        onLogin: function() {
          navCtrl.push("LoginPage");
        }
    };
  }

  signup(){
    this.authService.postData(this.userData,'signup').then((result) => {
     this.responseData = result;
     if(this.responseData.userData){
     console.log(this.responseData);
     localStorage.setItem('userData', JSON.stringify(this.responseData));
     this.navCtrl.push("TabsPage");
     }
     else{ console.log("User already exists"); }
   }, (err) => {
     console.log("Unable to signup the user");
     // Error log
   });

 }

 login(){
   //Login page link
   this.navCtrl.push("LoginPage");
 }
}
