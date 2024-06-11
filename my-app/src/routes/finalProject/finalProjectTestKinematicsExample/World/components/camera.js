import { PerspectiveCamera } from 'three';

function createCamera() {
    const fov = 40; // fov = Field Of View
    const aspect = 1; // aspect ratio
    const near = 0.1; // near clipping plane
    const far = 1000; // far clipping plane

  const camera = new PerspectiveCamera(fov, aspect, near, far);

  return camera;
}

export { createCamera };