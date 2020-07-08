import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FCM } from '@ionic-native/fcm/ngx';
import { HomeService } from './services/home/home.service';
import { AuthService } from './services/auth/auth.service';
import { CommonProviderService } from './services/CommonProvider.service';
import { PrescriptionService } from './services/prescription/prescription.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ProductService } from './services/product/product.service';
import { CartService } from './services/cart/cart.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from './services/location/location.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AuthGuardService } from './guards/skipslides-guard';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { SmsRetriever  } from '@ionic-native/sms-retriever/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';

const firebaseConfig = {
   apiKey: 'AIzaSyCvSr9rntVsKJ0qIbylZpJbb00AuL3WEoA',
   authDomain: 'wellclap-ca081.firebaseapp.com',
   databaseURL: 'https://wellclap-ca081.firebaseio.com',
   projectId: 'wellclap-ca081',
   storageBucket: 'wellclap-ca081.appspot.com',
   messagingSenderId: '422524281155',
   appId: '1:422524281155:web:f3881ab2a486132eb9cff6',
   measurementId: 'G-X6MVRP4H69'
 };

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(),
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AppRoutingModule
   ],
   providers: [
      GooglePlus,
      Sim,
      StatusBar,
      SplashScreen,
      FCM,
      NativeGeocoder,
      SmsRetriever,
      NativeStorage,
      Deeplinks,
      Geolocation,
      SocialSharing,
      PhotoViewer,
      LocationService,
      CartService,
      ProductService,
      PrescriptionService,
      CommonProviderService,
      AuthService,
      HomeService,
      AuthGuardService,
      HTTP,
      LocalNotifications,
      AppUpdate,
      Downloader
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
