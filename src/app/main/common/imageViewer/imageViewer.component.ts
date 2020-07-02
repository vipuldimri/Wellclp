import { Component, OnInit, ElementRef, ViewChild, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-imageViewer',
  templateUrl: './imageViewer.component.html',
  styleUrls: ['./imageViewer.component.scss']
})
export class ImageViewerComponent implements OnInit , OnDestroy {
  @Input() Images;
  BackButtonSub: Subscription;
  constructor(public modalController: ModalController) { }

  sliderOpts = {
    zoom: {
      maxRatio: 5
    },
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false
  };

  sliderConfig = {
    pager:  true,
    pagination: true,
    slidesPerView: 1,
    spaceBetween: 15,
    centeredSlides: false
  };

  @ViewChild('slider' , { static: true , read : ElementRef })slider: ElementRef;

  ngOnInit() {
    console.log(this.Images);
    const event = fromEvent(document, 'backbutton');
    this.BackButtonSub = event.subscribe(async () => {
       this.close();
    });
  }

  zoom(zoomIn: boolean) {
    const zoom =  this.slider.nativeElement.swiper.zoom;
    console.log(zoom);
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }
  close() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.BackButtonSub.unsubscribe();
  }

}
