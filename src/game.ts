
import { Bee } from "./interfaces/bee.interface.js";
import { Swarn } from "./swarn.js";
import { Utils } from "./utils.js";
import { NewPlayer } from "./newPlayer.js";
import { EventEmmiter } from "./eventEmitter.js";
import { EventMap } from "./interfaces/eventMap.interface";
import { Renderer } from "./renderer.js";


export class Game {
    private startGameButton: HTMLButtonElement;
    private renderer: Renderer<Bee>;
    private emitter: EventEmmiter<EventMap>;
    private swarn: Swarn<Bee> | null = null;

    constructor() {
        this.emitter = EventEmmiter.getInstance<EventMap>();
        this.initializeListeners();
        this.handlePlayer();
        this.initGame(); 
        this.renderer = new Renderer(this.swarn!.entities);
        this.startGameButton = document.querySelector('.game__control button') as HTMLButtonElement;

        this.startGameButton.addEventListener('click', () => this.swarn!.hitBee());
    }

    private initializeListeners(): void {
        this.emitter.on("hit", data => this.renderer.updateUIOnBeeHit(data));
        this.emitter.on("kill", data => this.updateUIOnBeeKill(data));
        this.emitter.on("gameOver", data =>  this.updateUIOnGameOver(data))
    }

    updateUIOnBeeHit(bee: Bee):void {
        console.log(bee);
    }

    updateUIOnBeeKill(id: number):void {
        console.log(id);
    }

    updateUIOnGameOver(gameOver: string) {
        console.log(gameOver);
    }

    handlePlayer() {
        const playerName = localStorage.getItem("playerName");
        if(!playerName) {
            new NewPlayer();
            return;
        } 

        document.querySelector(".player-data__name span")!.textContent = playerName;
    }

    initGame() {
        const gameInProgress = localStorage.getItem('game');

        if(!gameInProgress) {
            const newData = Utils.getBeeSwarn(); 
            this.swarn = new Swarn(newData);
            return;
        }
        const savedData: Map<number, Bee> = new Map(JSON.parse(gameInProgress));

        this.swarn = new Swarn(savedData);
    }

}