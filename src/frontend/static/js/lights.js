// lights.js
import * as THREE from 'three';

export function createPointLight() {
    const pointLight = new THREE.PointLight(0xffffff, 1, 1000, 2);
    pointLight.position.set(0, 0, 0); // Sun's position
    return pointLight;
}

export function createDirectionalLight() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(10, 10, 10);
    return directionalLight;
}
