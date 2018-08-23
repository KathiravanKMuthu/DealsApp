import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "TabsPage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      storage.set("authToken", "a2F0aGlyYXZhbi5tdXRodUBnbWFpbC5jb20yMzA0MTk4MA==");
      storage.set("user_info", {user_id: 234, email: "kathiravan.k.muthu@gmail.com", phone_number: "+919943623486", address1: "Radha Nagar Extension First Street", address2: "Velachery", state: "Tamilnadu", country: "India", postal_code: "627042"});
    });
  }
}
