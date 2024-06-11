import { Color, Scene, TextureLoader } from 'three';

function createScene() {
  const scene = new Scene();

  const skyTexture = new TextureLoader().load('sunset.png');

  scene.background = skyTexture;

  return scene;
}

export { createScene };