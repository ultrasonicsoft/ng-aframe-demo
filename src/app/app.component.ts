import { Component } from '@angular/core';
import { AFrame } from "aframe";

declare var AFRAME: AFrame;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-aframe-demo';

  ngOnInit() {
    debugger;
    console.log(AFRAME.THREE);
  }
}
