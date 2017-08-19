// Type definitions for Tracking.js v1.1.3 - maybe not complete

declare namespace tracking {
  export class ColorTracker extends Tracker {
    constructor(colours: string[]);

    static registerColor(name: string, predicate: (r: number, g: number, b: number) => boolean): void;
  }

  export class ObjectTracker extends Tracker {
    constructor(objects: string[]);
  }

  class Tracker {
    constructor(target: string);
    on(eventName: string, callback: (event: TrackEvent) => void): void;
  }

  interface TrackEvent {
    data: TrackRect[];
  }

  interface TrackRect {
    x: number;
    y: number;
    height: number;
    width: number;
    color: string;
  }

  interface TrackerTask {
    stop(): void;
    run(): void;
  }

  export function track(selector: string, tracker: tracking.Tracker, options: any): TrackerTask;
}
