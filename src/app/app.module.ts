import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { HockeyApp } from 'ionic-hockeyapp';

import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthService } from '../providers/auth-service';
import { DealsService } from '../providers/deals-service';
import { MerchantService } from '../providers/merchant-service';
import { MapProvider } from '../providers/map/map';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CategoryService } from '../providers/category-service';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment as ENV } from '../environments/environment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Base64 } from '@ionic-native/base64';
//import { NavController } from 'ionic-angular/navigation/nav-controller';

export const firebaseConfig = ENV.firebaseConfig;

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule, HttpModule, MomentModule,
    NgxQRCodeModule, HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot({
      name: "__mydb",
      driverOrder: ['sqlite', 'websql', 'indexeddb']
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar, Facebook, GooglePlus, HockeyApp,
    SplashScreen, Geolocation, Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, DealsService, MerchantService,
    MapProvider, SpinnerProvider, LaunchNavigator, CallNumber,
    CategoryService, Camera, SocialSharing, Deeplinks
  ]
})
export class AppModule {}
