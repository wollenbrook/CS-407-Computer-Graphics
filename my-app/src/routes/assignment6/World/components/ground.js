import { PlaneGeometry, MeshPhysicalMaterial, Mesh, DoubleSide, TextureLoader } from "three";

function createGround() {

    const geometry = new PlaneGeometry(80, 2000);
    const texture = new TextureLoader().load('/src/lib/images/grass.jpg');
    const material = new MeshPhysicalMaterial({ map: texture });
    material.side = DoubleSide;
    const ground = new Mesh(geometry, material);
    ground.rotation.x = - Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    ground.castShadow = true;
    
    return ground;

}


export { createGround };