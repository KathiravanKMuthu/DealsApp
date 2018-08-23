import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html',
})
export class QrCodePage {

  qrCode: string;
  dealName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.qrCode = this.navParams.get('qrCode');
    this.dealName = this.navParams.get('dealName');
    console.log(this.qrCode)
    console.log(this.dealName);
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}
