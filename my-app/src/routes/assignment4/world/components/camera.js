import { PerspectiveCamera } from "three";

function createCamera() {
    const camera = new PerspectiveCamera(
        75, // fov = Field of View
        2,  // aspect ratio
        0.1,// near clipping plane
        100 // far clipping plane
    );
    camera.position.set(3, -10, 30);
    camera.lookAt(0, 0, 0);
    return camera;
}

export { createCamera };