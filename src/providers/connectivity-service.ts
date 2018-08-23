import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
  appOnline: boolean;

  constructor(public platform: Platform, public network: Network){
    this.onDevice = this.platform.is('cordova');
    this.appOnline = false;
  }
 
  isOnline(): boolean {
    if(this.onDevice && this.network.type){
      return this.network.type != 'none';
    } else {
      return navigator.onLine;
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && this.network.type){
      return this.network.type == 'none';
    } else {
      return !navigator.onLine;  
    }
  }
 
  watchOnline(): Observable<void> {
    console.log("inside watchOnline");
    console.log(this.network.type);

    return this.network.onConnect().map(() => {
      console.log("inside onConnect");
      this.appOnline = true;
    });
  
  }
 
  watchOffline(): any {
    return this.network.onDisconnect();
  }
 
}