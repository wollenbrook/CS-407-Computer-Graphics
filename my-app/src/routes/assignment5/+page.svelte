
<h1>Assignment #5</h1>
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
        <p>Create your own object using an indexed buffer geometry.</p>
        <ul>
            <li>Design and implement a simple 3D model: Tetrakis Hexahedron.</li>
            <li>Include an animation that rotates the object over time.</li>
            <li>Use per-vertex colors to make the object visually interesting.</li>
            <li>Utilize appropriate lighting and camera control to enhance the visual experience.</li>
        </ul>
        <p>Controls:</p>
        <ul>
            <li><strong>Cursor & Scroll Wheel:</strong> Control movement and rotation of the camera.</li>
        </ul>
        <button type="button" on:click={animateHandler}>
            {@html running ? 'Stop&nbsp;' : 'Start'} Animation
        </button>
        <button type="button" on:click={wireframeHandler}>
            {@html wireframe ? 'Hide&nbsp;' : 'Show'} Wireframe
        </button>
        <hr>
        <label>
            <input type="checkbox" bind:checked={ambientLight} on:change={updateLighting} />
            Ambient
        </label>
        <label>
            <input type="checkbox" bind:checked={pointLight} on:change={updateLighting} />
            Point
        </label>
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
    
    console.log('script executing');

    const width = 800;
    const height = 600;
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
        //world.onKeyDown(event);
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
