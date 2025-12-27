import * as THREE from 'three';
import { CITY_SIZE, BLOCK_SIZE, COLORS } from '../utils/Constants.js';
import { Random } from '../utils/Random.js';

export class CityGenerator {
    constructor(scene, seed = "city1") {
        this.scene = scene;
        this.rng = new Random(seed);
    }

    generate() {
        const halfSize = (CITY_SIZE * BLOCK_SIZE) / 2;
        
        // Ground
        const groundGeo = new THREE.PlaneGeometry(CITY_SIZE * BLOCK_SIZE, CITY_SIZE * BLOCK_SIZE);
        const groundMat = new THREE.MeshStandardMaterial({ color: COLORS.GROUND });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Simple grid generation
        for (let x = -CITY_SIZE / 2; x < CITY_SIZE / 2; x++) {
            for (let z = -CITY_SIZE / 2; z < CITY_SIZE / 2; z++) {
                // Skip some spaces for "roads"
                if (x % 3 === 0 || z % 3 === 0) {
                    continue; 
                }

                if (this.rng.next() > 0.3) {
                    this.createBuilding(x * BLOCK_SIZE, z * BLOCK_SIZE);
                }
            }
        }

        // Walls
        this.createWalls(halfSize);
    }

    createBuilding(x, z) {
        const height = this.rng.range(2, 10);
        const geo = new THREE.BoxGeometry(BLOCK_SIZE * 0.8, height, BLOCK_SIZE * 0.8);
        const mat = new THREE.MeshStandardMaterial({ 
            color: COLORS.BUILDING,
            roughness: 0.9,
            metalness: 0.1
        });
        const building = new THREE.Mesh(geo, mat);
        building.position.set(x, height / 2, z);
        building.castShadow = true;
        building.receiveShadow = true;
        this.scene.add(building);
    }

    createWalls(halfSize) {
        const wallMat = new THREE.MeshStandardMaterial({ color: COLORS.WALL });
        const wallHeight = 20;

        const walls = [
            { pos: [0, wallHeight / 2, halfSize], size: [halfSize * 2, wallHeight, 1] },
            { pos: [0, wallHeight / 2, -halfSize], size: [halfSize * 2, wallHeight, 1] },
            { pos: [halfSize, wallHeight / 2, 0], size: [1, wallHeight, halfSize * 2] },
            { pos: [-halfSize, wallHeight / 2, 0], size: [1, wallHeight, halfSize * 2] }
        ];

        walls.forEach(w => {
            const geo = new THREE.BoxGeometry(...w.size);
            const wall = new THREE.Mesh(geo, wallMat);
            wall.position.set(...w.pos);
            this.scene.add(wall);
        });
    }
}
