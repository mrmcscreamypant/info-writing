import * as THREE from 'three';
import Context from '../Context';
import Engine from '../Engine';
import LightArray from '../LightArray';

import fragShader from './shader.frag.glsl?raw';
import vertShader from './shader.vert.glsl?raw';

export default class ShaderContext extends Context {
    private readonly lightArray: LightArray;

    public constructor(engine: Engine) {
        super(engine);

        this.add(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.ShaderMaterial({
            fragmentShader: fragShader,
            vertexShader: vertShader
        })));

        this.lightArray = new LightArray(this.engine);
        this.add(this.lightArray);
    }

    public override tick(delta: number): void {
        this.lightArray.tick(delta);
    }

    public override get cameraPos(): THREE.Vector3 {
        const time = this.engine.clock.elapsedTime / 2;
        return new THREE.Vector3(
            Math.sin(time),
            1,
            Math.cos(time)
        ).multiplyScalar(2).add(this.position);
    }
}