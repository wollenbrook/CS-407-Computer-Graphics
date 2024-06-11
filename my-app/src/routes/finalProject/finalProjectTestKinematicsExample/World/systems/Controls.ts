import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { PerspectiveCamera, Vector3 } from 'three';
import type { Animateable } from '../Animateable.jss';

export class Controls implements Animateable {
    //private controls: OrbitControls;
    private controls: FirstPersonControls;

    constructor(camera : PerspectiveCamera, canvas : HTMLCanvasElement) {
        // this.controls = new OrbitControls(camera, canvas);
        // this.controls.enableDamping = true;
        // this.controls.dampingFactor = 0.1;
        // this.controls.enableZoom = true;
        // this.controls.enablePan = true;

        this.controls = new FirstPersonControls(camera, canvas);
        this.controls.lookAt(new Vector3(0, 0, 0)); // Add this line
        this.controls.heightMax = 20;
        this.controls.lookSpeed = 0.5;
        this.controls.movementSpeed = 10;

    }

    update(delta: number) {
        this.controls.update(delta);
    }

    tick(delta: number) {
        this.update(delta);
    }
}