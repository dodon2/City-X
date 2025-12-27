export class TimeSystem {
    constructor() {
        this.time = 8 * 60; // Start at 08:00
        this.timeSpeed = 1; // 1 minute per real second
    }

    update(delta) {
        this.time += delta * this.timeSpeed;
        if (this.time >= 24 * 60) {
            this.time -= 24 * 60;
        }
    }

    getFormattedTime() {
        const hours = Math.floor(this.time / 60);
        const minutes = Math.floor(this.time % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    isNight() {
        return this.time < 6 * 60 || this.time > 20 * 60;
    }
}
