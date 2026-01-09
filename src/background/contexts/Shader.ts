import * as THREE from 'three';
import Context from '../Context';
import Engine from '../Engine';
import LightArray from '../LightArray';

import fragShader from './shader.frag.glsl?raw';
import vertShader from './shader.vert.glsl?raw';
import { TeapotGeometry } from 'three/examples/jsm/Addons.js';

export default class ShaderContext extends Context {
    private readonly shaderMat: THREE.ShaderMaterial;

    public constructor(engine: Engine) {
        super(engine);

        this.shaderMat = new THREE.ShaderMaterial({
            fragmentShader: fragShader,
            vertexShader: vertShader,
            side: THREE.DoubleSide,
            uniforms: {
                time: {value: 0.0}
            }
        });
        this.add(new THREE.Mesh(new TeapotGeometry(0.5), this.shaderMat));
    }

    public override tick(delta: number): void {
        this.shaderMat.uniforms.time.value = this.engine.clock.elapsedTime;
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