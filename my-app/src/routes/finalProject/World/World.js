import * as THREE from 'three';
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createDirectionalLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';
import {Loop} from './systems/Loop.js';
import {cameraOrbit } from './systems/orbit.js';
import { createGround } from './components/ground.js';
import { createCat } from './components/cat.js';
import { createCrossBow } from './components/crossbow.js';
import { createDartboard } from './components/dartboard.js';
import { createDagger } from './components/dagger.js';
import { c } from 'svelte-highlight/languages';

let camera, renderer, scene, loop, controls;
let directionalLight;
let rotationY = 0;
let rotationX = 0;
let rotationZ = 0;
//Let other shapes
let ground, crossbow;
let keys = {};

class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(0, 64, 0);
        camera.position.y *= 4; // Make the camera 3 times as high
        //camera.lookAt(0, -10, 1000);

        controls = cameraOrbit(camera, container);
        camera.lookAt(0, 0, 10);

        controls.addEventListener('change', () => {
            if (camera.position.y < 0) { // assuming ground is at y = 0
                camera.position.y = 0;
            }
        });

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
        directionalLight.shadow.camera.left = -250; // half the width of the ground
        directionalLight.shadow.camera.right = 250; // half the width of the ground
        directionalLight.shadow.camera.top = 500; // half the height of the ground
        directionalLight.shadow.camera.bottom = -500; // half the height of the ground
        directionalLight.shadow.camera.updateProjectionMatrix(); // update the shadow camera's projection matrix
        //Add scene items

        scene.add(ground);
        scene.add(directionalLight);

        const resizer = new Resizer(container, camera, renderer, scene, directionalLight);
    }
    
    async init(){
        crossbow = await createCrossBow();
    
        // Create and position the first dartboard
        const dartboard1 = await createDartboard();
        dartboard1.position.set(0, 50, -50);
        dartboard1.scale.set(10, 10, 10);
        scene.add(dartboard1);

        // Create and position the second dartboard
        const dartboard2 = await createDartboard();
        dartboard2.position.set(100, 50, -100); // twice the distance along the positive x axis
        dartboard2.scale.set(10, 10, 10);
        scene.add(dartboard2);

        // Create and position the third dartboard
        const dartboard3 = await createDartboard();
        dartboard3.position.set(-100, 50, -150); // twice the distance along the negative x axis
        dartboard3.scale.set(10, 10, 10);
        scene.add(dartboard3);

        // Create and position the fourth dartboard
        const dartboard4 = await createDartboard();
        dartboard4.position.set(-200, 50, -100); // twice the distance along the positive z axis
        dartboard4.scale.set(10, 10, 10);
        scene.add(dartboard4);

        // Load the dagger model once
        let daggerModel = await createDagger();

        // Add an event listener for the shoot action
        window.addEventListener('keydown', (event) => {
            if ((event.key === 'f' || event.key === 'F') && daggerModel) { // Check if the 'F' key was pressed and the dagger model is loaded
                const dagger = daggerModel.clone();

                // Position the dagger at the crossbow's location
                dagger.position.copy(crossbow.position);

                // Set the dagger's rotation to match the crossbow's rotation
                dagger.rotation.copy(crossbow.rotation);

                // Scale the dagger to be one-eighth the size
                dagger.scale.set(0.05, 0.05, 0.05);

                // Add the dagger to the scene
                scene.add(dagger);

                // Animate the dagger
                const animate = () => {
                    // Move the dagger in the direction the crossbow is facing
                    dagger.position.add(crossbow.getWorldDirection().multiplyScalar(-1));

                    // If the dagger is still within the scene, continue animating it
                    if (dagger.position.z > -1000) {
                        requestAnimationFrame(animate);
                    }
                };

                animate();
            }
        });

        crossbow.position.set(0, 0, -5);  // Set position relative to the camera
        crossbow.scale.set(2, 2, 2); // Adjust scale as needed
        crossbow.rotation.y = Math.PI; // Rotate the crossbow 180 degrees around the y-axis

        camera.add(crossbow); // Add crossbow to the scene
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
/*
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
        */
}

    export { World};