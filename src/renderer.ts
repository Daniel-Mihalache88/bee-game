import { Entity } from "./interfaces/entity.interface";

export class Renderer<T extends Entity> {
    private readonly entities: Map<number, T> = new Map();
    private readonly queenContainer: HTMLDivElement;
    private readonly workersContainer: HTMLDivElement;
    private readonly dronesContainer: HTMLDivElement;

    get test() {
        return this.entities;
    }

    constructor(swarnData: Map<number, T>) {
        this.entities = swarnData;

        this.queenContainer = document.querySelector(".swarn__element--queen .content") as HTMLDivElement;
        this.workersContainer = document.querySelector(".swarn__element--worker .content") as HTMLDivElement;
        this.dronesContainer = document.querySelector(".swarn__element--drone .content") as HTMLDivElement;

        this.addSwarnToUi(this.entities);
    }

    addSwarnToUi(entities:  Map<number, T>): void {
        entities.forEach((value, key) => {
            console.log(value);
            if(value.type === 'queen') {
                this.queenContainer.appendChild(this.getElem(value, key));
            }
            if(value.type === 'workers') {
                console.log(value);
                this.workersContainer.appendChild(this.getElem(value, key));
            }
            if(value.type === 'drones') {
                this.dronesContainer.appendChild(this.getElem(value, key));
            }
        })
    }

    getElem(data: T, key: number): HTMLDivElement {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const span = document.createElement('span');
        div.classList.add('content__item');
        div.setAttribute('data-id', key.toString());
        img.setAttribute('src', "assets/bee_icon.png");
        img.setAttribute('alt', 'bee_icon');
        span.textContent = `HP: ${data.health}`
        div.appendChild(img);
        div.appendChild(span);

        return div;
        
    }

    updateUIOnBeeHit(entity: T):void {
        console.log(entity);
        // const el = document.querySelector(`[${entity.}]`)
    }
}