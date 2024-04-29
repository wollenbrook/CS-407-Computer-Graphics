import { ConeGeometry, Mesh, MeshStandardMaterial, BackSide, PointLight } from 'three';

const spec = {
    color: 'brown',
    roughness: 0.6,
    metalness: 0.2,
    side: BackSide  // make the material apply to the inside of the cone
};

function createCone() {
    const geometry = new ConeGeometry(8, 16, 16);
    const material = new MeshStandardMaterial(spec);
    const cone = new Mesh(geometry, material);
    // Adjust rotation to make the pyramid face upwards
    cone.rotation.set(Math.PI, 1.5, 0);

    return cone;
}

export { createCone };