import * as THREE from 'three';

export class NPC {
    constructor(scene, data) {
        this.scene = scene;
        this.data = data;
        this.mesh = this.createMesh();
        this.scene.add(this.mesh);
        this.mesh.position.set(data.x, 1, data.z);
    }

    createMesh() {
        const geo = new THREE.CapsuleGeometry(0.4, 1.2, 4, 8);
        const mat = new THREE.MeshStandardMaterial({ color: this.data.color || 0x444444 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        return mesh;
    }

    update(delta) {
        if (this.data.isPatrol) {
            this.mesh.position.x += Math.sin(Date.now() * 0.001) * 0.05;
        }
    }
}
