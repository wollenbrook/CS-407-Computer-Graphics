
<h1>Shaders:</h1>
<div class="editor-container">
    <label for="vertexShader" class="centered-label">Vertex Shader</label>
    <!-- <textarea id="vertexShader" class="centered-textarea" bind:value={vertexShaderText} rows="10" cols="100"></textarea> -->
    <CodeMirror
        bind:value={vertexShaderText}
        lang={cpp()}
        styles={{
            "&": {
                maxWidth: "100%",
            },}}
        theme={oneDark} />
</div>
<div class="editor-container">
    <label for="fragmentShader" class="centered-label">Fragment Shader</label>
    <!-- <textarea id="fragmentShader" class="centered-textarea" bind:value={fragmentShaderText} rows="10" cols="100"></textarea> -->
    <CodeMirror
        bind:value={fragmentShaderText}
        lang={cpp()}
        styles={{
            "&": {
                maxWidth: "100%",
            }}}
        theme={oneDark} />
</div>

<section>
    <article>
        <button type="button" on:click={compileShaders}>Compile and Use Shaders</button>
        <button type="button" on:click={showShaderPrograms}>Show Full Shader Programs Text</button>
    </article>
</section>
<Modal bind:showModal>
    <h2 slot="header">Full text of shader programs</h2>
    <Highlight language={glsl} code={shaderProgramsText} />
</Modal>
<section>
    <article class="controls">
        <p>Controls</p>
        <button type="button" on:click={wireframeHandler}>
            {@html wireframe ? 'Hide&nbsp;' : 'Show'} Wireframe
        </button>
        <p>Uniforms</p>
        <div class="control-item">
            <ColorPicker 
                bind:hex 
                on:input={updateColor}
                isAlpha={false}
            />
        <label>
            <input type="range" bind:value={x} on:input={updateX} min="-50" max="50" step="0.1" />
            X: {x}
        </label>
        <label>
            <input type="range" bind:value={y} on:input={updateY} min="-50" max="50" step="0.1" />
            Y: {y}
        </label>
        <label>
            <input type="range" bind:value={z} on:input={updateZ} min="-50" max="50" step="0.1" />
            Z: {z}
        </label>
        </div>
    </article>
    <article class="graphics">
        <code>{Math.round(fps)} FPS</code>
            <canvas
            bind:this={canvas}
            tabindex="0"
            width={width} 
            height={height}
        />
    </article>
    <article class="description">
        <p>The goal of this assignment is to do something cool with shaders.</p>  <p>Requirements are:</p>
        <ul>
            <li>Write your own shaders to do something interesting.  Feel free to find some inspiration online, but you'll need to build a big part of it yourself.  Remember to attribute where you got the idea from, if that's what you did.</li>
            <li>Include interaction of some kind that sends uniforms or attributes to your custom shader.</li>
            <li>Include more than one object in your scene, but only have your shaders applied to one of those objects.  This will enable you to see how different "materials" (and thus shaders) are used for different objects.</li>
        </ul>
        <p>The example/code shown here is for use in class to demonstrate different shader code, not as an example of a finished assignment.  See the file <code>Shader_example.md</code> for example code to try out.</p>
    </article>
</section>
<div>
    <p> this example is from <a herf="https://cs-407-s24-morse.vercel.app/assignment7">cs-407-s24-morse</a> this assignment wasn't completed</p>
    <p>Built-in uniforms and attributes: <a href="https://threejs.org/docs/index.html#api/en/renderers/webgl/WebGLProgram">WebGLProgram</a></p>
</div>
<style>
    section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: center;
        align-items: center;
    }

    .editor-container {
        text-align: left;
    }

    .centered-label {
        display: block;
        margin-bottom: 10px;
        font-size: 1.2em;
    }

    .centered-textarea {
        width: 100%;
        max-width: 800px;
        height: 150px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
        box-sizing: border-box;
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

<svelte:head>
    {@html github}
</svelte:head>

<script lang="ts">
    import { onMount } from 'svelte';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { World } from './world/World.js';
    import Highlight from 'svelte-highlight';
    import glsl from 'svelte-highlight/languages/glsl';
    import github from 'svelte-highlight/styles/github';
    import Modal from './Modal.svelte';
    import CodeMirror from 'svelte-codemirror-editor';
    import { cpp } from '@codemirror/lang-cpp';
    import { oneDark } from '@codemirror/theme-one-dark';

    let showModal = false;
    let shaderProgramsText = '';

    const width = 800;
    const height = 600;
    let fps = 0;


    let vertexShaderText = `
uniform float uTime;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;

void main() {
    vec3 transformed = position;

    float wave = sin(transformed.x * uWaveFrequency + uTime) * uWaveAmplitude;
    transformed.z += wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

    let fragmentShaderText = `
uniform vec3 uColor;
void main() {
    vec3 color = uColor * (gl_FragCoord.y / 600.0);
    gl_FragColor = vec4(color, 1.0);
}
`;

    let x = 0;
    let y = 0;
    let z = 0;

    let wireframe = false;

    let hex = '#ff0000';
    let canvas : HTMLCanvasElement;
    let world : World;

    onMount(() => {
        canvas.focus();
        world = new World(canvas);
        world.start();
        setInterval(() => {
            fps = world.getFrameRate();            
        }, 2000);
    });

    function compileShaders() {
        world.updateShaders(vertexShaderText, fragmentShaderText);
    }

    function showShaderPrograms() {
        shaderProgramsText = world.getFullShaderProgramsText();
        showModal = true;
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

    function updateX() {
        world.setX(x);
        world.render();
    }

    function updateY() {
        world.setY(y);
        world.render();
    }

    function updateZ() {
        world.setZ(z);
        world.render();
    }

    // Wireframe button click event handler
    function wireframeHandler() {
        wireframe = !wireframe;
        world.setWireframe(wireframe);
        world.render();
        canvas.focus();
    }

</script>
