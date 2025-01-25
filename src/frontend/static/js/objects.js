// objects.js
import * as THREE from 'three';

export function createSun(texture) {
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        emissive: 0xffff00,
        emissiveIntensity: 1.0,
        emissiveMap: texture,
    });
    return new THREE.Mesh(sunGeometry, sunMaterial);
}

export function createEarth(texture) {
    const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        emissive: 0x333333,
        emissiveIntensity: 0.1,
        shininess: 30,
    });
    return new THREE.Mesh(earthGeometry, earthMaterial);
}
