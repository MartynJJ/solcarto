
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('solarSystem').appendChild(renderer.domElement);
// Load texture
const textureLoader = new THREE.TextureLoader();

const starFieldTexture = textureLoader.load('static/img/starField.jpg', function (texture) {

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
});
scene.background = starFieldTexture;
const sunTexture = textureLoader.load('static/img/sol.jpg', function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
});
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshPhongMaterial({
    map: sunTexture, // Texture for the sun's surface
    emissive: 0xffff00, // Emissive color (yellow to simulate glowing)
    emissiveIntensity: 1.0, // Intensity of the glow
    emissiveMap: sunTexture 
    // You can adjust these properties as needed
});
// const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture, emissive: 0xffffff});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x6eb8d4,
    specular: 0x111111,
    shininess: 30
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

// Scale down the orbit for visualization
const scaleFactor = 1e-7; // km to scene scale
scene.add(earth);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(0, -0, 1);
// scene.add(directionalLight);
const light = new THREE.PointLight(0xffffff, 0.5, 1000,2);
light.position.set(0, 0, 0); // Position the light at the sun's position
scene.add(light);
camera.position.z = 30;
camera.position.y = 10;
camera.lookAt(new THREE.Vector3(0, 0, 0));

renderer.getContext().getExtension('OES_texture_float_linear');
// Get current time in days
var time = Date.now() / (1000 * 60 * 60 * 24); // days since epoch
function animate() {
    requestAnimationFrame(animate);
    


    time = time + 0.2
    fetch(`/earth-position/${time}`)
        .then(response => response.json())
        .then(position => {
            earth.position.set(position.x * scaleFactor, 0, position.y * scaleFactor);

        });
    sun.rotation.y += 0.01;
    renderer.render(scene, camera);


}


animate();