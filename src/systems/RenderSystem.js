import * as THREE from 'three';
import { COLORS } from '../utils/Constants.js';

export class RenderSystem {
    constructor(container) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(COLORS.SKY);
        this.scene.fog = new THREE.FogExp2(COLORS.FOG, 0.05);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        container.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);

        this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
        this.sunLight.position.set(50, 100, 50);
        this.sunLight.castShadow = true;
        this.scene.add(this.sunLight);

        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    addToScene(object) {
        this.scene.add(object);
    }
}
