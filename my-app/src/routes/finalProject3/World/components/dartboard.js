import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

async function createDartboard() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('dartboard.gltf');

    return gltf.scene;
}

export { createDartboard };