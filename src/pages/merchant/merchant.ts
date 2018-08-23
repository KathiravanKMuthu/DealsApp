import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
import { environment as ENV } from '../../config/app-config';

declare var google: any; /**** See google is declared here ****/

@IonicPage()
@Component({
  selector: 'page-merchant',
  templateUrl: 'merchant.html',
})
export class MerchantPage {
  @ViewChild('map') mapElement: ElementRef;

  merchant: any;
  map: any;
  images: any = ["../../assets/images/slide-1.jpg", "../../assets/images/slide-2.jpg", "../../assets/images/slide-3.jpg" ];
  address: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public zone: NgZone, public platform: Platform, 
              private launchNavigator: LaunchNavigator, private callNumber: CallNumber) 
  {
      this.merchant = navParams.get("merchant");
      this.platform.ready().then(() => this.loadMap());
      this.address = this.getAddress();

      if(this.merchant.website == undefined || this.merchant.website == "")
        this.merchant.website = ENV.DEFAULT_WEBSITE;
      
      if(this.merchant.youtube == undefined || this.merchant.youtube == "")
        this.merchant.youtube = ENV.DEFAULT_YOUTUBE;

      if(this.merchant.facebook == undefined || this.merchant.facebook == "")
        this.merchant.facebook = ENV.DEFAULT_FACEBOOK;
      
      if(this.merchant.instagram == undefined || this.merchant.instagram == "")
        this.merchant.instagram = ENV.DEFAULT_INSTAGRAM;
  }

  isFavorite()
  {
    return false;
    /*var fav = JSON.parse(localStorage.getItem("msm_favorite"));
    if(fav){
      //check if the article is in favorite
      for(let i = 0; i < fav.length; i++)
      {
            if(this.msg.id === fav[i].id)
                return true;
      }
    }*/
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<p>" + this.address + "</p>";         
   
    this.addInfoWindow(marker, content);
  }

  loadMap(){
    if (!google) {
      this.initializeMap();
    } else {
      console.log('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  initializeMap() {
    let latLng = new google.maps.LatLng(12.985319, 80.213906);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      gestureHandling: 'none',
      draggable: false,
      clickableIcons: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false
    }
    this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, mapOptions);
      this.addMarker();
    });
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  getAddress() {
    let address = this.merchant.address;

    if(this.merchant.state != "")
      address = address + ", " + this.merchant.state;

    if(this.merchant.country != "")
      address = address + ", " + this.merchant.country;

    return address;
  }

  openURL(website: string) {
    window.open(website, '_blank', 'location=yes');
  }

  openMap(){
    let options: LaunchNavigatorOptions = {
      start: ""
    };

    this.launchNavigator.navigate(this.address, options)
        .then(
            success => console.log('Launched navigator' + success),
            error => alert('Error launching navigator: ' + error)
    );
  }

  callMerchant() {
    this.callNumber.callNumber(this.merchant.phone_number, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => alert('Error launching navigator: ' + err));
  }
}
