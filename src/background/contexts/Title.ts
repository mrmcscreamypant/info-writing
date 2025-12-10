import * as THREE from 'three';
import Engine from '../Engine';
import Context from "../Context";

import { Entity } from '../Entity';

class TitleEntity extends Entity {
    declare public children: THREE.Mesh[];
    private time: number = 0;

    public constructor(engine: Engine) {
        super(engine);

        for (let i = 0; i < 10; i++) {
            this.add(new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial()
            ));
        }
    }

    private cubePosition(i: number): THREE.Vector3 {
        const theta = i / this.children.length * 2 * Math.PI;
        return new THREE.Vector3(
            Math.sin(theta * (i / this.children.length) + this.time),
            Math.tan(theta + Math.cos(this.time) ^ 2) / 2,
            Math.cos(theta + this.time)
        );
    }

    public tick(delta: number): void {
        this.time += delta;

        this.rotation.y += 0.3 * delta;


        for (let i = 0; i < this.children.length; i++) {
            this.children[i].position.copy(this.cubePosition(i));
        }
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
        //this.add(directionalLight);
    }

    public override tick(delta: number): void {
        this.title.tick(delta);
    }

    /*public override get cameraPos(): THREE.Vector3 {
        return new THREE.Vector3;
    }*/
}
