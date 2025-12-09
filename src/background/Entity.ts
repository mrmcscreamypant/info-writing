import * as THREE from 'three';
import Engine from './Engine';


export abstract class Entity extends THREE.Group {
    protected readonly engine: Engine;

    public constructor(engine: Engine) {
        super();
        this.engine = engine;
    }
}
