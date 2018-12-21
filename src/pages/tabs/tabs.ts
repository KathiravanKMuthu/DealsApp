import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  data: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    
    this.data = [
      { page: "SliderPage", icon: "ios-home" },
      { page: "ClaimsListPage", icon: "ios-star" },
      { page: "NotificationsPage", icon: "ios-notifications" },
      { page: "WishListPage", icon: "ios-heart" }
    ];

    authService.getAuthToken().then((data) => {
        if(data && data != "") {
          this.data.push({ page: "ProfilePage", icon: "ios-person" });
        } else {
          this.data.push({ page: "LoginPage", icon: "ios-person" });
        }
    });
  }

  ionViewWillEnter() {
    
  }
}
