import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HockeyApp } from 'ionic-hockeyapp';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "TabsPage";
  @ViewChild(Nav) navChild:Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              storage: Storage, hockeyApp: HockeyApp, app: App) {
    platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        //storage.remove("authToken");
        //storage.remove("user_info");

        //This is the code who responds to the app deeplinks
				//Deeplinks if from Ionic Native
	      /*deeplinks.routeWithNavController(this.navController, {
	        '/deals/:deal_id': "DealPage"
	      }).subscribe((match) => {
	        console.log('Successfully routed', match);
	      }, (nomatch) => {
	        console.log('Unmatched Route', nomatch);
        });*/
        
        // The Android ID of the app as provided by the HockeyApp portal. Can be null if for iOS only.
        let androidAppId = 'd2cdee54-2fca-4c97-be44-6e05bf5d0a3b';
        // The iOS ID of the app as provided by the HockeyApp portal. Can be null if for android only.
        let iosAppId = '262dfa9e-be0e-4e19-ad7c-8188ed9d5979';
        // Specifies whether you would like crash reports to be automatically sent to the HockeyApp server when the end user restarts the app.
        let autoSendCrashReports = true;
        // Specifies whether you would like to display the standard dialog when the app is about to crash. This parameter is only relevant on Android.
        let ignoreCrashDialog = true;
    
        hockeyApp.start(androidAppId, iosAppId, autoSendCrashReports, ignoreCrashDialog);
    
        //So app doesn't close when hockey app activities close
        //This also has a side effect of unable to close the app when on the rootPage and using the back button.
        //Back button will perform as normal on other pages and pop to the previous page.
        platform.registerBackButtonAction(() => {
          let nav = app.getRootNav();
          if (nav.canGoBack()) {
            nav.pop();
          } else {
            nav.setRoot(this.rootPage);
          }
        });
    });
  }
}
