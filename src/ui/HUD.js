export class HUD {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.className = 'hud-bar';
        this.container.appendChild(this.element);
        this.update({ health: 100, hunger: 100, money: 10 });
    }

    update(state) {
        this.element.innerHTML = `
            <div class="stat-row">
                <span class="stat-label">Time:</span>
                <span class="stat-value">${state.time || '08:00'}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Health:</span>
                <span class="stat-value">${Math.ceil(state.health)}%</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Hunger:</span>
                <span class="stat-value">${Math.ceil(state.hunger)}%</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Money:</span>
                <span class="stat-value">${Math.floor(state.money)}</span>
            </div>
        `;
    }
}
