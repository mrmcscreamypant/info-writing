import * as THREE from 'three';
import Engine from './Engine';
import { Entity } from './Entity';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';

export default class Cube extends Entity {
    public constructor(engine: Engine) {
        super(engine);

        this.add(new THREE.Mesh(new TeapotGeometry(0.5), new THREE.MeshPhongMaterial()));
    }

    public tick(delta: number): void {
        const gValue = (this.engine.hooks.scrollVelocity.get() / 500 + 0.2) * delta;

        this.rotation.x += gValue * 1.5;
        this.rotation.y += gValue;
        this.rotation.z += gValue * 0.5;
    }
}