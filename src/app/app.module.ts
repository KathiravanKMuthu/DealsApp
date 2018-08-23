import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { AuthService } from '../providers/auth-service';
import { DealsService } from '../providers/deals-service';
import { MerchantService } from '../providers/merchant-service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { MapProvider } from '../providers/map/map';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule, HttpModule, MomentModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp),
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
    StatusBar, Facebook, GooglePlus,
    SplashScreen, Geolocation, Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService, DealsService, MerchantService,
    MapProvider, SpinnerProvider, LaunchNavigator, CallNumber
  ]
})
export class AppModule {}
