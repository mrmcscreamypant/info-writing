import * as THREE from 'three';

export default class Cube extends THREE.Group {
    public constructor() {
        super();

        this.add(new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial()));
    }

    public tick(delta: number): void {
        this.rotation.y += delta;
    }
}