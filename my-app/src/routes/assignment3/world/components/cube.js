import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

const spec = {
    color: 'lightgrey',
    roughness: 0.7,
    metalness: 0.1
};

function createCube() {
    const geometry = new BoxGeometry(3,4,55);
    const material = new MeshStandardMaterial(spec);
    const cube = new Mesh(geometry, material);
    cube.rotation.set(-0.7, -0.1, 0.8);
    cube.position.set(-3, -2, 15);
    return cube;
}

export { createCube };