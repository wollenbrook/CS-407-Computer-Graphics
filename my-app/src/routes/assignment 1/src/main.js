import {
  BoxGeometry,
  Color,
  DirectionalLight,
  PlaneGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  CubeTextureLoader,
  WebGLRenderer,
} from '../node_modules/three/build/three.module.js';

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new Scene();

// Load the sky.jpg texture and set it as the scene background
scene.background = new Color('skyblue');

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// Move the camera back and up
camera.position.set(3, 3, 21);

// Create a directional light
const light = new DirectionalLight(0xFFFFFF, 1);
light.intensity = 0.75;
// Position the light to the north-west
light.position.set(-5, 5, 5);
light.castShadow = true;
light.target.position.set(0, 0, 0);
scene.add(light);

// create a geometry
const geometry = new BoxGeometry(2, 2, 2);

// create a Standard material that responds to lighting
const material = new MeshStandardMaterial({ color: 0xFF7F7F });

// Create a mesh with the geometry and material
const cube = new Mesh(geometry, material);

// Enable shadows for the cube
cube.castShadow = true;
cube.receiveShadow = true;

// Add the cube to the scene
scene.add(cube);

// Create a large plane geometry
const groundGeometry = new PlaneGeometry(100, 100);

// Create a material with the same color as the background
const groundMaterial = new MeshStandardMaterial({ color: 'skyblue' });

// Create a mesh with the geometry and material
const ground = new Mesh(groundGeometry, groundMaterial);

// Rotate the ground to be horizontal
ground.rotation.x = -Math.PI / 2;

// Move the ground down
ground.position.y = -1;

// Enable shadows for the ground
ground.receiveShadow = true;

// Add the ground to the scene
scene.add(ground);

// create the renderer
const renderer = new WebGLRenderer();

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.render(scene, camera);
