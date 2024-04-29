
<h1>Hierarchical Scene &amp; Transformations with Animation -Morse</h1>
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
        <hr>
        <div class="control-item">
            <ColorPicker 
                bind:hex 
                on:input={updateColor}
                isAlpha={false}
            />
        </div>
        <hr>
        <div>
            {#each geometryTypes as gt}
                <label>
                    <input
                        type="radio"
                        name="geometryType"
                        value={gt}
                        bind:group={chosenGeometryType}
                        on:change={updateGeometryType}
                        />
                    {gt}
                </label>
            {/each}
        </div>
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
        <p>The goal of this assignment is to create a simple scene using a hierarchical scene graph as shown in <a href="https://discoverthreejs.com/book/first-steps/transformations/">Transformations, Coordinate Systems, and the Scene Graph</a> in the Discover three.js book.</p>  Requirements are:
        <ul>
            <li>Construct a compound model composed of a primary object and multiple child objects</li>
            <li>Place those child objects relative to the parent using transformations, at least one of which we create manually using vector or matrix algebra</li>
            <li>Have interactivity that moves both the entire object as well as the children</li>
        </ul>
        <p>For the axes: X (red), Y (green) and Z (blue)</p>
        <p>Keyboard controls: WASD (rotates the child objects about their own local origin)  Only works if the canvas element has focus.  Click it if key press doesn't do anything.</p>
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
    import ColorPicker from 'svelte-awesome-color-picker';
    import { World } from './world/World.js';
    import { GeometryType } from './world/common.js';

    console.log('script executing');

    const width = 800;
    const height = 600;
    let fps = 0;

    let running = true;
    let wireframe = false;

    let geometryTypes = Object.values(GeometryType);
    let chosenGeometryType = geometryTypes[0];

    let ambientLight = true;
    let pointLight = true;
    let hex = '#ffd700';
    let canvas : HTMLCanvasElement;
    let world : World;

    onMount(() => {
        console.log('onMount: building scene');
        canvas.focus();
        world = new World(canvas);
        //hex = world.getColor();  // why doesn't this update?
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();            
        }, 2000);
    });

    function updateGeometryType() {
        world.setGeometryType(chosenGeometryType);
        world.render();
        canvas.focus();
    }

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

    // Update color of the torus
    function updateColor() {
        //console.log('updateColor: hex = ' + hex);
        // For some reason, the first time this is called, hex is missing the leading '#'
        let newColor : string = hex;
        if(newColor.startsWith('#') == false) {
            newColor = '#' + newColor;
        }
        // Also, threejs doesn't take alpha values so truncate to 7 characters
        newColor = hex.substring(0, 7); // still not understanding something as this isn't working, will just disable alpha for now
        world.setColor(newColor);
        world.render();
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
