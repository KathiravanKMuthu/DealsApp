import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams, Events } from 'ionic-angular';
import { SpinnerProvider } from '../../providers/spinner/spinner';
import { MapProvider } from '../../providers/map/map';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;

  SwipedTabsIndicator: any = null;
  tabs: any = [];
  currentCity: any = "";

  constructor(public navCtrl: NavController, private storage: Storage, private navParams: NavParams,
              private spinner: SpinnerProvider, private mapProvider: MapProvider, public events: Events) 
  {
    this.tabs = [
      { page: "NearMePage", name: "Near Me" },
      { page: "DealsDealsPage", name: "Deals" },
      { page: "ExpireDealsPage", name: "Expired Soon" },
      { page: "MyDealsPage", name: "My Deals" }
    ];
  }

  ionViewWillEnter() {
    this.spinner.load();
    this.getCurrentCity();
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.selectTab(1);
    this.spinner.dismiss();
  }

  selectTab(index) {    
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);

    if(index == 3) { // My deals segment index
      this.events.publish('load:mydeals');
    }
  }

  updateIndicatorPosition() {
      // this condition is to avoid passing to incorrect index
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}
  }

  animateIndicator($event) {
  	if(this.SwipedTabsIndicator)
   	    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }


  getCurrentCity() {
    this.currentCity = "";
    //if(this.navParams.data["loadCurrentCity"] == false)
    {
        this.storage.get("current_city").then((city) => {
          this.currentCity = city;
        });
    }

    this.mapProvider.currentLocation().then((success) => {
        if(success && this.currentCity == "") {
          this.storage.get("current_city").then((city) => {
              this.currentCity = city;
          }).catch((err) => {console.log ("City name is empty " + err)});
        }
    });
  }

  openLocationPage() {
    this.navCtrl.push("LocationPage");
  }

  navCategoryPage() {
    this.navCtrl.push("CategoryListPage");
  }
}
