import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

async function createDagger() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('src/lib/models/stylized_sword/stylized_sword.gltf');

    return gltf.scene;
}

export { createDagger };