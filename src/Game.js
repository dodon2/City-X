import * as THREE from 'three';
import { RenderSystem } from './systems/RenderSystem.js';
import { GameState } from './systems/GameState.js';
import { CityGenerator } from './systems/CityGenerator.js';
import { Player } from './entities/Player.js';
import { HUD } from './ui/HUD.js';
import { TimeSystem } from './systems/TimeSystem.js';
import { NpcSystem } from './systems/NpcSystem.js';
import { DialogueSystem } from './systems/DialogueSystem.js';
import { AudioSystem } from './systems/AudioSystem.js';
import { SaveSystem } from './systems/SaveSystem.js';

export class Game {
    constructor() {
        this.renderSystem = new RenderSystem(document.getElementById('game-container'));
        
        const savedState = SaveSystem.load();
        this.gameState = new GameState();
        if (savedState) {
            this.gameState.state = savedState;
        }

        this.timeSystem = new TimeSystem();
        this.cityGenerator = new CityGenerator(this.renderSystem.scene);
        this.npcSystem = new NpcSystem(this.renderSystem.scene);
        this.dialogueSystem = new DialogueSystem(document.getElementById('ui-layer'));
        this.audioSystem = new AudioSystem(this.renderSystem.camera);
        
        this.player = new Player(this.renderSystem.camera, this.renderSystem.scene);
        this.player.camera.position.set(0, 1.7, 0);

        this.hud = new HUD(document.getElementById('ui-layer'));
        
        this.gameState.addListener((state) => {
            state.time = this.timeSystem.getFormattedTime();
            this.hud.update(state);
        });

        window.addEventListener('game-interact', (e) => this.handleInteract(e.detail.object));
        window.addEventListener('game-over', (e) => this.handleGameOver(e.detail.reason));

        this.lastTime = performance.now();
        this.init();
    }

    async handleGameOver(reason) {
        let message = "";
        if (reason === 'death') {
            message = "You died of hunger and exhaustion in the cold streets of Dictatorship City.";
        } else if (reason === 'escape') {
            message = "You saved enough money to bribe the guards and escape the city. You are free, but at what cost?";
        }

        SaveSystem.clear();
        await this.dialogueSystem.show(message, [{ text: "Restart", value: "restart" }]);
        window.location.reload();
    }

    async handleInteract(object) {
        // Simple interaction logic
        const response = await this.dialogueSystem.show("Hello citizen. Do you want to work at the factory?", [
            { text: "Yes (Earn $5, Lose 10 Hunger)", value: "work" },
            { text: "No", value: "no" }
        ]);

        if (response === "work") {
            this.gameState.addMoney(5);
            this.gameState.state.hunger -= 10;
        }
    }

    init() {
        console.log('🎮 Initializing game world...');
        this.cityGenerator.generate();
        console.log('🏙️ City generated');
        this.npcSystem.generate(100);
        console.log('👥 NPCs generated');
        this.animate();
        console.log('✅ Game loop started');
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = performance.now();
        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.player.update();
        this.npcSystem.update(delta);
        this.gameState.update(delta);
        this.timeSystem.update(delta);

        // Auto-save every 30 seconds
        if (Math.floor(time / 30000) > Math.floor(this.lastTime / 30000)) {
            SaveSystem.save(this.gameState.state);
            console.log('Game auto-saved');
        }

        // Update sunlight based on time
        const sunIntensity = this.timeSystem.isNight() ? 0.1 : 1.0;
        this.renderSystem.sunLight.intensity = THREE.MathUtils.lerp(this.renderSystem.sunLight.intensity, sunIntensity, 0.01);

        this.renderSystem.render();
    }
}
