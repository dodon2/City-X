import * as THREE from 'three';

export class AudioSystem {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.sounds = new Map();
    }

    loadSound(name, url) {
        // Placeholder for loading sound
        console.log(`Loading sound: ${name} from ${url}`);
    }

    playAmbient() {
        // Placeholder for ambient loop
        console.log('Playing ambient city sounds');
    }
}
