import { Component, NgZone } from '@angular/core';
import { AFrame } from "aframe";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import 'three/examples/js/loaders/PDBLoader.js';
import 'three/examples/js/renderers/CSS3DRenderer';

declare var AFRAME: any;
declare var PDBLoader: any;
declare var CSS3DRenderer: any;
declare var CSS3DObject: any;
declare var CSS3DSprite: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-aframe-demo';

  camera: any;
  scene: any;
  renderer: any;
  controls: any;
  root: any;
  objects = [];
  tmpVec1 = new AFRAME.THREE.Vector3();
  tmpVec2 = new AFRAME.THREE.Vector3();
  tmpVec3 = new AFRAME.THREE.Vector3();
  tmpVec4 = new AFRAME.THREE.Vector3();
  offset = new AFRAME.THREE.Vector3();
  visualizationType = 2;
  MOLECULES = {
    "Ethanol": "ethanol.pdb",
    "Aspirin": "aspirin.pdb",
    "Caffeine": "caffeine.pdb",
    "Nicotine": "nicotine.pdb",
    "LSD": "lsd.pdb",
    "Cocaine": "cocaine.pdb",
    "Cholesterol": "cholesterol.pdb",
    "Lycopene": "lycopene.pdb",
    "Glucose": "glucose.pdb",
    "Aluminium oxide": "Al2O3.pdb",
    "Cubane": "cubane.pdb",
    "Copper": "cu.pdb",
    "Fluorite": "caf2.pdb",
    "Salt": "nacl.pdb",
    "YBCO superconductor": "ybco.pdb",
    "Buckyball": "buckyball.pdb",
    //"Diamond": "diamond.pdb",
    "Graphite": "graphite.pdb"
  };
  loader: any;
  colorSpriteMap = {};
  baseSprite = <any>document.createElement('img');
  menu = document.getElementById("menu");

  constructor(public ngZone: NgZone) {


  }

  ngOnInit() {

    this.loader = new AFRAME.THREE.PDBLoader();
    //console.log(this.loader);

    this.camera = new AFRAME.THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.position.z = 1500;
    this.scene = new AFRAME.THREE.Scene();
    this.root = new AFRAME.THREE.Object3D();
    this.scene.add(this.root);

    this.renderer = new AFRAME.THREE.CSS3DRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(this.renderer.domElement);


    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 0.5;
    this.controls.addEventListener('change', this.render);


    this.baseSprite.onload = () => {
      this.loadMolecule("models/molecules/caffeine.pdb");
      this.createMenu();
    };
    this.baseSprite.src = 'assets/ball.png';

    this.animate();

    // window.addEventListener('resize', onWindowResize, false);

    // console.log(TrackballControls);
    // console.log(AFRAME.THREE);
  }
  animate() {
    console.log(this);

    this.ngZone.runOutsideAngular(() => {

      requestAnimationFrame(() => {
        return this.animate;
      });

    });

    // requestAnimationFrame(this.animate);
    this.controls.update();
    var time = Date.now() * 0.0004;
    this.root.rotation.x = time;
    this.root.rotation.y = time * 0.7;
    this.render();
  }

  render() {
    console.log('render() event is called...');
    this.renderer.render(this.scene, this.camera);
  }

  loadMolecule(url) {
    // for (var i = 0; i < objects.length; i++) {
    //   var object = objects[i];
    //   object.parent.remove(object);
    // }
    // objects = [];
    // loader.load(url, function (pdb) {
    //   var geometryAtoms = pdb.geometryAtoms;
    //   var geometryBonds = pdb.geometryBonds;
    //   var json = pdb.json;
    //   geometryAtoms.computeBoundingBox();
    //   geometryAtoms.boundingBox.getCenter(offset).negate();
    //   geometryAtoms.translate(offset.x, offset.y, offset.z);
    //   geometryBonds.translate(offset.x, offset.y, offset.z);
    //   var positions = geometryAtoms.getAttribute('position');
    //   var colors = geometryAtoms.getAttribute('color');
    //   var position = new THREE.Vector3();
    //   var color = new THREE.Color();
    //   for (var i = 0; i < positions.count; i++) {
    //     position.x = positions.getX(i);
    //     position.y = positions.getY(i);
    //     position.z = positions.getZ(i);
    //     color.r = colors.getX(i);
    //     color.g = colors.getY(i);
    //     color.b = colors.getZ(i);
    //     var atom = json.atoms[i];
    //     var element = atom[4];
    //     if (!colorSpriteMap[element]) {
    //       var canvas = imageToCanvas(baseSprite);
    //       var context = canvas.getContext('2d');
    //       colorify(context, canvas.width, canvas.height, color);
    //       var dataUrl = canvas.toDataURL();
    //       colorSpriteMap[element] = dataUrl;
    //     }
    //     var colorSprite = colorSpriteMap[element];
    //     var atom = document.createElement('img');
    //     atom.src = colorSprite;
    //     var object = new CSS3DSprite(atom);
    //     object.position.copy(position);
    //     object.position.multiplyScalar(75);
    //     object.matrixAutoUpdate = false;
    //     object.updateMatrix();
    //     root.add(object);
    //     objects.push(object);
    //   }
    //   positions = geometryBonds.getAttribute('position');
    //   var start = new THREE.Vector3();
    //   var end = new THREE.Vector3();
    //   for (var i = 0; i < positions.count; i += 2) {
    //     start.x = positions.getX(i);
    //     start.y = positions.getY(i);
    //     start.z = positions.getZ(i);
    //     end.x = positions.getX(i + 1);
    //     end.y = positions.getY(i + 1);
    //     end.z = positions.getZ(i + 1);
    //     start.multiplyScalar(75);
    //     end.multiplyScalar(75);
    //     tmpVec1.subVectors(end, start);
    //     var bondLength = tmpVec1.length() - 50;
    //     //
    //     var bond = document.createElement('div');
    //     bond.className = "bond";
    //     bond.style.height = bondLength + "px";
    //     var object = new CSS3DObject(bond);
    //     object.position.copy(start);
    //     object.position.lerp(end, 0.5);
    //     object.userData.bondLengthShort = bondLength + "px";
    //     object.userData.bondLengthFull = (bondLength + 55) + "px";
    //     //
    //     var axis = tmpVec2.set(0, 1, 0).cross(tmpVec1);
    //     var radians = Math.acos(tmpVec3.set(0, 1, 0).dot(tmpVec4.copy(tmpVec1).normalize()));
    //     var objMatrix = new THREE.Matrix4().makeRotationAxis(axis.normalize(), radians);
    //     object.matrix = objMatrix;
    //     object.quaternion.setFromRotationMatrix(object.matrix);
    //     object.matrixAutoUpdate = false;
    //     object.updateMatrix();
    //     root.add(object);
    //     objects.push(object);
    //     //
    //     var bond = document.createElement('div');
    //     bond.className = "bond";
    //     bond.style.height = bondLength + "px";
    //     var joint = new THREE.Object3D(bond);
    //     joint.position.copy(start);
    //     joint.position.lerp(end, 0.5);
    //     joint.matrix.copy(objMatrix);
    //     joint.quaternion.setFromRotationMatrix(joint.matrix);
    //     joint.matrixAutoUpdate = false;
    //     joint.updateMatrix();
    //     var object = new CSS3DObject(bond);
    //     object.rotation.y = Math.PI / 2;
    //     object.matrixAutoUpdate = false;
    //     object.updateMatrix();
    //     object.userData.bondLengthShort = bondLength + "px";
    //     object.userData.bondLengthFull = (bondLength + 55) + "px";
    //     object.userData.joint = joint;
    //     joint.add(object);
    //     root.add(joint);
    //     objects.push(object);
    //   }
    //   //console.log( "CSS3DObjects:", objects.length );
    //   switch (visualizationType) {
    //     case 0:
    //       showAtoms();
    //       break;
    //     case 1:
    //       showBonds();
    //       break;
    //     case 2:
    //       showAtomsBonds();
    //       break;
    //   }
    //   render();
    // });
  }

  createMenu() {
    // for (var m in MOLECULES) {
    //   var button = document.createElement('button');
    //   button.innerHTML = m;
    //   menu.appendChild(button);
    //   var url = "models/molecules/" + MOLECULES[m];
    //   button.addEventListener('click', generateButtonCallback(url), false);
    // }
    // var b_a = document.getElementById("b_a");
    // var b_b = document.getElementById("b_b");
    // var b_ab = document.getElementById("b_ab");
    // b_a.addEventListener('click', function () {
    //   visualizationType = 0;
    //   showAtoms();
    // });
    // b_b.addEventListener('click', function () {
    //   visualizationType = 1;
    //   showBonds();
    // });
    // b_ab.addEventListener('click', function () {
    //   visualizationType = 2;
    //   showAtomsBonds();
    // });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }
}
