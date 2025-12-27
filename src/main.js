import { Game } from './Game.js';

window.addEventListener('DOMContentLoaded', () => {
    try {
        const game = new Game();
        console.log('✅ DictatorshipCity Game initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize game:', error);
    }
});
