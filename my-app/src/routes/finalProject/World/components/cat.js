import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { setupModel } from './setupModel.js';

async function createCat() {
    const loader = new GLTFLoader();
    const data = await loader.loadAsync('/src/lib/models/cat/gatochan.gltf');
  
    const cat = setupModel(data);
    cat.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
        }
    });

    return cat;
}


export { createCat };