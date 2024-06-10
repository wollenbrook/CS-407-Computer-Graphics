import { BufferGeometry, OctahedronGeometry, SphereGeometry, IcosahedronGeometry, CylinderGeometry, CapsuleGeometry, ConeGeometry, Mesh, MeshStandardMaterial,MeshPhysicalMaterial, Vector3 } from 'three';
import type { Animateable } from '../Animateable.js';
import { getVertices } from '../util/geometryTools.js';
import { GeometryType } from '../common.js';

class Sphere extends Mesh {
    constructor(radius: number = 1.0) {
        const geometry = new IcosahedronGeometry(radius, 0);// new SphereGeometry(radius, 32, 32);
        const material = new MeshPhysicalMaterial({
            color: '#2f4eca',
            roughness: 0.478,
            metalness: 0.835,
            reflectivity: 0.529,
            iridescence: 0.898,
            iridescenceIOR: 2.18,
            sheen: 0.796,
            sheenRoughness: 0.555,
            sheenColor: '#1a8e1c',
        });
        super(geometry, material);
    }
}

export class Ornament extends Mesh implements Animateable {

    private mainGeometry: BufferGeometry;
    private mainMaterial: MeshStandardMaterial;
    private rotationRate: number = 2*Math.PI / 40;      // radians per second, one revolution every 40 seconds

    constructor(gt : GeometryType = GeometryType.Octahedron) {
        let geometry: BufferGeometry;
        switch (gt)
        {
            case GeometryType.Octahedron:
                geometry = new OctahedronGeometry(7, 0);
                break;
            case GeometryType.Cylinder:
                geometry = new CylinderGeometry(3.5, 3.5, 10, 32,1);
                break;
            case GeometryType.Capsule:
                geometry = new CapsuleGeometry(3.5, 7, 4, 8);
                break;
            case GeometryType.Cone:
                geometry = new ConeGeometry(5, 7, 32,1);
                break;
        }
        const material = new MeshStandardMaterial({
            color: '#ffd700',
            roughness: 0.7,
            metalness: 0.1
        });
        super(geometry, material);
        this.mainGeometry = geometry;
        this.mainMaterial = material;

        this.addSpheres();

        this.rotateX(-Math.PI / 2);
    }

    addSpheres() {
        // First get the vertices of the main geometry
        const vertices: Vector3[] = getVertices(this);
        // Add a new sphere at a location on a line from the origin through the vertex
        // using our parametric equation for a line
        const p0 = new Vector3(0, 0, 0);
        let p2 = new Vector3();
        const t = 1.2;  // distance along the vector from P0 to P1
        vertices.forEach((p1 : Vector3) => {
            const sphere = new Sphere();
            p2.addScaledVector(p0, 1-t).addScaledVector(p1,t);
            sphere.position.copy(p2);
            this.add(sphere);
            p2.set(0,0,0);
        });
    }

    rotateChildrenUD(direction: number) {
        this.children.forEach((child) => {
            child.rotation.x += direction * 0.2;
        });
    }

    rotateChildrenLR(direction: number) {
        this.children.forEach((child) => {
            child.rotation.y += direction * 0.2;
        });
    }

    tick(delta: number) {
        // delta is in seconds, rotation rate is in radians/sec, so we just need radians
        //this.rotation.x += this.rotationRate * delta;
        //this.rotation.y += this.rotationRate * delta;
        this.rotation.z += this.rotationRate * delta;
    }

    setColor(hexValue: string) {
        this.mainMaterial.color.set(hexValue);
    }

    getColor(): string {
       return this.mainMaterial.color.getHexString();
    }

    setWireframe(value: boolean) {
        this.mainMaterial.wireframe = value;
    }
}

