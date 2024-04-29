import { Mesh, BufferAttribute, Vector3 } from 'three';

/**
 * Get all the distinct vertices of a mesh.  I encountered two problems when implementing this.
 * 1) The position attribute did not contain all vertices and it had an extra entry.  I'm not sure what
 * was going on. 2) After that didn't work I used the raw array to grab the vertices.  That worked fine
 * but when using one of the built-in geometries (e.g. OctahedronGeometry) the vertices were not distinct.
 * I suspect this was because of the subdivision step used by PolyhedronGeometry but I haven't confirmed that.
 * Anyway, I simply use a map to ensure that the vertices are distinct. (BTW: JS has a Set data structure but
 * it uses === for equality which doesn't work for objects that are identical but not the same object.  Thus a Map
 * was used where the comparison happens on the key value, which I made a string.)
 * @param mesh 
 * @returns An array of distinct vertices
 */
export function getVertices(mesh : Mesh) : Vector3[] {
    const position: BufferAttribute = mesh.geometry.getAttribute('position') as BufferAttribute;
    
    let map = new Map<string,Vector3>();
    let arr = position.array;
    for (let i = 0; i < arr.length; i += 3) {
        const v = new Vector3(arr[i], arr[i+1], arr[i+2]);
        map.set(`${v.x},${v.y},${v.z}`,v);
    }

    return [...map.values()];
}