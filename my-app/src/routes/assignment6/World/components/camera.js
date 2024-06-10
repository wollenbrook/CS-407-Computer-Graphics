import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    40, // fov = Field Of View
    1, // aspect ratio
    0.1, // near clipping plane
    100, // far clipping plane
  );


  return camera;
}

export { createCamera };