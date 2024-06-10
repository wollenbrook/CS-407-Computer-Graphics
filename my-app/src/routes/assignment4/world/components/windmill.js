import * as THREE from 'three';

class Windmill {
    #group;
    #turbines;

    constructor() {
        this.#group = new THREE.Group();

        // Create the main body of the windmill
        const bodyGeometry = new THREE.CylinderGeometry(1, 1, 5, 32);
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.#group.add(body);

        // Create the turbines
        this.#turbines = new THREE.Group();
        for (let i = 0; i < 2; i++) {
            const turbineGeometry = new THREE.BoxGeometry(0.2, 2, 0.1);
            const turbineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const turbine = new THREE.Mesh(turbineGeometry, turbineMaterial);
            turbine.position.y = 2.5;
            turbine.position.x = i === 0 ? -1 : 1;
            this.#turbines.add(turbine);
        }
        this.#group.add(this.#turbines);
    }

    get object3D() {
        return this.#group;
    }

    animate() {
        // Rotate the turbines
        this.#turbines.rotation.z += 0.01;
    }
}

export { Windmill };