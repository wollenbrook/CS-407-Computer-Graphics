import { Clock, PerspectiveCamera, WebGLRenderer, Scene, Object3D } from 'three';
import type { Animateable } from '../Animateable.js';

export class Loop {
    private camera : PerspectiveCamera;
    private scene : Scene;
    private renderer: WebGLRenderer;
    private updateables: Animateable[] = [];
    private clock = new Clock();
    private delta = 0;
    
    constructor(camera : PerspectiveCamera, scene : Scene, renderer : WebGLRenderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
    }

    start() {
        this.delta = this.clock.getDelta();
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.renderer.render(this.scene, this.camera);
        });
     }
    
    stop() {
        this.renderer.setAnimationLoop(null);
        this.delta = 0;
    }

    addUpdateable(item: Animateable) {
        this.updateables.push(item);
    }

    removeUpdateable(item: Animateable) {
        const index = this.updateables.indexOf(item);
        if (index !== -1) {
            this.updateables.splice(index, 1);
        }
    }
    
    tick() {
        this.delta = this.clock.getDelta();
        for (const item of this.updateables) {
            item.tick(this.delta);
        }
    }

    /**
     * 
     * @returns the current frame rate in frames per second
     */
    getFrameRate() : number {
        if (this.delta === 0) return 0;
        return 1 / this.delta;
    }
}