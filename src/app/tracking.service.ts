import { Injectable } from '@angular/core';
import 'tracking';

@Injectable()
export class TrackingService {

  constructor() { }

  private drawRect(video: HTMLVideoElement, context, rect) {
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.font = '11px Helvetica';
    context.fillStyle = '#fff';
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
  }

  createRotationTracker(video: HTMLVideoElement, canvas: HTMLCanvasElement) {

    const context = canvas.getContext('2d');
    const tracker = new tracking.ColorTracker(['magenta', 'yellow']);

    tracking.track(`#${video.id}`, tracker, { camera: true });

    tracker.on('track', (event) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      event.data.filter((rect) => rect.color === 'magenta').map((A) => {
        let B;
        event.data.filter((R) => R.color === 'yellow').map((R) => {
          if (
            B === undefined ||
            Math.sqrt((R.x - A.x) * (R.x - A.x) + (R.y - A.y) * (R.y - A.y)) <
            Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y))
          ) {
            B = R;
          }
        });
        if (A && B) {

          let rot = Math.acos((B.x - A.x) / Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y))) / (2 * Math.PI);
          if (A.x > B.x) {
            rot = 1 - rot;
          }
          this.drawRect(video, context, B);
          this.drawRect(video, context, A);

          context.strokeStyle = '#000';
          context.strokeRect(0, 0, 300, 100);
          context.font = '11px Helvetica';
          context.fillStyle = 'red';
          context.fillStyle = '#fff';
          context.fillText('Rotation: ' + rot, 50, 50);
          context.fill();
        }
      });
    });
  }

  createColorTracker(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');

    const tracker = new tracking.ColorTracker(['magenta', 'yellow']);

    tracking.track(`#${video.id}`, tracker, { camera: true });

    tracker.on('track', (event) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // this.drawPiano(context);
      event.data.forEach((rect) => {
        // if (rect.y + rect.height > 249) {
        //   this.drawPianoHit(context, rect);
        // }
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = '#fff';
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });
  }

  drawPiano(context) {
    context.strokeStyle = 'red';
    context.beginPath();
    context.moveTo(0, 250);
    context.lineTo(400, 250);
    context.stroke();
  }

  drawPianoHit(context, rect) {
    const keySize = 25;
    const keyPos = Math.floor((rect.x + (rect.width / 2)) / keySize) * keySize;
    context.fillStyle = 'red';
    context.rect(keyPos, 240, keySize, 20);
    context.fill();
  }

}
