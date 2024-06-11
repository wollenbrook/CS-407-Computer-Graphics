import { Mesh, PlaneGeometry, MeshPhysicalMaterial, DoubleSide, TextureLoader, GridHelper } from 'three';

export class Ground extends Mesh {
    constructor(zheight: number = 0) {
        const texture = new TextureLoader().load('grass.jpg');
        const material = new MeshPhysicalMaterial({ map: texture, side: DoubleSide });
        const geometry = new PlaneGeometry(500, 1000);
        super(geometry, material);

        const gridGeometry = new GridHelper(500, 100, 0x444444, 0x444444);
        gridGeometry.rotateX(Math.PI / 2);
        this.add(gridGeometry);

        this.rotation.x = - Math.PI / 2;
        this.position.y = zheight;
        this.receiveShadow = true;
        this.castShadow = true;
    }
}

export function createGround(zheight: number = 0) {
    return new Ground(zheight);
}