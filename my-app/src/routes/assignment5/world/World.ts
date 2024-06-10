import { createCamera } from './components/camera.js';
import { tetrakisHexahedron } from './components/tetrakisHexahedron.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import { Controls }  from './systems/Controls.js';

import { AxesHelper, PerspectiveCamera, Light, Scene, WebGLRenderer, Mesh } from 'three';

class World {
    private camera : PerspectiveCamera;
    private lights : Light[];
    private scene : Scene;
    private renderer : WebGLRenderer;
    private tetrakisHexahedron: tetrakisHexahedron;
    private loop: Loop;
    private controls : Controls;

    constructor(canvas : HTMLCanvasElement) {
        this.camera = createCamera();
        this.lights = createLights();
        this.scene = createScene();
        this.renderer = createRenderer(canvas);
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        this.controls = new Controls(this.camera, canvas);

        const axesHelper = new AxesHelper(5);

        this.tetrakisHexahedron = new tetrakisHexahedron();
        this.scene.add(this.tetrakisHexahedron);
        this.scene.add(axesHelper);
        this.lights.forEach(light => this.scene.add(light));

        this.loop.addUpdateable(this.tetrakisHexahedron);
        this.loop.addUpdateable(this.controls); // for the camera controls

        // Not currently using the resizer as our canvas has a fixed size
        const resizer = new Resizer(canvas, this.camera, this.renderer);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }

    setAmbientLight(value : boolean)
    {
        // Not a great solution to do this by index TODO: set up a better way to handle this
        if (value) {
            this.lights[1].intensity = 0.5;
        }
        else {
            this.lights[1].intensity = 0;
        }
    }

    setPointLight(value : boolean)
    {
        if (value) {
            this.lights[2].intensity = 60;
        }
        else {
            this.lights[2].intensity = 0;
        }
    }

    getFrameRate(): number {
        return this.loop.getFrameRate();
    }

    setWireframe(value: boolean) {
        this.tetrakisHexahedron.setWireframe(value);
    }
}

export { World };