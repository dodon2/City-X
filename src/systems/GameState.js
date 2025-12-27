import { INITIAL_STATE } from '../utils/Constants.js';

export class GameState {
    constructor() {
        this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
        this.listeners = [];
    }

    update(delta) {
        // Hunger increases over time
        this.state.hunger -= delta * 0.1;
        if (this.state.hunger < 0) {
            this.state.hunger = 0;
            this.state.health -= delta * 0.5;
        }

        if (this.state.health < 0) this.state.health = 0;
        
        if (this.state.health === 0) {
            window.dispatchEvent(new CustomEvent('game-over', { detail: { reason: 'death' } }));
        }

        if (this.state.money >= 100) {
            window.dispatchEvent(new CustomEvent('game-over', { detail: { reason: 'escape' } }));
        }
        
        this.notify();
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(cb => cb(this.state));
    }

    addMoney(amount) {
        this.state.money += amount;
        this.notify();
    }

    changeMorality(delta) {
        this.state.morality += delta;
        this.notify();
    }
}
