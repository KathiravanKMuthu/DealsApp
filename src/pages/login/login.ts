import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, IonicPage } from "ionic-angular";
import { Facebook } from '@ionic-native/facebook';
import { AuthService } from "../../providers/auth-service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SpinnerProvider } from "../../providers/spinner/spinner";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  passwordIcon: any;
  passwordType: any;
  showPass: boolean;
  signInForm: FormGroup;

  constructor(public nav: NavController, public fb: Facebook, public formBuilder: FormBuilder,
              public forgotCtrl: AlertController, public toastCtrl: ToastController, public authService: AuthService, 
              public spinner : SpinnerProvider) 
  {
      this.passwordIcon ="ios-eye-off-outline";
      this.passwordType = "password";
      this.showPass = false;

      this.signInForm = formBuilder.group({ 
          email: [''],
          password: ['']
      });
  }

  ionViewWillEnter() {
    this.authService.getAuthToken().then((data) => {
        if(data) {
            this.nav.setRoot("ProfilePage");
        }
    });
  }

  // go to register page
  register() {
    this.nav.setRoot("SignupPage");
  }

  // login and go to home page
  login() {
    //console.log(this.signInForm.value);
    //validate form before calling signing api
    this.authService.signin(this.signInForm.value.email, this.signInForm.value.password).then((data) => {
        if(data && data["return_code"] == 1) {
          const tabs = this.nav.parent;
          tabs.select(4)
            .then(() => tabs.getSelected().setRoot("ProfilePage"))
            .then(() => this.nav.popToRoot());
        }
        else {
          let alert = this.forgotCtrl.create({
            title: 'Error', subTitle: data["return_message"], buttons: ['OK'], cssClass: "customLoader"
          });
          alert.present();  
        }
    });
    //this.nav.setRoot("ProfilePage");
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

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Reset Email sent successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

  onFacebook() {
    /*this.fb.getLoginStatus().then(res => {
      console.log("onFacebook " + res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }).catch(e => console.log("Facebook getLoginStatus failed " + e));*/

      let permissions = new Array<string>();
      //the permissions your facebook app needs from the user
      permissions = ["public_profile", "email"];
      this.fb.login(permissions).then((response) => {
          if(response.status === "connected") {
            let userId = response.authResponse.userID;
            this.getUserDetail(userId);
          } else {
              let alert = this.forgotCtrl.create({
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
          user.image = "https://graph.facebook.com/" + fbUserId + "/picture?type=large";

          this.authService.socialSignin(user, "FACEBOOK").then(data => {
            if(data && data["return_code"] == 1) {
              const tabs = this.nav.parent;
              tabs.select(4)
                .then(() => tabs.getSelected().setRoot("ProfilePage"))
                .then(() => this.nav.popToRoot());
            }
            else {
              let alert = this.forgotCtrl.create({
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


  onGoogle(){
    console.log(" inside onGoogle ");
    this.authService.googleLogin().then((res) => {
        console.log(res);
    });
  } // End onGoogle

}
