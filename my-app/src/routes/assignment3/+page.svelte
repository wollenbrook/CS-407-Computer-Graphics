
<h1>Hello World App &amp; Lighting -Morse</h1>
<section>
    <article class="controls">
        <p>Enable lights</p>
        <label>
            <input type="checkbox" bind:checked={ambientLight} on:change={updateLighting} />
            Ambient
        </label>
        <label>
            <input type="checkbox" bind:checked={pointLight} on:change={updateLighting} />
            Point
        </label>
        <div class="control-item">
            <ColorPicker 
                bind:hex 
                on:input={updateColor}
            />
        </div>
        
    </article>
    <article class="graphics">
        <canvas
            bind:this={canvas}
            width={width} 
            height={height}
        />
    </article>
    <article class="description">
        <p>The goal of this assignment is to use the World App architecture from <a href="https://discoverthreejs.com/book/first-steps/world-app/">Discover three.js</a> book to:</p>
        <ul>
            <li>Wrap the three.js scene in a World class that hides its implementation</li>
            <li>refactor the design into separate modules for the scene, camera, objects, renderer, lights, ...</li>
            <li>and that does a little more than the last assignment, in terms of objects and specifically a lighting effect</li>
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

    .controls {
        flex: 1;
        display: inline-block;
        margin-bottom: 20px;
    }

    .controls p {
        border-bottom: 2px solid #8c8e94;
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

<script>
    import { onMount } from 'svelte';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { World } from './world/World.js';

    console.log('script executing');

    const width = 800;
    const height = 600;

    let ambientLight = true;
    let pointLight = true;
    let hex = '#6b8e23';
    let wireframe = false;
    let canvas;
    let world;

    // Update our lighting based on the checkboxes
    function updateLighting() {
        world.setAmbientLight(ambientLight);
        world.setPointLight(pointLight);
        world.render();
    }

    // Update color of the torus
    function updateColor() {
        world.setColor(hex);
        world.render();
    }

    onMount(() => {
        console.log('onMount: building scene');
        world = new World(canvas);
        world.render();
    });
</script>
