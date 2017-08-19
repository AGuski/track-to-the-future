import { Injectable } from '@angular/core';
import 'tracking';

@Injectable()
export class TrackingService {

  constructor() { }

  createColorTracker(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');

    const tracker = new tracking.ColorTracker(['magenta', 'yellow']);

    tracking.track(`#${video.id}`, tracker, { camera: true });

    tracker.on('track', (event) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.drawPiano(context);
      event.data.forEach((rect) => {
        if (rect.y + rect.height > 249) {
          this.drawPianoHit(context, rect);
        }
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
