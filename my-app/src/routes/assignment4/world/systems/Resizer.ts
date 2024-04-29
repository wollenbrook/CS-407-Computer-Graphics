import { PerspectiveCamera, WebGLRenderer } from 'three';

class Resizer {
    constructor(canvas : HTMLCanvasElement, camera : PerspectiveCamera, renderer: WebGLRenderer) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    }
}

export { Resizer };