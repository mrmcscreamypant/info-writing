import * as THREE from 'three';
import Engine from './Engine';
import { Entity } from './Entity';

export type ContextConstructor = new (engine: Engine) => Context

export default abstract class Context extends Entity {
    public constructor(engine: Engine) {
        super(engine);

        const rot = Math.random() * 2 * Math.PI;

        this.position.set(
            Math.sin(rot),
            0,
            Math.cos(rot)
        ).multiplyScalar(10);
    }

    public abstract tick(delta: number): void;
    public abstract get cameraPos(): THREE.Vector3;
}