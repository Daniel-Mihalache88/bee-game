export class NewPlayer {
    private readonly form: HTMLFormElement;

    constructor() {
        this.form = this.getForm();
        document.body.appendChild(this.form);
        this.form.addEventListener("submit", this.submitHandler.bind(this));
    }

    private getForm(): HTMLFormElement {
        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");

        input.type = 'text';
        input.placeholder = 'Player Name';
        button.type = 'submit';
        button.textContent = 'Create New Player';
        
        form.appendChild(input);
        form.appendChild(button);
        form.classList.add('overlay');
        input.classList.add('input');

        return form;
    }

    private submitHandler(event: Event): void {
        event.preventDefault();

        const input = this.form.querySelector('.input')! as HTMLInputElement;
        const value = input.value.trim();

        if(value.length >= 3) {
            document.querySelector(".player-data__name span")!.textContent = value
            localStorage.setItem("playerName", value);
            this.form.remove();
        }
    }   
}