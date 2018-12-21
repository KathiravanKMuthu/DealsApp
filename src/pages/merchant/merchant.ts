import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
import { environment as ENV } from '../../environments/environment';
import { DealsService } from '../../providers/deals-service';

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
  images: any = [];
  address: any;
  image_dir: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public zone: NgZone, public platform: Platform, public dealsService : DealsService,
              private launchNavigator: LaunchNavigator, private callNumber: CallNumber) 
  {
      this.merchant = navParams.get("merchant");
      this.platform.ready().then(() => this.loadMap());
      this.address = this.getAddress();
      this.image_dir = ENV.BASE_URL;
      this.images.push(this.merchant.image_dir);

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
  }

  addMarker(){
      let marker = new google.maps.Marker({
        map: this.map,
        position: this.map.getCenter(),
        label: {text: 'DJ', color: "white", fontWeight: "bolder"}
      });
    
      let content = "<p>" + this.address + "</p>";         
    
      this.addInfoWindow(marker, content);
  }

  loadMap(){
      if (!!google) {
        this.initializeMap();
      } else {
        console.log('Error', 'Something went wrong while loading maps.')
      }
  }

  initializeMap() {
      let map_position  = JSON.parse(this.merchant.map_position);

      let latLng = new google.maps.LatLng(map_position.latitude, map_position.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
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
    
      infoWindow.open(this.map, marker);

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
  }

  getAddress() {
      let address: string;

      if(this.merchant.address1 != "")
        address = this.merchant.address1;

      if(this.merchant.address2 != "")
        address = address + ", " + this.merchant.address2;

      if(this.merchant.state != "")
        address = address + ", " + this.merchant.state;

      if(this.merchant.postal_code != "")
        address = address + ", " + this.merchant.postal_code;

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

  navDealsListPage(merchant_id) {
    this.dealsService.getParentDealsByMerchant(merchant_id).then(data => {
      if(data.length > 0)
        this.navCtrl.push("DealPage", {deal: data[0]});
      else
        alert('No Deals Available for this merchant'); 
    });
  }
}
