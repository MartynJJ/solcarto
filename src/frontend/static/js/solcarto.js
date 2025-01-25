// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// import { loadTexture } from './textureLoader.js';
// import { createPointLight, createDirectionalLight } from './lights.js';
// import { createSun, createEarth } from './objects.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('solarSystem').appendChild(renderer.domElement);

// Constants
const scaleFactor = 1e-7; // km to scene scale
let time = Date.now() / (1000 * 60 * 60 * 24); // days since epoch

// Utility function to load textures
function loadTexture(path) {
    const texture = new THREE.TextureLoader().load(path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

// Textures
const starFieldTexture = loadTexture('static/img/starField.png');
const sunTexture = loadTexture('static/img/sol.jpg');
const earthTexture = loadTexture('static/img/earth.webp');

// Scene background
starFieldTexture.wrapS = THREE.RepeatWrapping;
starFieldTexture.wrapT = THREE.RepeatWrapping;
starFieldTexture.repeat.set(10, 10); // This will repeat the texture 4 times horizontally and vertically
scene.background = starFieldTexture;

// Sun setup
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshPhongMaterial({
    map: sunTexture,
    emissive: 0xffff00,
    emissiveIntensity: 1.0,
    emissiveMap: sunTexture,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Earth setup
const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    emissive: 0x333333,
    emissiveIntensity: 0.1,
    shininess: 30,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1, 1000, 2);
pointLight.position.set(0, 0, 0); // Sun's position
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Camera position
camera.position.set(30, 30, 30);
camera.lookAt(0, 0, 0);

// Update Earth position
async function updateEarthPosition() {
    try {
        const response = await fetch(`/earth-position/${time}`);
        const position = await response.json();
        earth.position.set(position.x * scaleFactor, 0, position.y * scaleFactor);
    } catch (error) {
        console.error('Failed to fetch Earth position:', error);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    time += 0.2; // Increment time for position updates
    updateEarthPosition();

    sun.rotation.y += 0.01; // Rotate sun
    earth.rotation.y += 0.05; // Rotate earth

    renderer.render(scene, camera);
}

animate();
