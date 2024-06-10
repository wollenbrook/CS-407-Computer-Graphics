import { Color, Scene, TextureLoader } from 'three';
import Sky from '/src/lib/images/sunset.png';

function createScene() {
  const scene = new Scene();

  const skyTexture = new TextureLoader().load(Sky);

  scene.background = skyTexture;

  return scene;
}

export { createScene };