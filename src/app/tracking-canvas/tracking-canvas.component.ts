import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

import { TrackingService } from 'app/tracking.service';

@Component({
  selector: 'app-tracking-canvas',
  templateUrl: './tracking-canvas.component.html',
  styleUrls: ['./tracking-canvas.component.css'],
  providers: [TrackingService]
})
export class TrackingCanvasComponent implements AfterViewInit {

  constructor(
    private trackingService: TrackingService
  ) {}

  @ViewChild('video') videoRef: ElementRef;
  @ViewChild('canvas') canvasRef: ElementRef;

  private video: HTMLVideoElement;
  private canvas: HTMLCanvasElement;

  ngAfterViewInit(): void {
    this.video = this.videoRef.nativeElement;
    this.canvas = this.canvasRef.nativeElement;

    this.trackingService.createRotationTracker(this.video, this.canvas);
  }
}
