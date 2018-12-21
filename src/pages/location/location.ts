import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SpinnerProvider } from '../../providers/spinner/spinner'
import { MapProvider } from '../../providers/map/map';
import { MerchantService } from '../../providers/merchant-service';

declare var google: any; /**** See google is declared here ****/

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
    addressElement: HTMLInputElement = null;
  
    map: any;
    address = '';
    meter: number = 1;
    myCircle: any;
    zoom: number = 14;
  
    constructor(public navCtrl: NavController,
      public geolocation: Geolocation,
      public zone: NgZone,
      public platform: Platform,
      public storage: Storage,
      public mapService: MapProvider,
      public spinner: SpinnerProvider,
      public viewCtrl: ViewController,
      public merchantService: MerchantService,
      public navParams: NavParams) 
    {
        this.platform.ready().then(() => this.loadMaps());
    }
  
    loadMaps() {
      if (!!google) {
        this.initializeMap();
      } else {
        this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
      }
    }
  
    initializeMap() {
      this.spinner.load();
      let latitude : any;
      let longitude : any;
      this.storage.get('current_latlong').then((val) => {
        if(val == null || val == "") {
            this.currentLocation().then((loc) => {
                latitude = loc.latitude;
                longitude = loc.longitude;
            });
        } else {
          latitude = val.lat;
          longitude = val.long;
        }

        let latLng;
        latLng = new google.maps.LatLng(latitude, longitude);
        let mapOptions = {
          center: latLng,
          zoom: this.zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          gestureHandling: 'cooperative'
        }

        this.zone.run(() => {
          var mapEle = this.mapElement.nativeElement;
          this.map = new google.maps.Map(mapEle, mapOptions);
          
          let latLngObj = {'lat': latitude, 'long': longitude};
      
          this.storage.set('current_latlong', latLngObj);

          this.addMarker();
          this.addCircle(latLngObj);
          this.getAddress(latLngObj);
          this.initAutocomplete();
          this.spinner.dismiss();
        });
      }).catch((err) => { console.log("Error intializeMap" + err)} );
    }

    setRadius() {
      let radius = this.meter * 1609.34;
      let scale = radius / 500.00;
      let zoomLevel = (16 - Math.log(scale) / Math.log(2));

      if(this.myCircle)
        this.myCircle.setMap(null);
    
      this.myCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#00bfff',
        fillOpacity: 0.35,
        center: this.getMapCenter(),
        map: this.map,
        radius: radius
      });
      this.map.setZoom(zoomLevel);
    }

    addCircle(latLangObj) {
      let position = new google.maps.LatLng(latLangObj.lat, latLangObj.long);
        if(this.myCircle)
          this.myCircle.setMap(null);
        
        this.myCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#00bfff',
          fillOpacity: 0.35,
          center: position,
          map: this.map,
          radius: this.meter * 1600
        });
    }
  
    addMarker() {
      this.merchantService.getAllMerchantLocations().then((locations) => {
          locations.forEach((loc) => {
              let position = new google.maps.LatLng(loc["latitude"], loc["longitude"]);

              let marker = new google.maps.Marker({
                map: this.map,
                position: position,
                label: {text: 'DJ', color: "white", fontWeight: "bolder"}
              });  // end of Marker
              console.log(marker);
          }); // end of forEach
      }); // end of service call
    }

    initAutocomplete(): void {
      this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
      this.createAutocomplete(this.addressElement).subscribe((location) => {
        let latLngObj = {'lat': location.lat(), 'long': location.lng()};
        this.getAddress(latLngObj);

        let options = {
            center: location,
            zoom: this.map.zoom - 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            gestureHandling: 'cooperative'
        };
        this.map.setOptions(options);
        this.resizeMap();
      });
    }
  
    currentLocation() : Promise<any> {
      var positionOptions = {timeout: 10000, enableHighAccuracy: true};
      return this.geolocation.getCurrentPosition(positionOptions).then((position) => position.coords);
    }
  
    getAddress(latLngObj) {
      // Get the address object based on latLngObj
      this.mapService.getStreetAddress(latLngObj).subscribe(
        s_address => {
          if (s_address.status == "ZERO_RESULTS") {
               console.log("Error in getting the street address ");
          } else {
            if(s_address.results[0] != null) {
              this.address = s_address.results[0].formatted_address;
              this.getAddressComponentByPlace(s_address.results[0], latLngObj);
            }
          }
        },
        err => {
          console.log('No Address found ' + err);
        }
      );
    }
  
    getMapCenter(){
      return this.map.getCenter();
    }
  
    createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
      const autocomplete = new google.maps.places.Autocomplete(addressEl);
      //autocomplete.bindTo('bounds', this.map);
      return new Observable((sub: any) => {
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            sub.error({
              message: 'Autocomplete returned place with no geometry'
            });
          } else {
            let latLngObj = {'lat': place.geometry.location.lat(), 'long': place.geometry.location.lng()}
            //this.addMarker();
            this.addCircle(latLngObj);
            this.getAddress(latLngObj);
            sub.next(place.geometry.location);
          }
        });
      });
    }
  
    getAddressComponentByPlace(place, latLngObj) {
        var components;
        components = {};
        for(var i = 0; i < place.address_components.length; i++){
          let ac = place.address_components[i];
          components[ac.types[0]] = ac.long_name;
        }
        /*let addressObj = {
          street: (components.street_number) ? components.street_number : 'not found',
          area: components.route,
          city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
          country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
          postCode: components.postal_code,
          loc: [latLngObj.long, latLngObj.lat],
          address: this.address
        }*/
        this.address = (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality;
        this.storage.set("current_latlong", latLngObj);
        this.storage.set('current_city', (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality);
        return components;
    }
  
    resizeMap() {
      setTimeout(() => {
          google.maps.event.trigger(this.map, 'resize');
      }, 200);
    }
  
    errorAlert(title, message) {
        alert(message);
    }
  
    navDealsListPage() {
      this.navCtrl.pop();
    }
  
}