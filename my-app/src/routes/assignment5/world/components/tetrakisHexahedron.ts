import { Mesh, MeshPhongMaterial, BufferAttribute, BufferGeometry, Float32BufferAttribute, DoubleSide } from 'three';
import type { Animateable } from '../Animateable.js';

export class tetrakisHexahedron extends Mesh implements Animateable {

    private vertices: number[];
    private indices: number[];
    private colors: number[];
    private rotationRate: number = 2 * Math.PI / 40; // radians per second, one revolution every 40 seconds

    constructor() {
        const materialProps = {
            color: 0xffffff,
            flatShading: true,
            vertexColors: true,
            shininess: 0,
            side: DoubleSide // Ensure the material is double-sided
        };
        super(new BufferGeometry(), new MeshPhongMaterial(materialProps));
        this.vertices = this.generateVertices();
        this.indices = this.generateIndices();
        this.geometry.setIndex(this.indices);
        const vfa = new Float32Array(this.vertices);
        this.geometry.setAttribute('position', new BufferAttribute(vfa, 3));
        this.colors = this.generateColors();
        const cfa = new Float32Array(this.colors);
        this.geometry.setAttribute('color', new BufferAttribute(cfa, 3));
    }

    generateVertices(): number[] {
        return [
            // Cube vertices
            1, 1, 1,   -1, 1, 1,   -1, -1, 1,   1, -1, 1,   // front face
            1, 1, -1,  -1, 1, -1,  -1, -1, -1,  1, -1, -1,  // back face

            // Midpoints of faces (adding a pyramid on each face)
            0, 0, 1.5,    // front face center
            0, 0, -1.5,   // back face center
            1.5, 0, 0,    // right face center
            -1.5, 0, 0,   // left face center
            0, 1.5, 0,    // top face center
            0, -1.5, 0    // bottom face center
        ];
    }

    generateIndices(): number[] {
        return [
            // Front face
            0, 1, 8,   1, 2, 8,   2, 3, 8,   3, 0, 8,
            // Back face
            4, 5, 9,   5, 6, 9,   6, 7, 9,   7, 4, 9,
            // Right face
            0, 4, 10,  4, 7, 10,  7, 3, 10,  3, 0, 10,
            // Left face
            1, 5, 11,  5, 6, 11,  6, 2, 11,  2, 1, 11,
            // Top face
            0, 1, 12,  1, 5, 12,  5, 4, 12,  4, 0, 12,
            // Bottom face
            2, 3, 13,  3, 7, 13,  7, 6, 13,  6, 2, 13
        ];
    }

    generateColors(): number[] {
        const colors = [
            // Brighter colors for vertices
            1, 0, 0,   0, 1, 0,   0, 0, 1,   1, 1, 0,   // Cube vertices colors
            1, 0, 1,   0, 1, 1,   1, 0.5, 0.5,  1, 1, 1, // More cube vertices colors
            1, 0.5, 0,  0.5, 0, 1,  0, 1, 0.5,  0.5, 1, 0, // Pyramid vertices colors
            0, 1, 0.5,  0.5, 0, 1
        ];
        return colors; // Colors are already in the range [0, 1]
    }


    tick(delta: number): void {
        this.rotation.z += this.rotationRate * delta;
    }

    setWireframe(value: boolean) {
        const m = this.material as MeshPhongMaterial;
        m.wireframe = value;
    }
}
