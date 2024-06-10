import { DirectionalLight, PointLight } from 'three';

function createDirectionalLight() {
  // Create a directional light
  const light = new DirectionalLight('white', 8);

  // move the light right, up, and towards us
  light.position.set(20, 20, 20);

  return light;
}

function createPointLight() {
  // Create a point light
  const light = new PointLight("#FFA07A", 4, 0, 0.2);
  light.castShadow = true;

  return light;
}

export { createDirectionalLight, createPointLight };
