import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createDirectionalLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';
import {Loop} from './systems/Loop.js';
import {cameraOrbit } from './systems/orbit.js';
import { createGround } from './components/ground.js';
import { createCat } from './components/cat.js';

let camera, renderer, scene, loop, controls;
let directionalLight;
let rotationY = 0;
let rotationX = 0;
let rotationZ = 0;
//Let other shapes
let ground, cat;
let keys = {};

class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(0, 4, -3);
        //camera.lookAt(0, -10, 1000);

        controls = cameraOrbit(camera, container);
        camera.lookAt(0, 0, 10);

        scene = createScene();
        renderer = createRenderer(container);
        renderer.shadowMap.enabled = true; // Enable shadows in the renderer

        loop = new Loop(camera, scene, renderer);

        //Create shapes

        const ground = createGround();
        ground.receiveShadow = true; // Enable shadow receiving on the ground

        //Create lighting

        directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, -30);
        directionalLight.lookAt(0, 0, 0);
        directionalLight.intensity = 3;
        directionalLight.castShadow = true; // Enable shadow casting on the light
        directionalLight.shadow.mapSize.width = 2048; // Configure the shadow map size
        directionalLight.shadow.mapSize.height = 2048; // Configure the shadow map size
        directionalLight.shadow.camera.near = 0.5; // Configure the shadow camera frustum
        directionalLight.shadow.camera.far = 500; // Configure the shadow camera frustum
        directionalLight.shadow.camera.left = -50; // adjust as needed
        directionalLight.shadow.camera.right = 50; // adjust as needed
        directionalLight.shadow.camera.top = 50; // adjust as needed
        directionalLight.shadow.camera.bottom = -50; // adjust as needed
        directionalLight.shadow.camera.updateProjectionMatrix(); // update the shadow camera's projection matrix
        //Add scene items

        scene.add(ground);
        scene.add(directionalLight);

        const resizer = new Resizer(container, camera, renderer, scene, directionalLight);
    }
    
    async init(){
        cat = await createCat();
        cat.castShadow = true; // Enable shadow casting on the cat

        cat.position.set(0, 0, 10);
        cat.scale.set(0.6, 0.6, 0.6);

        loop.addUpdateable(cat);
        loop.cat = cat;
        cat.playIdle();

        scene.add(cat);
        scene.add(camera);
    }


    // Render the scene
    render() {

        renderer.render(scene, camera);
    }

    start(){
        loop.start();
    }

    stop(){
        loop.stop();
    }

    getFrameRate() {
        return loop.getFrameRate();
    }

    toggleAnimation(){
        loop.animate = !loop.animate;
    }

    initControls() {
        window.addEventListener('keydown', (event) => {
            keys[event.key] = true;
            this.updateMovement();
            this.render();
        });

        window.addEventListener('keyup', (event) => {
            keys[event.key] = false;
            this.updateMovement();
            this.render();
        });
    }

    updateMovement() {
        if(keys['w']) {
            this.playWalkForward();
        } else if (keys['s']) {
            this.playWalkBackward();
        } else {
            this.playIdle();
        }

        if (keys['a']) {
            rotationZ += 0.1;
            cat.rotation.z = rotationZ;
        } else if (keys['d']) {
            rotationZ -= 0.1;
            cat.rotation.z = rotationZ;
        }
    }

    playWalkForward() {
        if (cat && cat.playWalk) {
            cat.playWalk();
            cat.position.x += 0.2 * Math.sin(cat.rotation.z);
            cat.position.z += 0.2 * Math.cos(cat.rotation.z);
        }
    }
    
    playWalkBackward() {
        if (cat && cat.playWalk) {
            cat.playWalkReverse();
            cat.position.x -= 0.2 * Math.sin(cat.rotation.z);
            cat.position.z -= 0.2 * Math.cos(cat.rotation.z);
        }
    }

    playIdle() {
        if (cat && cat.playIdle) {
            cat.playIdle();
        }
    }

}

    export { World};