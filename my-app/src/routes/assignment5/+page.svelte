
<h1>Custom Geometry with Per-Vertex Colors &amp; Camera Controls</h1>
<section>
    <article class="controls">
        <p>Controls</p>
        
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
        <p>The goal of this assignment is to learn how geometries are organized, represented and delivered to OpenGL and the graphics card.</p>  <p>Requirements are:</p>
        <ul>
            <li>Construct a custom geometry object manually by specifying vertices and faces in an indexed buffer geometry.</li>
            <li>Use per-vertex colors so we can pass custom attribute data to the vertex shader</li>
            <li>Implement orbit and optionally camera navigation through the scene</li>
        </ul>
        <p>Use the mouse to orbit and pan the camera: left mouse click (hold down) or single finger swipe to orbit, right mouse click (hold down), arrow keys, or two-finger swipe to pan; zoom with the scroll wheel or pinch gesture.</p>
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

    .controls {
        flex: 1;
        display: inline-block;
        margin-bottom: 20px;
    }

    .controls p {
        border-bottom: 2px solid #8c8e94;
        text-align: center;
        text-transform: uppercase;
    }

    .controls button {
        margin-top: 10px;
    }

    .controls label {
        display: block;
        margin-top: 10px;
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

    button {
        background: steelblue;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
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
