import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

async function createCrossBow() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('src/lib/models/stylized_crossbow/stylized_crossbow.gltf');

    return gltf.scene;
}

export { createCrossBow };