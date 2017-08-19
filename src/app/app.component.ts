import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = 'LoginPage';

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public zone: NgZone) {

      this.initializeApp();

  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

}
