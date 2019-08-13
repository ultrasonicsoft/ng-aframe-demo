import { Component } from '@angular/core';
import { AFrame } from "aframe";
// import * as TrackballControls from "trackballcontrols";

declare var AFRAME: AFrame;
declare var TrackballControls: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-aframe-demo';

  ngOnInit() {
    console.log(TrackballControls);
    console.log(AFRAME.THREE);
  }
}
