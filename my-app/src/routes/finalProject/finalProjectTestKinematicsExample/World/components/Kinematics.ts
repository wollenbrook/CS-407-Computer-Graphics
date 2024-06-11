import { Vector3, Mesh } from 'three';

export class Kinematics {

    // We store the position, velocity, and acceleration of an object here
    private position: Vector3;
    private velocity: Vector3;
    private acceleration: Vector3;
    private static readonly GRAVITY = new Vector3(0.0, -9.81, 0.0);
    private static readonly DAMPING = 0.9;
    private static readonly FRICTION = 0.999;

    private boundsRadius: number;

    constructor(boundsRadius: number) {
        this.position = new Vector3();
        this.velocity = new Vector3();
        this.acceleration = Kinematics.GRAVITY.clone();
        this.boundsRadius = boundsRadius;
    }

    /**
     * Simple projectile motion update function for a constant acceleration
     * @param mesh The mesh to update
     * @param delta Time increment, in seconds, since last update
     */
    tick(mesh : Mesh, delta : number) {
        // Update velocity, given acceleration and time delta
        const deltaV = this.acceleration.clone().multiplyScalar(delta);
        this.velocity.add(deltaV);
        this.velocity.multiplyScalar(Kinematics.FRICTION);
        // Now update position, given new velocity and time delta
        const deltaP = this.velocity.clone().multiplyScalar(delta);
        this.position.add(deltaP);

        this.handleWallAndFloorCollisions();

        // Update the mesh's position to match
        mesh.position.copy(this.position);
    }

    /**
     * Reflect the velocity of the object off the floor and walls.  If the new position would take it below the floor,
     * or through a wall, then we need to reflect the velocity and damp it.  These collisions are easy because the 
     * change in velocity happens in only one dimension and that is along one of our coordinate axes.
     */
    handleWallAndFloorCollisions() {
        // Floor
        if (this.position.y < this.boundsRadius) {
            this.position.y = this.boundsRadius;
            this.velocity.y = -this.velocity.y * Kinematics.DAMPING;
        }
        // Now do the same for the walls, at +/- 50 in x and z, but without damping
        if (this.position.x < -50 + this.boundsRadius) {
            this.position.x = -50 + this.boundsRadius;
            this.velocity.x = -this.velocity.x * Kinematics.DAMPING;
        }
        if (this.position.x > 50 - this.boundsRadius) {
            this.position.x = 50 - this.boundsRadius;
            this.velocity.x = -this.velocity.x * Kinematics.DAMPING;
        }
        if (this.position.z < -50 + this.boundsRadius) {
            this.position.z = -50 + this.boundsRadius;
            this.velocity.z = -this.velocity.z * Kinematics.DAMPING;
        }
        if (this.position.z > 50 - this.boundsRadius) {
            this.position.z = 50 - this.boundsRadius;
            this.velocity.z = -this.velocity.z * Kinematics.DAMPING;
        }
    }
}