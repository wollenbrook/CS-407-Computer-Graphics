import { WebGLRenderer, ReinhardToneMapping } from 'three';

function createRenderer(container) {
  const renderer = new WebGLRenderer({canvas: container, antialias: true});
  renderer.toneMapping = ReinhardToneMapping;

  return renderer;
}

export { createRenderer };