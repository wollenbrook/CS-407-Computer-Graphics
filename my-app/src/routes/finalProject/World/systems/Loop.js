import { Clock } from "three";

const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer, world) {
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

        // Only proceed if the world exists
        if (this.world) {
            // Update the physics world
            this.world.step(1 / 60);
        }

        for (const object of this.updatables) {
            object.tick(this.delta);
        }
    }

    addUpdateable(object) {
        this.updatables.push(object);
    }

    removeUpdateable(object) {
        const index = this.updatables.indexOf(object);
        if (index > -1) {
            this.updatables.splice(index, 1);
        }
    }
}

export { Loop };
