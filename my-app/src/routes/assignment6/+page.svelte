<h1>Assignment #6</h1>
<section>
    <code>{Math.round(fps)} FPS</code>
    <article class="graphics">
        <canvas bind:this={canvas}
        width={width} 
        height={height}
        >
    </article>

    <article class="description">
        <p> Load a pre-build 3D model and use an animation </p>
        <ul>
            <li>Read the glTF file and place the object into your scene</li>
            <li>Include some form of user interaction that makes the object run its animation, move around the scene, transform in some way</li>
            <li>Use lighting as usual and some form of camera control</li>
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

<script>
    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;
    let fps = 0;
    const width = 800;
    const height = 600;

    onMount(() => {
        world = new World(canvas);

        world.init();
        world.start();
        world.initControls();

        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
    });
</script>
