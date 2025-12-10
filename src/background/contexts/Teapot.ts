import * as THREE from 'three';
import Engine from '../Engine';
import Context from "../Context";

import { Entity } from '../Entity';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import LightArray from '../LightArray';

class TeapotEntity extends Entity {
    public constructor(engine: Engine) {
        super(engine);

        this.add(new THREE.Mesh(new TeapotGeometry(0.5), new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide
        })));
    }

    public tick(delta: number): void {
        const gValue = (this.engine.hooks.scrollVelocity.get() / 500 + 0.1) * delta;

        this.rotation.x += gValue * 1.5;
        this.rotation.y += gValue;
        this.rotation.z += gValue * 0.5;
    }
}

export default class TeapotContext extends Context {
    private readonly teapot: TeapotEntity;
    private readonly lightArray: LightArray;

    public constructor(engine: Engine) {
        super(engine);

        this.teapot = new TeapotEntity(this.engine);
        this.add(this.teapot);
        this.lightArray = new LightArray(this.engine);
        this.add(this.lightArray);
    }

    public override tick(delta: number): void {
        this.teapot.tick(delta);
        this.lightArray.tick(delta);
    }
}
