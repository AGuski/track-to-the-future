import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrackingCanvasComponent } from './tracking-canvas/tracking-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackingCanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
