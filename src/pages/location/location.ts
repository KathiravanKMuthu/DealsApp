import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SpinnerProvider } from '../../providers/spinner/spinner'
import { MapProvider } from '../../providers/map/map';

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
  
    constructor(public navCtrl: NavController,
      public geolocation: Geolocation,
      public zone: NgZone,
      public platform: Platform,
      public localStorage: Storage,
      public mapService: MapProvider,
      public spinner: SpinnerProvider,
      public viewCtrl: ViewController,
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
      let latLangObj = this.localStorage.get('current_latlong');

      if(latLangObj == null) {
        latLangObj = this.currentLocation();
      }

      latLangObj.then((resp) => {
        if(resp != null)
        {
          let latLng: any;
          if(resp.latitude != null) {
            latLng = new google.maps.LatLng(resp.latitude, resp.longitude);
          }
          else {
            let jsonObj = JSON.parse(resp);
            latLng = new google.maps.LatLng(jsonObj.lat, jsonObj.long);
          }

          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'none',
            mapTypeControl: false,
            streetViewControl: false
          }

          this.zone.run(() => {
            var mapEle = this.mapElement.nativeElement;
            this.map = new google.maps.Map(mapEle, mapOptions);
            
            let latLngObj: any;
            if(resp.latitude != null) {
              latLngObj = {'lat': resp.latitude, 'long': resp.longitude};
            }
            else {
              latLngObj = resp;
            }
            this.localStorage.set('current_latlong', JSON.stringify(latLngObj));

            this.addMarker();
            this.getAddress(latLngObj);
            this.initAutocomplete();
            this.spinner.dismiss();
          });
        }
      }).catch((err) => { console.log("Error intializeMap" + err)} );
    }
  
    addMarker() {
      let marker = new google.maps.Marker({
        map: this.map,
        position: this.map.getCenter(),
        animation: google.maps.Animation.DROP,
        title: 'My current location'
      });
      console.log("Marker " + marker);
    }

    initAutocomplete(): void {
      this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
      this.createAutocomplete(this.addressElement).subscribe((location) => {
        let latLngObj = {'lat': location.lat(), 'long': location.lng()};
        this.getAddress(latLngObj);
        let options = {
          center: location,
          zoom: 16
        };
        this.map.setOptions(options);
      });
    }
  
    currentLocation() : Promise<any> {
      //this.spinner.load();
      return this.geolocation.getCurrentPosition().then((position) => position.coords);
      /*{
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(JSON.stringify(latLng));
        let latLngObj = {'lat': position.coords.latitude, 'long': position.coords.longitude};
        // Display  Marker
        this.map.setCenter(latLng);
        this.getAddress(latLngObj);
        this.spinner.dismiss();
        this.localStorage.set('current_latlong', JSON.stringify(latLngObj));
        return latLngObj;

      });*/
    }
  
    getAddress(latLngObj) {
      // Get the address object based on latLngObj
      this.mapService.getStreetAddress(latLngObj).subscribe(
        s_address => {
          if (s_address.status == "ZERO_RESULTS") {
            this.mapService.getAddress(latLngObj).subscribe(
              address => {
                if(address.results[0] != null) {
                  this.address = address.results[0].formatted_address;
                  this.getAddressComponentByPlace(address.results[0], latLngObj);
                }
              },
              err => console.log("Error in getting the street address " + err)
            )
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
      return this.map.getCenter()
    }
  
    createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
      const autocomplete = new google.maps.places.Autocomplete(addressEl);
      autocomplete.bindTo('bounds', this.map);
      return new Observable((sub: any) => {
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            sub.error({
              message: 'Autocomplete returned place with no geometry'
            });
          } else {
            let latLngObj = {'lat': place.geometry.location.lat(), 'long': place.geometry.location.lng()}
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
      console.log(JSON.stringify(components));
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
      this.localStorage.set('current_city', (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality);
      return components;
    }
  
    resizeMap() {
      setTimeout(() => {
        google.maps.event.trigger(this.map, 'resize');
      }, 200);
    }
  
    closeModal() {
      this.viewCtrl.dismiss();
    }
  
    errorAlert(title, message) {
      alert('Error in Alert');
    }
  
    navDealsListPage() {
      this.navCtrl.push("DealsListPage")
    }
  
  }