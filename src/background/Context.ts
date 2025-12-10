import * as THREE from 'three';
import Engine from './Engine';
import { Entity } from './Entity';

export type ContextConstructor = new (engine: Engine) => Context

export default abstract class Context extends Entity {
    protected readonly rot: number;

    public constructor(engine: Engine) {
        super(engine);

        this.rot = this.engine.lastContext ?
            this.engine.lastContext.rot + Math.PI / 2 + Math.random() * Math.PI :
            Math.random() * 2 * Math.PI;

        this.position.set(
            Math.sin(this.rot),
            0,
            Math.cos(this.rot)
        ).multiplyScalar(10);
    }

    public abstract tick(delta: number): void;

    public get cameraPos(): THREE.Vector3 {
        const looker = new THREE.Object3D();
        this.add(looker);
        looker.lookAt(new THREE.Vector3);
        const location = this.position.clone().add(
            looker.getWorldDirection(new THREE.Vector3)
                .multiplyScalar(5)
        );
        this.remove(looker);
        return location;
    }
}