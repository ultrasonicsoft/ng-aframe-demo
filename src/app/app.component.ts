import { Component } from '@angular/core';
import { AFrame } from "aframe";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

declare var AFRAME: AFrame;
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
