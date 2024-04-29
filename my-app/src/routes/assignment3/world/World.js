import { createCamera } from './components/camera.js';
import { createTorus } from './components/torus.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

import { AxesHelper } from 'three';

class World {
    #camera;
    #lights;
    #scene;
    #renderer;
    #torus;
    #cube;

    constructor(canvas) {
        this.#camera = createCamera();
        this.#lights = createLights();
        this.#scene = createScene();
        this.#renderer = createRenderer(canvas);

        this.#torus = createTorus();
        this.#cube = createCube();

        const axesHelper = new AxesHelper(5);

        this.#scene.add(this.#torus, this.#cube, axesHelper);
        this.#lights.forEach(light => this.#scene.add(light));

        const resizer = new Resizer(canvas, this.#camera, this.#renderer);
    }

    render() {
        this.#renderer.render(this.#scene, this.#camera);
    }

    setAmbientLight(value)
    {
        // Not a great solution to do this by index TODO: set up a better way to handle this
        if (value) {
            this.#lights[1].intensity = 0.5;
        }
        else {
            this.#lights[1].intensity = 0;
        }
    }

    setPointLight(value)
    {
        if (value) {
            this.#lights[2].intensity = 60;
        }
        else {
            this.#lights[2].intensity = 0;
        }
    }

    setColor(hexValue)
    {
        this.#torus.material.color.set(hexValue);
    }
}

export { World };