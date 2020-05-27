import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { AuthService } from './services/auth/auth.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from './services/auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private nativeStorage: NativeStorage,
    private router: Router,
    private AuthS: AuthService,
    private deeplinks: Deeplinks,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#31a3a0');
      this.SetUpDeepLinks();

      try {
        this.fcm.subscribeToTopic('marketing');
      } catch (error) {
        alert('error 1' );
      }

      this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log('Received in background');
        alert('Mess b ');
        console.log(data);
      } else {
        console.log('Received in foreground');
        alert('Mess f');
        console.log(data);
      }
    });
      console.log('Getting');
    });


  }



  SetUpDeepLinks() {
    this.deeplinks.route({

    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
       console.log('Successfully matched route', match);
       // alert('HERE');
       // alert(match);
    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
      // alert(' not match');
      // alert('HERE not match');
    });
  }

  ngOnInit() {
  }
}
