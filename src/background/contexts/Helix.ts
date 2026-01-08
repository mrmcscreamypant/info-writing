import * as THREE from 'three';
import Engine from '../Engine';
import Context from "../Context";

import { Entity } from '../Entity';
import LightArray from '../LightArray';

class HelixEntity extends Entity {
    declare public children: THREE.Mesh[];
    private time: number = 0;

    public constructor(engine: Engine) {
        super(engine);

        const OBJECT_SIZE = 0.1;
        const OBJECT_COUNT = 32;

        for (let i = 0; i < OBJECT_COUNT; i++) {
            this.add(new THREE.Mesh(
                new THREE.BoxGeometry(OBJECT_SIZE, OBJECT_SIZE, OBJECT_SIZE),
                new THREE.MeshPhongMaterial()
            ));
        }
    }

    private cubePosition(i: number): THREE.Vector3 {
        const theta = i / this.children.length * 2 * Math.PI;
        return new THREE.Vector3(
            Math.sin(theta * (i / this.children.length) + this.time),
            Math.tan(theta + Math.sin(this.time * theta / 2)),
            Math.cos(theta + this.time)
        ).multiplyScalar(1.5);
    }

    public tick(delta: number): void {
        this.time += (this.engine.hooks.scrollVelocity.get() / 256 + 0.1) * delta;

        this.rotation.y += 0.3 * delta;

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            child.position.copy(this.cubePosition(i));
            child.rotation.x += 0.1 * (i / this.children.length) * delta;
        }
    }
}

export default class HelixContext extends Context {
    private readonly helix: HelixEntity;
    private readonly lightArray: LightArray;

    public constructor(engine: Engine) {
        super(engine);

        this.helix = new HelixEntity(this.engine);
        this.add(this.helix);

        this.lightArray = new LightArray(this.engine);
        this.add(this.lightArray);
    }

    public override tick(delta: number): void {
        this.helix.tick(delta);
        this.lightArray.tick(delta);
    }
}
