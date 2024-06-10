import { Clock } from "three";

const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
        this.delta = 0;
    }

    start() {
        this.renderer.setAnimationLoop(() => {
        // tell every animated object to tick forward one frame
        this.tick();

        // render a frame
        this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

  tick() {
    this.delta = clock.getDelta();

        for (const object of this.updatables) {
        object.tick(this.delta);
        }
    }

    addUpdateable(object) {
        this.updatables.push(object);
    }

    removeUpdateable(object) {
        this.updatables = this.updatables.filter((updatable) => updatable !== object);
    }

    playSurvey() {
        this.cat.playIdle();
    }

    playWalk() {
        this.cat.playWalk();
    }

    playWalkReverse() {
        this.cat.playWalkReverse();
    }

    getFrameRate() {
        if (this.delta === 0) return 0;
        return 1 / this.delta;
    }
}

export { Loop };
