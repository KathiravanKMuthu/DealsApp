import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UserInfo } from '../../interfaces/user-info';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { environment as ENV } from '../../environments/environment';
import { Base64 } from '@ionic-native/base64';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  apiUrl: string;
  userInfo: UserInfo;
  profileForm: FormGroup;
  image: any = "../assets/imgs/avatar.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, 
              public formBuilder: FormBuilder, private actionSheetCtrl: ActionSheetController, private camera: Camera,
              private loadingCtrl: LoadingController, private base64: Base64) 
  {
      this.userInfo = new UserInfo;
      this.apiUrl = ENV.API_URL;
      this.profileForm = formBuilder.group({
        first_name: [''],
        phone_number: [''],
        address1: [''],
        state: [''],
        country: [''],
        postal_code: ['']
      });
  }

  ionViewWillEnter() {
      this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getUserInfo().then((data) => {
      if(data) {
          this.userInfo = data;
          if(this.userInfo && (this.userInfo.image == undefined || this.userInfo.image == null))
              this.userInfo.image = this.image;
      }
      else 
        this.navCtrl.setRoot("LoginPage");
    });
  }

  confirm() {
    let loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });

    loading.present();
    // do form validation here
    let value = this.profileForm.value;
    this.authService.updateProfile(value).then((data) => {
      if(data && data["return_code"] == 1) {
        //this.navCtrl.setRoot("TabsPage");
        console.log("Show success message");
        loading.dismiss();
      }
    }, (err) => {
      console.log("Unable to update profile info " + err);
      loading.dismiss();
    });
  }

  uploadPhoto() {
    let loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });

    loading.present();

    this.base64.encodeFile(this.image).then((base64File: string) => {
        this.authService.uploadProfilePic(base64File).then(data => {
          console.log(JSON.stringify(data));
          loading.dismiss();
        }, (err) => {
          console.log("Unable to upload Profile Pic " + err);
          loading.dismiss();
        });
    });

    /*if(this.image != undefined)
    {
      const transfer: FileTransferObject = this.fileTransfer.create();
      let options: FileUploadOptions = {
        fileKey: 'ionicfile',
        fileName: this.userInfo.user_id,
        chunkedMode: false,
        mimeType: "image/jpeg",
        headers: {}
      }

      transfer.upload(this.image, this.apiUrl + '/uploadImage.php', options).then((data) => {
          console.log(data+" Uploaded Successfully");
          this.userInfo.image = this.apiUrl + "/ionicfile.jpg";
          loading.dismiss();
      }, (err) => {
          console.log(err);
          loading.dismiss();
      });
    }*/
  }
 
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Profile Picture',
      buttons: [
        {
          icon: "image",
          text: 'From Gallery',
          handler: () => {
            this.selectPhoto();
          }
        },
        {
          icon: "camera",
          text: 'From Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          icon: "close",
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture() {
    // Create options for the Camera Dialog
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(imageData => {
      this.image = imageData
      var img = document.getElementById("img") as HTMLImageElement;
      img.src = this.image;
      this.uploadPhoto();
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  
  selectPhoto(): void {
      this.camera.getPicture({
          destinationType: this.camera.DestinationType.FILE_URI,
          quality: 50,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: this.camera.EncodingType.JPEG,
          correctOrientation: true
      }).then(imageData => {
          this.image = imageData;
          var img = document.getElementById("img") as HTMLImageElement;
          img.src = this.image;
          this.uploadPhoto();
        }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }
}
