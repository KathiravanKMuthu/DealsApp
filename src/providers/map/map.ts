import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { environment as ENV } from '../../environments/environment';

@Injectable()
export class MapProvider {

  app: any;
  google_api_key: any;

  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(public http: Http, public geolocation: Geolocation, public storage: Storage ) {
    this.google_api_key = ENV.GOOGLE_MAP_API_KEY;
  }

 /* getAddress(params) {
    let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + params.lat + ',' + params.long;
    return this.GET(url);
  }*/

  getStreetAddress(params) {
    if(!params || !params.lat) {
        params.lat = 51.508530;
        params.long = -0.076132;
    }
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + this.google_api_key + '&latlng=' + params.lat + ',' + params.long + '&result_type=street_address';
    return this.GET(url);
  }

  GET(url) {
    return this.http.get(url).map(res => res.json());
  }

  POST(url, params) {
    // let options = new RequestOptions({
    //   headers: this.contentHeader
    // });
    // return this.http.post(url, params, options).map(res => res.json());
  }

  DEL(url) {
    // let options = new RequestOptions({
    //   headers: this.contentHeader
    // });
    // return this.http.delete(url, options).map(res => res.json());
  }

  currentLocation()  {
    var positionOptions = {timeout: 10000, enableHighAccuracy: true};
    return new Promise(resolve => {
        this.geolocation.getCurrentPosition(positionOptions).then((position) => {
          let latLngObj = {'lat': 51.508530, 'long': -0.076132};
          if(position && position.coords) {
              //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              latLngObj = {'lat': position.coords.latitude, 'long': position.coords.longitude};
          }
          this.storage.set('current_latlong', latLngObj);
          this.getAddressByLocation(latLngObj);
          resolve(true);
        }, (err) => {
          console.log(" Error getting currentlocation " + JSON.stringify(err));
          resolve(false);
        });
    });
  }

  getAddressByLocation(latLngObj) {
    // Get the address object based on latLngObj
    this.getStreetAddress(latLngObj).subscribe(
      s_address => {
        if (s_address.status == "ZERO_RESULTS") {
            err => console.log("Error in getting the street address " + err);
        } else {
          this.getAddressComponentByPlace(s_address.results[0], latLngObj);
        }
      },
      err => {
        console.log('No Address found ' + err);
      });
  }
  
  getAddressComponentByPlace(place: any, latLngObj: any) {
    var components;

    components = {};

    if(place == null)
      return components;

    for(var i = 0; i < place.address_components.length; i++){
      let ac = place.address_components[i];
      components[ac.types[0]] = ac.long_name;
    }
    this.storage.set('current_city', (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality);
    return components;
  }
}
