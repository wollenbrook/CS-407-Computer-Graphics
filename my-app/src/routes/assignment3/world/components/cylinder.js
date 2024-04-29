import { CylinderGeometry, Mesh, MeshStandardMaterial, BackSide } from 'three';

const spec = {
    color: 'lightgrey',
    roughness: 0.7,
    metalness: 0.1,
    side: BackSide  // make the material apply to the inside of the cylinde
};

function createCylinder() {
    const geometry = new CylinderGeometry(0.2, 0.2, 15, 32);
    const material = new MeshStandardMaterial(spec);
    const cylinder = new Mesh(geometry, material);
    // Adjust rotation and position to make the cylinder look like a straw coming out of the cone
    cylinder.rotation.set(Math.PI / 4, 0, Math.PI / 6);
    cylinder.position.set(-3, -2, 15);
    return cylinder;
}

export { createCylinder };