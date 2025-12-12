import * as THREE from 'three';
import Engine from '../Engine';
import Context from "../Context";

import { Entity } from '../Entity';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import LightArray from '../LightArray';

class TeapotEntity extends Entity {
    private readonly hundreds: THREE.Group;
    private readonly INSTANCE_COUNT: number = 800;

    public constructor(engine: Engine) {
        super(engine);

        const mesh = new THREE.Mesh(
            new TeapotGeometry(0.5),
            new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
            })
        );
        this.add(mesh);

        this.hundreds = new THREE.Group();
        for (let i = 0; i < this.INSTANCE_COUNT; i++) {
            const hundred = mesh.clone();
            hundred.scale.setScalar(0.1);
            hundred.position.randomDirection().multiplyScalar((Math.random() + 0.1) * 8);
            hundred.rotation.setFromVector3((new THREE.Vector3).random().multiplyScalar(Math.PI / 2));
            this.hundreds.add(hundred);
        }
    }

    public tick(delta: number): void {
        const gValue = (this.engine.hooks.scrollVelocity.get() / 128 + 0.1) * delta;

        this.rotation.x += gValue * 1.5;
        this.rotation.y += gValue;
        this.rotation.z += gValue * 0.5;

        if (this.engine.hooks.scrollProgress.get() > 0.92) {
            if (!this.children.includes(this.hundreds)) {
                this.add(this.hundreds);
            }
        } else if (this.children.includes(this.hundreds)) {
            this.remove(this.hundreds);
        }
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
