import * as THREE from 'three';
import Engine from '../Engine';
import Context from "../Context";

import { Entity } from '../Entity';
import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js';
import LightArray from '../LightArray';

import wrenchGlb from './wrench.glb?url';

class WrenchEntity extends Entity {
    private gltf: GLTF;
    private time: number = 0;

    public constructor(engine: Engine) {
        super(engine);

        void new GLTFLoader().loadAsync(wrenchGlb).then(gltf => {
            this.gltf = gltf;
            this.gltf.scene.scale.setScalar(2);
            this.add(gltf.scene);
        });
    }

    private get topClaw(): THREE.Object3D {
        return this.gltf.scene.getObjectByName("TopClaw");
    }

    private get bottomClaw(): THREE.Object3D {
        return this.gltf.scene.getObjectByName("BottomClaw");
    }

    public tick(delta: number): void {
        this.time += delta * 5;
        this.engine.hooks.scrollSpring.set(Math.min(Math.abs(this.engine.hooks.scrollSpring.get()), 1000));
        this.rotation.y = this.time / 10;
        if (this.gltf) {
            const angle = Math.min(Math.abs(this.engine.hooks.scrollSpring.get()) / 20000, 0.5);
            this.topClaw.rotation.x = angle;
            this.bottomClaw.rotation.x = Math.PI - angle;
        }
    }
}

export default class WrenchContext extends Context {
    private readonly wrench: WrenchEntity;
    private readonly lightArray: LightArray;

    public constructor(engine: Engine) {
        super(engine);

        this.wrench = new WrenchEntity(this.engine);
        this.add(this.wrench);
        this.lightArray = new LightArray(this.engine);
        this.add(this.lightArray);
    }

    public override tick(delta: number): void {
        this.wrench.tick(delta);
        this.lightArray.tick(delta);
    }
}
