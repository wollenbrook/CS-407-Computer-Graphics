import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PerspectiveCamera } from 'three';
import type { Animateable } from '../Animateable.js';

export class Controls implements Animateable {
    private controls : OrbitControls;

    constructor(camera : PerspectiveCamera, canvas : HTMLCanvasElement) {
        this.controls = new OrbitControls(camera, canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
    }

    update() {
        this.controls.update();
    }

    tick() {
        this.update();
    }
}