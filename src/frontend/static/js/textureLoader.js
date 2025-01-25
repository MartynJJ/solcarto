// textureLoader.js
// import * as THREE from 'three';

export function loadTexture(path) {
    const texture = new THREE.TextureLoader().load(path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}
