import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function cameraOrbit(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;
    controls.target.set(0, 0, 10);

    controls.tick = () => controls.update();

    return controls;
}

export { cameraOrbit };
