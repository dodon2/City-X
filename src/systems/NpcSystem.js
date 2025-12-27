import { NPC } from '../entities/NPC.js';
import { Random } from '../utils/Random.js';
import { CITY_SIZE, BLOCK_SIZE } from '../utils/Constants.js';

export class NpcSystem {
    constructor(scene, seed = "npcs") {
        this.scene = scene;
        this.rng = new Random(seed);
        this.npcs = [];
    }

    generate(count = 100) {
        for (let i = 0; i < count; i++) {
            const x = this.rng.range(-CITY_SIZE * BLOCK_SIZE / 2.2, CITY_SIZE * BLOCK_SIZE / 2.2);
            const z = this.rng.range(-CITY_SIZE * BLOCK_SIZE / 2.2, CITY_SIZE * BLOCK_SIZE / 2.2);
            
            const isPatrol = i < 10; // First 10 are patrols
            const npcData = {
                id: i,
                name: isPatrol ? `Patrol ${i}` : `Citizen ${i}`,
                x: x,
                z: z,
                isPatrol: isPatrol,
                color: isPatrol ? 0x0000ff : this.rng.pick([0x555555, 0x333333, 0x444466])
            };

            const npc = new NPC(this.scene, npcData);
            this.npcs.push(npc);
        }
    }

    update(delta) {
        this.npcs.forEach(npc => npc.update(delta));
    }
}
