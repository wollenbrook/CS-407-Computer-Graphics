import { Mesh, MeshBasicMaterial, MeshPhongMaterial, BufferAttribute, Color, BufferGeometry, MeshStandardMaterial, Material } from 'three';
import type { Animateable } from '../Animateable.js';

export class Star extends Mesh implements Animateable {

    // Buffer attributes.  Could also commonly have normals and texture coordinates
    private vertices: number[];
    private indices: number[];
    private colors: number[];
    private rotationRate: number = 2 * Math.PI / 40;      // radians per second, one revolution every 40 seconds

    constructor(radius: number = 1.0, innerRadius: number = 0.25, midRadius: number = 0.4, height: number = 0.2) {
        const materialProps = {
            color: 0xffffff,
            flatShading: true,
            vertexColors: true,
            shininess: 0
        };
        super(new BufferGeometry(), new MeshPhongMaterial(materialProps));
        this.vertices = this.generateVertices(radius, innerRadius, midRadius, height);
        this.indices = this.generateIndices();
        this.geometry.setIndex(this.indices);
        const vfa = new Float32Array(this.vertices);
        this.geometry.setAttribute('position', new BufferAttribute(vfa, 3));
        this.colors = this.generateColors();
        const cfa = new Float32Array(this.colors);
        this.geometry.setAttribute('color', new BufferAttribute(cfa, 3));
        //this.geometry.attributes.position.needsUpdate = true;
        //this.geometry.attributes.color.needsUpdate = true;
    }

    generateVertices(r: number, ir: number, midradius: number, h: number) : number[] {
        const mr = midradius / Math.sqrt(2);
        const vertices =  [
            r, 0, 0,    // 0  Front
            0, r, 0,    // 1
            -r, 0, 0,   // 2
            0, -r, 0,   // 3
            ir, 0, h,   // 4
            0, ir, h,   // 5
            -ir, 0, h,  // 6
            0, -ir, h,  // 7
            mr, mr, 0,  // 8
            -mr, mr, 0, // 9
            -mr, -mr, 0,// 10
            mr, -mr, 0, // 11
            ir, 0, -h,   // 12  Back vertices elevated and so not the same as the front
            0, ir, -h,   // 13
            -ir, 0, -h,  // 14
            0, -ir, -h,  // 15
        ];
        return vertices;
    }

    generateIndices() : number[] {
        const indices = [
            0, 8, 4,    // front
            1, 5, 8,
            1, 9, 5,
            2, 6, 9,
            2, 10, 6,
            3, 7, 10,
            3, 11, 7,
            0, 4, 11,
            0, 12, 8,  // back
            1, 8, 13,
            1, 13, 9,
            2, 9, 14,
            2, 14, 10,
            3, 10, 15,
            3, 15, 11,
            0, 11, 12,
            4, 8, 12,  // insides
            5, 13, 8,
            5, 9, 13,
            6, 14, 9,
            6, 10, 14,
            7, 15, 10,
            7, 11, 15,
            4, 12, 11
        ];
        return indices;
    }

    generateColors() : number[] {
        const colors = [
            222, 58, 47,    // 0
            222, 58, 47,    // 1
            222, 58, 47,    // 2
            222, 58, 47,    // 3
            61, 47, 222,    // 4
            61, 47, 222,    // 5
            61, 47, 222,    // 6
            61, 47, 222,    // 7
            58, 222, 47,    // 8
            58, 222, 47,    // 9
            58, 222, 47,    // 10
            58, 222, 47,    // 11
            187, 47, 222,   // 12
            187, 47, 222,   // 13
            187, 47, 222,   // 14
            187, 47, 222,   // 15
        ];
        // Normalize the color values to the range [0, 1]            
        return colors.map((c, i) => c / 255);
    }

    tick(delta: number): void {
        this.rotation.z += this.rotationRate * delta;
    }

    setWireframe(value: boolean) {
        const m = this.material as MeshPhongMaterial;
        m.wireframe = value;
    }
}