import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook';
import { SpinnerProvider } from '../../providers/spinner/spinner';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  params: any = {};
  responseData : any;
  userData = {"username": "", "password": "", "email": "", "country": "", "city": ""};
  passwordIcon: any;
  passwordType: any;
  showPass: boolean;
  signUpForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public authService: AuthService, public formBuilder: FormBuilder, private fb: Facebook, private spinner: SpinnerProvider) 
  {
    this.passwordIcon ="ios-eye-off-outline";
    this.passwordType = "password";
    this.showPass = false;

    this.signUpForm = formBuilder.group({ 
        email: [''],
        password: [''],
        phone_number: ['']
    });
  }

  showPassword() {
    this.showPass = !this.showPass;

    if(this.showPass){
      this.passwordIcon = "ios-eye-outline";
      this.passwordType = 'text';
    } else {
      this.passwordIcon = "ios-eye-off-outline";
      this.passwordType = 'password';
    }
  }

  ionViewWillEnter() {
    this.authService.getAuthToken().then((data) => {
        if(data) {
            this.navCtrl.setRoot("ProfilePage");
        }
    });
  }

  register(){
    let value = this.signUpForm.value;
    this.authService.signup(value.email, value.password, value.phone_number).then((data) => {
      if(data && data["return_code"] == 1) {
        const tabs = this.navCtrl.parent;
        tabs.select(4)
          .then(() => tabs.getSelected().setRoot("LoginPage"))
          .then(() => this.navCtrl.popToRoot());
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Error', subTitle: 'Unable to signup ' + data["return_message"], buttons: ['OK'], cssClass: "customLoader"
        });
        alert.present();  
      }
   }, (err) => {
     console.log("Unable to signup the user");
     // Error log
   });

 }

 onFacebook() {
    let permissions = new Array<string>();
    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];
    this.fb.login(permissions).then((response) => {
        if(response.status === "connected") {
          let userId = response.authResponse.userID;
          this.getUserDetail(userId);
        } else {
            let alert = this.alertCtrl.create({
              title: 'Error', subTitle: "Facebook authentication failed !!!", buttons: ['OK'], cssClass: "customLoader"
            });
            alert.present();  
        }
    }).catch(e => {
      console.log("Facebook login failed " + e);
    });
}


getUserDetail(fbUserId) {
    this.spinner.load();
     //Getting name and gender properties
    this.fb.api("/" + fbUserId + "?fields=id,email,name,picture", ["public_profile"]).then((user) => {
      console.log(JSON.stringify(user));
        user.image = "https://graph.facebook.com/" + fbUserId + "/picture?type=large";

        this.authService.socialSignin(user, "FACEBOOK").then(data => {
          if(data && data["return_code"] == 1) {
            const tabs = this.navCtrl.parent;
            tabs.select(4)
              .then(() => tabs.getSelected().setRoot("ProfilePage"))
              .then(() => this.navCtrl.popToRoot());
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Error', subTitle: data["return_message"], buttons: ['OK'], cssClass: "customLoader"
            });
            alert.present();  
          }    
        });
    }).catch(e => {
      console.log("Facebook getUserDetail " + e);
    });
    this.spinner.dismiss();
  } // End onFacebook

  login(){
    //Login page link
    this.navCtrl.setRoot("LoginPage");
  }

  onGoogle(){
    console.log(" inside onGoogle ");
    this.authService.googleLogin().then((res) => {
        console.log(res);
    });
  } // End onGoogle
  
}
