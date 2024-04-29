
<h1>Assignment #2</h1>
<section>
    <article class="graphics">
        <canvas
            bind:this={canvas}
            width={width} 
            height={height}
        />
    </article>
    <article class="description">
        <p>A simple displayed WebGL 3D graphics in a web application:</p>
        <ul>
            <li>Using a hexagonal prism</li>
            <li>Able to show wireframe and solid forms via button controls</li>
            <li>Able to control the animation via button controls</li>
        </ul>
         <button type="button" on:click={animateHandler}>
            {@html running ? 'Stop&nbsp;' : 'Start'} Animation
        </button>
        <button type="button" on:click={wireframeHandler}>
            {@html wireframe ? 'Hide&nbsp;' : 'Show'} Wireframe
        </button>
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
    import * as THREE from 'three';
    import { onMount } from 'svelte';

    console.log('script executing');

    const width = 800;
    const height = 600;

    let running = false;
    let wireframe = false;
    let canvas;
    let drawFrame = () => {};
    let animate = () => {};

    // Animate button click event handler
    function animateHandler() {
        running = !running;
        if(running)
        {
            animate();
        }
    }

    // Wireframe button click event handler
    function wireframeHandler() {
        wireframe = !wireframe;
        drawFrame();
    }

    onMount(() => {
        console.log('onMount: building scene');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('rgb(210, 222, 233)');

        const camera = new THREE.PerspectiveCamera( 35, width / height, 0.1, 100 );
        camera.position.z = 10;

        const geometry = new THREE.CylinderGeometry(1, 1, 2, 6);
        const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
        material.wireframe = false;
        const prism = new THREE.Mesh( geometry, material );
        scene.add( prism );

        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas});
        renderer.setSize( width, height );
        renderer.setPixelRatio( window.devicePixelRatio);

        // Do anything we need to do before rendering a single frame
        drawFrame = () => {
            material.wireframe = wireframe;
            renderer.render( scene, camera );
        }

        animate = () => {
            if (running)
            {
                requestAnimationFrame( animate );
            }
            else
            {
                renderer.render( scene, camera );
                return;
            }
            
            prism.rotation.x += 0.01;
            prism.rotation.y += 0.01;

            drawFrame();
        }
        animate();
    });

</script>

