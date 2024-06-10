<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { createWorld, animate } from './world/World.js';
    import { createScene, animateObjects, addInteractions } from './world/components/scene.js';

    let container;
    let world;
    let scene;
    let cube;
    let sphere1;
    let sphere2;
    let animControls;

    let animationRunning = true;

    function startAnimation() {
        if (!animationRunning) {
            animControls.setRotationSpeed(0.01);
            animControls.setOrbitSpeed(0.01);
            animationRunning = true;
        }
    }

    function stopAnimation() {
        if (animationRunning) {
            animControls.setRotationSpeed(0);
            animControls.setOrbitSpeed(0);
            animationRunning = false;
        }
    }

    function toggleWireframeMode() {
        toggleWireframe(cube);
    }

    onMount(() => {
        world = createWorld(container);
        ({ scene, cube, sphere1, sphere2 } = createScene());
        world.scene.add(scene);

        animControls = animateObjects(cube, sphere1);
        animate(world.renderer, world.scene, world.camera);
        addInteractions(cube, sphere1);
    });
</script>

<style>
    canvas {
        display: block;
    }

    .controls {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
    }

    button {
        margin: 5px;
        padding: 10px;
        background-color: #008cba;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #005f5f;
    }
</style>


<h1>Assignment #4</h1>
<section>
    <article class="graphics">
    <div bind:this={container}></div>
    <div class="controls">
        <button on:click={startAnimation}>Start Animation</button>
        <button on:click={stopAnimation}>Stop Animation</button>
    </div>
    </article>
    <article class="description">
        <p> This is a compound model composed of:</p>
        <ul>
            <li>One primary object (The Cube)</li>
            <li>Two child objects (The Spheres)</li>
            <li>The spheres are positioned relative to the cube using vectors:
                <ul>
                    <li>Sphere 1 is offset by the vector (1, 0, 0) from the cube</li>
                    <li>Sphere 2 is offset by the vector (-1, 0, 0) from the cube</li>
                </ul>
            </li>
            <li>Sphere 1 orbits around the cube while maintaining its relative offset position</li>
            <li>The cube and spheres have basic lighting with ambient and directional light sources</li>
        </ul>
            <p>Controls:</p>
            <ul>
                <li><strong>Start/Stop Animation:</strong> Use the "Start Animation" and "Stop Animation" buttons to control the animation</li>
                <li><strong>Move the Cube:</strong> Use the WASD keys to move the cube:
                    <ul>
                        <li>W: Move up</li>
                        <li>A: Move left</li>
                        <li>S: Move down</li>
                        <li>D: Move right</li>
                    </ul>
                </li>
                <li><strong>Move Sphere 1:</strong> Move the mouse to change the position of Sphere 1 relative to the cube</li>
            </ul>
    </article>
    
</section>
