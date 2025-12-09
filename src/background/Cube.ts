import * as THREE from 'three';
import Engine from './Engine';

export default class Cube extends THREE.Group {
    private readonly engine: Engine;

    public constructor(engine: Engine) {
        super();
        this.engine = engine;

        this.add(new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial()));
    }

    public tick(delta: number): void {
        const gValue = (this.engine.hooks.scrollVelocity.get() / 100 + 0.5) * delta;

        this.rotation.x += gValue * 1.5;
        this.rotation.y += gValue;
        this.rotation.z += gValue * 0.5;
    }
}