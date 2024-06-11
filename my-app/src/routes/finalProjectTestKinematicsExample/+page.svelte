<h1>Final Project: Dart Crossbow Archery (using Kinematics)</h1>
<section>
    <article class="graphics">
        <code>{Math.round(fps)} FPS</code>
            <canvas
            bind:this={canvas}
            tabindex="0"
            on:keydown={onKeyDown}
            width={width} 
            height={height}
        />
    </article>

    <article class="description">
        <p> This project involves a 3D simulation of a dart game. It includes a pre-built 3D model of a crossbow, dagger, and a dartboard. </p>
    <ul>
        <li>The glTF files for the dagger and dartboard are read and the objects are placed into the scene.</li>
        <li>User interaction triggers the dagger to move towards the dartboard, simulating the action of throwing a dart.</li>
        <li>The scene is illuminated with directional lighting and the camera can be controlled to view the scene from different angles.</li>
    </ul>
    <p>Controls:</p>
    <ul>
        <li><strong>F Key:</strong> Shoots the dagger towards the dartboard.</li>
        <li><strong>Cursor & Scroll Wheel:</strong> Control movement and rotation of the camera.</li>
    </ul>
    </article>

</section>
    
<style>
    section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    article {
        flex: 200px;
        margin: 20px;
    }

    .control-item {
        margin-top: 10px;
    }

    .graphics {
        flex: 4;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
    }

    .description {
        flex: 2 200px;
    }

</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import { World } from './world/World.js';

    const width = 1024;
    const height = 768;
    let fps = 0;

    let running = true;
    let wireframe = false;

    let ambientLight = true;
    let pointLight = true;
    let hex = '#ffd700';
    let canvas : HTMLCanvasElement;
    let world : World;

    onMount(() => {
        console.log('onMount: building scene');
        canvas.focus();
        world = new World(canvas);
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();            
        }, 2000);
    });

    function onKeyDown(event: KeyboardEvent) {
        world.onKeyDown(event);
    }

    // Update our lighting based on the checkboxes
    function updateLighting() {
        world.setAmbientLight(ambientLight);
        world.setPointLight(pointLight);
        world.render(); // don't assume it's animating and rendering
        canvas.focus();
    }

    // Animate button click event handler
    function animateHandler() {
        running ? world.stop() : world.start();
        running = !running;
        canvas.focus();
    }

    // Wireframe button click event handler
    function wireframeHandler() {
        wireframe = !wireframe;
        world.setWireframe(wireframe);
        world.render();
        canvas.focus();
    }
</script>
