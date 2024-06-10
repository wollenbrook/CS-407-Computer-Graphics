import { AnimationMixer } from 'three';

function setupModel(data) {
    const model = data.scene.children[0];

    
    const idleClip = data.animations[0];
    const walkClip = data.animations[1];
    
    const mixer = new AnimationMixer(model);

    const idleAction = mixer.clipAction(idleClip);
    const walkAction = mixer.clipAction(walkClip);

    model.tick = (delta) => {
        mixer.update(delta);
    };

    model.playIdle = () => {
        idleAction.play();
        walkAction.stop();
    }

    model.playWalk = () => {
        walkAction.timeScale = 1;
        walkAction.play();
        idleAction.stop();
    };

    // Add a method to play the walk animation in reverse
    model.playWalkReverse = () => {
        walkAction.timeScale = -1; // Play in reverse
        walkAction.play();
        idleAction.stop();
    };
    
    return model;
    }

export { setupModel };