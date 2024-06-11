<h1>Final Project: Dart Crossbow Archery</h1>
<section>
    <code>{Math.round(fps)} FPS</code>
    <article class="graphics">
        <canvas bind:this={canvas}
        width={width} 
        height={height}
        >
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

<script>
    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;
    let fps = 0;
    const width = 1920;
    const height = 1080;

    onMount(() => {
        world = new World(canvas);

        world.init();
        world.start();

        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
    });
</script>
