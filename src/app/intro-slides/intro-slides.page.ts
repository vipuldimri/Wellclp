import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-intro-slides',
  templateUrl: './intro-slides.page.html',
  styleUrls: ['./intro-slides.page.scss'],
})
export class IntroSlidesPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {

  }
  login() {
    this.router.navigate(['login']);
  }

}
