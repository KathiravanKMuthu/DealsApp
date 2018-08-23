import { Injectable } from '@angular/core';
import { ConnectivityService } from './connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GoogleMapsService {
 
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyC-8VBQYTJAUMfPK401zUu2Awj12DU30sU";
 
  constructor(public connectivityService: ConnectivityService, public geolocation: Geolocation) {
 
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
 
  }
 
  loadGoogleMaps(): Promise<any> {
    console.log("loadGoogleMaps");

    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              resolve(true);
            });
 
            this.enableMap();
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
          }
 
          document.body.appendChild(script); 
 
        }
      } else {
        console.log("loadGoogleMaps else");

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
 
 
      }
 
      this.addConnectivityListeners();
      console.log("loadGoogleMaps resolve");

      resolve(true);

    });
 
  }
 
  initMap(): Promise<any> {
 console.log("initMap");
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
      this.geolocation.getCurrentPosition().then((position) => {
 
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
 
      });
 
    });
 
  }
 
  disableMap(): void {
    console.log("disableMap");

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
    console.log("enableMap");

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 console.log("addConnectivityListeners");
    //this.connectivityService.watchOnline().subscribe(() => {
      console.log("addConnectivityListeners 1");

      setTimeout(() => {
        console.log("addConnectivityListeners 2");

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          console.log("addConnectivityListeners 3");

          this.loadGoogleMaps();
        }
        else {
          console.log("addConnectivityListeners 4");

          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();

        }
           console.log("addConnectivityListeners 5");

      }, 2000);
 
    //});
 
    /*this.connectivityService.watchOffline().subscribe(() => {
 
      this.disableMap();
 
    });*/
 
  }
 
}