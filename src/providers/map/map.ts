import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MapProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MapProvider {

  app: any;
  google_api_key: any;

  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(public http: Http, public geolocation: Geolocation, public storage: Storage ) {
    this.google_api_key = 'AIzaSyC-8VBQYTJAUMfPK401zUu2Awj12DU30sU';
  }

  getAddress(params) {
    let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + params.lat + ',' + params.long;
    return this.GET(url);
  }

  getStreetAddress(params) {
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

  currentLocation(): boolean {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let latLngObj = {'lat': position.coords.latitude, 'long': position.coords.longitude};
      this.storage.set('current_latlong', JSON.stringify(latLngObj));
      this.getAddressByLocation(latLngObj);
      return true;
    }, (err) => {
      console.log(" Error getting currentlocation " + err);
      return false;
    });
    return true;
  }

  getAddressByLocation(latLngObj) {
    // Get the address object based on latLngObj
    this.getStreetAddress(latLngObj).subscribe(
      s_address => {
        if (s_address.status == "ZERO_RESULTS") {
          this.getAddress(latLngObj).subscribe(
            address => {
              this.getAddressComponentByPlace(address.results[0], latLngObj);
            },
            err => console.log("Error in getting the street address " + err)
          )
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

    /*let addressObj = {
      street: (components.street_number) ? components.street_number : 'not found',
      area: components.route,
      city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
      country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
      postCode: components.postal_code,
      loc: [latLngObj.long, latLngObj.lat],
    }*/
    this.storage.set('current_city', (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality);
    return components;
  }
}
