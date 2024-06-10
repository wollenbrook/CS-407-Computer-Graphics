import { TorusGeometry, Mesh, MeshStandardMaterial } from 'three';

const spec = {
    color: 'olivedrab',
    roughness: 0.6,
    metalness: 0.2
};

function createTorus() : Mesh {
    const geometry = new TorusGeometry(12,3,16,100);
    const material = new MeshStandardMaterial(spec);
    const torus = new Mesh(geometry, material);
    torus.rotation.set(-0.7, -0.1, 0.8);
    return torus;
}

export { createTorus };