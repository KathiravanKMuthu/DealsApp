import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  params: any = {};
  userDetails : any;
  responseData: any;

  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userData'));
    if(data != null)
    {
      this.userDetails = data.userData;
      this.userPostData.user_id = this.userDetails.user_id;
      this.userPostData.token = this.userDetails.token;
    }

    this.params.data = [
      { page: "DealsListPage", icon: "ios-home" },
      { page: "ClaimsListPage", icon: "ios-star" },
      { page: "NotificationsPage", icon: "ios-notifications" },
      { page: "LocationPage", icon: "ios-heart" },
      { page: "LoginPage", icon: "ios-person" }
    ];

    this.params.events = {
      'onItemClick': function (item: any) {
            console.log("onItemClick");
      }
  };
  }

}
