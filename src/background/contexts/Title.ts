import * as THREE from 'three';
import Engine from '../Engine';
import Context from "../Context";

import { Entity } from '../Entity';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import LightArray from '../LightArray';

import titleURL from '../models/TestText.glb?url';

const title: GLTF = await new GLTFLoader().loadAsync(titleURL);
title.scene.scale.setScalar(0.2);

class TitleEntity extends Entity {
    public constructor(engine: Engine) {
        super(engine);

        this.add(title.scene.clone());
        this.lookAt(new THREE.Vector3);
        this.rotation.y += Math.PI / 2;
    }

    public tick(delta: number): void {
        this.rotation.y += 0.3 * delta;
    }
}

export default class TitleContext extends Context {
    private readonly title: TitleEntity;

    public constructor(engine: Engine) {
        super(engine);

        this.title = new TitleEntity(this.engine);
        this.add(this.title);

        const directionalLight = new THREE.SpotLight(0x00ccee, 1000, 0, Math.PI / 8);
        directionalLight.target = this.title;
        directionalLight.position.z = 5;
        this.add(directionalLight);
    }

    public override tick(delta: number): void {
        this.title.tick(delta);
    }

    public override get cameraPos(): THREE.Vector3 {
        return new THREE.Vector3;
    }
}
