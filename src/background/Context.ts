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

    public get cameraPos(): THREE.Vector3 {
        const looker = new THREE.Object3D();
        this.add(looker);
        looker.lookAt(new THREE.Vector3());
        const location = this.position.clone().add(
            looker.getWorldDirection(new THREE.Vector3)
                .multiplyScalar(5)
        );
        this.remove(looker);
        return location;
    }
}