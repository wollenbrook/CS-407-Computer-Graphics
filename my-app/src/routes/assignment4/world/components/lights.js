import { DirectionalLight, AmbientLight, PointLight } from "three";

let directionalLight;
let pointLight;
let ambientLight;

function createLights() {
    directionalLight = new DirectionalLight('white', 8);
    directionalLight.position.set(100, 50, 50);
    ambientLight = new AmbientLight('lightskyblue', 0.5);
    pointLight = new PointLight('#FF3322', 60);
    pointLight.position.set(0, 0, 0);
    return [directionalLight, ambientLight, pointLight];
}

export { createLights };