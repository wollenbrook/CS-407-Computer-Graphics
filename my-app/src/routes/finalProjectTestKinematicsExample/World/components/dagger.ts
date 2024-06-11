import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, Vector3 } from 'three';
import type { Animateable } from '../Animateable.js';
import { Kinematics } from './Kinematics.js';

export class Dagger extends Mesh implements Animateable {
    private kinematics: Kinematics;

    constructor(position: Vector3, direction: Vector3, speed: number) {
        super();
        this.kinematics = new Kinematics(1.0);
        this.kinematics.position.copy(position);
        direction.normalize();
        this.kinematics.velocity.copy(direction.multiplyScalar(speed));
    }

    async loadModel() {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync('stylized_sword.gltf');
        this.geometry = gltf.scene.children[0].geometry;
        this.material = gltf.scene.children[0].material;

        // Compute the bounding sphere of the geometry
        this.geometry.computeBoundingSphere();
    }

    tick(delta: number) {
        this.kinematics.tick(this, delta);
    }

    collidesWith(other: Dagger): boolean {
        const distance = this.position.distanceTo(other.position);
        return distance < 2.0;
    }

    bounceOff(other: Dagger) {
        const normal = other.kinematics.position.clone().sub(this.kinematics.position).normalize();
        const relativeVelocity = this.kinematics.velocity.clone().sub(other.kinematics.velocity);
        const velocityAlongNormal = relativeVelocity.dot(normal);
        this.kinematics.velocity.add(normal.clone().multiplyScalar(-velocityAlongNormal));
        other.kinematics.velocity.add(normal.clone().multiplyScalar(velocityAlongNormal));
    }
}

export async function createDagger(position: Vector3, direction: Vector3, speed: number) {
    const dagger = new Dagger(position, direction, speed);
    try {
        await dagger.loadModel();
        console.log("Model loaded successfully");
    } catch (error) {
        console.error("Error loading model: ", error);
    }
    return dagger;
}