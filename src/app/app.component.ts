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
        this.fcm.subscribeToTopic('all');
      } catch (error) {
      }

      this.fcm.onNotification()
      .subscribe(data => {
      if (data.wasTapped) {
        //     "Belongs" => $Belongs,
        //     "Parent_ID" => $ParentID
        console.log('Received in background');
        console.log(data);
        if (data.Belongs === '1') {
          this.router
          .navigate( ['main/products-list', data.Parent_ID ] , { queryParams: { option: '0'} ,
           queryParamsHandling: 'merge' }  );
        } else if (data.Belongs === '2') {
          this.router.navigate(['main/product-detail', data.Parent_ID]);
        }
         // alert('Back');
      } else {
        // alert('front');
        console.log('Received in foreground');
        console.log(data);
        if (data.Belongs === '1') {
          this.router
          .navigate( ['main/products-list', data.Parent_ID ] , { queryParams: { option: '0'} ,
           queryParamsHandling: 'merge' }  );
        } else if (data.Belongs === '2') {
          this.router.navigate(['main/product-detail', data.Parent_ID]);
        }
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
    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }

  ngOnInit() {
  }
}
