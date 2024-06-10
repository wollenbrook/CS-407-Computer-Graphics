// src/lib/World.js
import * as THREE from 'three';

export function createWorld(container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Set background color to white
    renderer.setClearColor(0xffffff, 1);

    camera.position.z = 5;

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { scene, camera, renderer };
}

export function animate(renderer, scene, camera) {
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
}



