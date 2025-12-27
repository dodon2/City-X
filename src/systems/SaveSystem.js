export class SaveSystem {
    static save(state) {
        localStorage.setItem('dictatorship_city_save', JSON.stringify(state));
    }

    static load() {
        const saved = localStorage.getItem('dictatorship_city_save');
        return saved ? JSON.parse(saved) : null;
    }

    static clear() {
        localStorage.removeItem('dictatorship_city_save');
    }
}
