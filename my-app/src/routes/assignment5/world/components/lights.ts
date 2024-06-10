import { DirectionalLight, AmbientLight, PointLight, Light } from "three";

// TODO: this really needs re-working.  Returning an array of lights without any notion of
// which index is which light is not a good solution.  Maybe make this a class called "LightManager"
// and go through it to manage lights

function createLights() : Light[] {
    const directionalLight = new DirectionalLight('white', 8);
    directionalLight.position.set(500, 50, 50);
    const ambientLight = new AmbientLight('lightskyblue', 0.5);
    const pointLight = new PointLight('#FF3322', 60);
    pointLight.position.set(-5, -5, 3);
    return [directionalLight, ambientLight, pointLight];
}

export { createLights };