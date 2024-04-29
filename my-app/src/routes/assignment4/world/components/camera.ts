import { PerspectiveCamera } from "three";

function createCamera() : PerspectiveCamera {
    const camera = new PerspectiveCamera(
        65, // fov = Field of View
        2,  // aspect ratio
        0.1,// near clipping plane
        100 // far clipping plane
    );
    camera.position.set(4, 4, 20);
    camera.lookAt(0, 0, 0);
    return camera;
}

export { createCamera };