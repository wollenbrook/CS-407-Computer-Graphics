// src/lib/Scene.js
import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();

    // Create primary object (Cube)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // Create child objects (Spheres)
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Position child objects relative to the parent (Cube)
    const offset1 = new THREE.Vector3(1, 0, 0);
    const offset2 = new THREE.Vector3(-1, 0, 0);
    sphere1.position.copy(offset1);
    sphere2.position.copy(offset2);

    // Add child objects to the parent
    cube.add(sphere1);
    cube.add(sphere2);

    // Add cube to the scene
    scene.add(cube);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    return { scene, cube, sphere1, sphere2 };
}

export function animateObjects(cube, sphere1) {
    let rotationSpeed = 0.01;
    let orbitSpeed = 0.01;

    function update() {
        requestAnimationFrame(update);

        // Rotate the cube
        cube.rotation.x += rotationSpeed;
        cube.rotation.y += rotationSpeed;

        // Orbit sphere1 around the cube
        const angle = orbitSpeed * Date.now() * 0.001;
        sphere1.position.x = Math.cos(angle) * 1;
        sphere1.position.z = Math.sin(angle) * 1;

        sphere1.updateMatrixWorld();
    }
    update();

    return {
        setRotationSpeed: (speed) => { rotationSpeed = speed; },
        setOrbitSpeed: (speed) => { orbitSpeed = speed; }
    };
}

export function addInteractions(cube, sphere1) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'w' || event.key === 'W') {
            cube.position.y += 0.1;
        } else if (event.key === 's' || event.key === 'S') {
            cube.position.y -= 0.1;
        } else if (event.key === 'a' || event.key === 'A') {
            cube.position.x -= 0.1;
        } else if (event.key === 'd' || event.key === 'D') {
            cube.position.x += 0.1;
        }
    });

    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        sphere1.position.x = mouseX * 2;
        sphere1.position.y = mouseY * 2;
    });
}

export function toggleWireframe(cube) {
    cube.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.material.wireframe = !child.material.wireframe;
        }
    });
}

