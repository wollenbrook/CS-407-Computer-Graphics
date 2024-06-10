import { Color, Scene } from 'three';

function createScene() : Scene {
    const scene = new Scene();
    scene.background = new Color('#535050');
    return scene;
}

export { createScene };