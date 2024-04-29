import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

import { AxesHelper } from 'three';
import { createCone } from './components/cone.js';
import { createCylinder } from './components/cylinder.js';

class World {
    #camera;
    #lights;
    #scene;
    #renderer;
    #cone;
    #cylinder;

    constructor(canvas) {
        this.#camera = createCamera();
        this.#lights = createLights();
        this.#scene = createScene();
        this.#renderer = createRenderer(canvas);

        this.#cone = createCone();
        this.#cylinder = createCylinder();

        const axesHelper = new AxesHelper(5);

        this.#scene.add(this.#cone, this.#cylinder, axesHelper);
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
        this.#cone.material.color.set(hexValue);
    }
}

export { World };