import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

async function createDagger() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('stylized_sword.gltf');

    return gltf.scene;
}

export { createDagger };