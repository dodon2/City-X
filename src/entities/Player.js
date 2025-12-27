import * as THREE from 'three';

export class Player {
    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.speed = 0.1;
        
        this.raycaster = new THREE.Raycaster();
        this.raycaster.far = 3;

        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            interact: false
        };

        this.pitch = 0;
        this.yaw = 0;

        this.initControls();
    }

    initControls() {
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
        
        document.addEventListener('mousemove', (e) => {
            if (document.pointerLockElement) {
                this.yaw -= e.movementX * 0.002;
                this.pitch -= e.movementY * 0.002;
                this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));
            }
        });

        document.addEventListener('pointerlockchange', () => {
            const instructions = document.getElementById('instructions');
            if (document.pointerLockElement) {
                instructions.style.display = 'none';
            } else {
                instructions.style.display = 'block';
            }
        });

        document.addEventListener('click', () => {
            document.body.requestPointerLock();
        });
    }

    onKeyDown(e) {
        switch (e.code) {
            case 'KeyW': this.keys.forward = true; break;
            case 'KeyS': this.keys.backward = true; break;
            case 'KeyA': this.keys.left = true; break;
            case 'KeyD': this.keys.right = true; break;
            case 'KeyE': this.keys.interact = true; break;
        }
    }

    onKeyUp(e) {
        switch (e.code) {
            case 'KeyW': this.keys.forward = false; break;
            case 'KeyS': this.keys.backward = false; break;
            case 'KeyA': this.keys.left = false; break;
            case 'KeyD': this.keys.right = false; break;
            case 'KeyE': this.keys.interact = false; break;
        }
    }

    canMoveTo(pos) {
        // City boundary
        const limit = 120;
        if (Math.abs(pos.x) > limit || Math.abs(pos.z) > limit) return false;

        // Simple building collision
        this.raycaster.set(this.camera.position, this.direction.clone().applyQuaternion(this.camera.quaternion).normalize());
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0 && intersects[0].distance < 1) {
            return false;
        }

        return true;
    }

    update() {
        if (!document.pointerLockElement) return;

        this.direction.z = Number(this.keys.forward) - Number(this.keys.backward);
        this.direction.x = Number(this.keys.right) - Number(this.keys.left);
        this.direction.normalize();

        const moveVector = new THREE.Vector3();
        moveVector.copy(this.direction);
        moveVector.applyQuaternion(this.camera.quaternion);
        // We want to move on the XZ plane
        moveVector.y = 0;
        moveVector.normalize();

        const nextPosition = this.camera.position.clone().addScaledVector(moveVector, this.speed);
        
        // Simple collision detection
        if (this.canMoveTo(nextPosition)) {
            this.camera.position.copy(nextPosition);
        }
        
        this.camera.rotation.set(0, 0, 0); // Reset
        this.camera.quaternion.setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));

        // Interaction
        if (this.keys.interact) {
            this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children, true);
            if (intersects.length > 0) {
                const object = intersects[0].object;
                console.log('Interacted with', object);
                // Dispatch event or call a method
                window.dispatchEvent(new CustomEvent('game-interact', { detail: { object } }));
            }
            this.keys.interact = false; // Reset to prevent multiple trigger
        }
    }
}
