export class DialogueSystem {
    constructor(uiLayer) {
        this.uiLayer = uiLayer;
        this.element = document.createElement('div');
        this.element.className = 'dialogue-container';
        this.element.style.display = 'none';
        this.uiLayer.appendChild(this.element);
    }

    show(text, options = []) {
        document.exitPointerLock();
        this.element.style.display = 'block';
        this.element.innerHTML = `
            <div class="dialogue-text">${text}</div>
            <div class="dialogue-options">
                ${options.map((opt, i) => `<button class="dialogue-opt" data-index="${i}">${opt.text}</button>`).join('')}
            </div>
        `;

        return new Promise((resolve) => {
            const buttons = this.element.querySelectorAll('.dialogue-opt');
            buttons.forEach(btn => {
                btn.onclick = () => {
                    const index = btn.getAttribute('data-index');
                    this.hide();
                    resolve(options[index].value);
                };
            });
        });
    }

    hide() {
        this.element.style.display = 'none';
    }
}
