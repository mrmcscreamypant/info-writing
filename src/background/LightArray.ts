import * as THREE from 'three';
import Engine from './Engine';
import { Entity } from './Entity';


export default class LightArray extends Entity {
    private readonly lights: THREE.PointLight[];

    private static readonly colors: THREE.ColorRepresentation[] = [
        'orange',
        'green',
        'teal'
    ];

    private elapsed: number = 0;

    public constructor(engine: Engine) {
        super(engine);

        this.lights = [];
        for (const color of LightArray.colors) {
            const light = new THREE.PointLight(
                color,
                10
            );
            this.lights.push(light);
            this.add(light);
        }
    }

    public tick(delta: number): void {
        this.elapsed += delta;

        for (let i = 0; i < this.lights.length; i++) {
            const light = this.lights[i];
            const offset = i / this.lights.length * 2 * Math.PI;
            light.position.set(
                Math.sin(this.elapsed + offset),
                0,
                Math.cos(this.elapsed + offset)
            ).multiplyScalar(3);
        }
    }
}