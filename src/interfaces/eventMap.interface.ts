import { Bee } from "./bee.interface"

type gameOver = 'queenDead' | 'allDead';

export type EventMap = {
    hit: [bee: Bee],
    kill: [beeId: number],
    gameOver: [gameOver: gameOver],
    restartGame: [shouldRestart: boolean]
    playerCreated: [playerName: string],
}