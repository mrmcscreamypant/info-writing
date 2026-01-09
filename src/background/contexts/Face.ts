import * as THREE from 'three';
import Engine from '../Engine';
import Context from "../Context";

import { Entity } from '../Entity';
import LightArray from '../LightArray';

import mugshot from '../../assets/lowres.jpg?url';

const TEXTURE = await new THREE.TextureLoader().loadAsync(mugshot);

export default class FaceContext extends Context {
    private readonly lightArray: LightArray;

    public constructor(engine: Engine) {
        super(engine);

        const face = new THREE.Sprite(new THREE.SpriteMaterial({
            map: TEXTURE
        }));
        face.scale.set(1, TEXTURE.height / TEXTURE.width, 1).multiplyScalar(2.5);
        this.add(face);
    }

    public override tick(delta: number): void { }
}
