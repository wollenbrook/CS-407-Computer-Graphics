import { Dagger } from "../components/dagger";
import type { Animateable } from "../Animateable";

export class Collider implements Animateable {
    private daggers : Dagger[];

    constructor(daggers : Dagger[]) {
        this.daggers = daggers;
    }

    handleCollisions() {
        for (let i = 0; i < this.daggers.length; i++) {
            for (let j = i + 1; j < this.daggers.length; j++) {
                const dagger1 = this.daggers[i];
                const dagger2 = this.daggers[j];
                if (dagger1.collidesWith(dagger2)) {
                    dagger1.bounceOff(dagger2);
                }
            }
        }
    }

    tick(delta : number) {
        this.handleCollisions();
    }
}