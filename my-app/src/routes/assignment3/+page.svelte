
<h1>Assignment #3</h1>
<section>
    <article class="graphics">
        <canvas
            bind:this={canvas}
            width={width} 
            height={height}
        />
    </article>
    <article class="description">
        <p> 2 different geometry objects in a scene, with each having a different material</p>
        <ul>
            <li>Using 2+ lights of different types in different locations</li>
            <li>Using physically based lighting and rendering</li>
            <li>Able to change lighting effects via checkbox's lighting effect</li>
        </ul>
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

<script>
    import { onMount } from 'svelte';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { World } from './world/World.js';

    const width = 800;
    const height = 600;

    let ambientLight = true;
    let pointLight = true;
    let hex = 'brown';
    let wireframe = false;
    let canvas;
    let world;

    
    function updateLighting() {
        world.setAmbientLight(ambientLight);
        world.setPointLight(pointLight);
        world.render();
    }

    
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
