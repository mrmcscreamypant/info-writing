import * as THREE from 'three';
import Cube from './Cube';

export default class Engine {
    private readonly elem: HTMLCanvasElement;

    private readonly renderer: THREE.WebGLRenderer;
    private readonly scene: THREE.Scene;
    private readonly clock: THREE.Clock;

    private readonly camera: THREE.PerspectiveCamera;
    private readonly cube: Cube;

    public constructor(elemID: string) {
        this.elem = document.getElementById(elemID) as HTMLCanvasElement;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.elem,
            alpha: true,
            premultipliedAlpha: false
        });

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.scene.add(this.camera);

        this.cube = new Cube();
        this.scene.add(this.cube);
        this.cube.position.z = -5;

        window.onresize = (): void => this.handleResize();

        this.handleResize();

        this.renderer.setAnimationLoop((): void => this.mainloop());
    }

    private mainloop(): void {
        const delta = this.clock.getDelta();
        this.cube.tick(delta);
        this.renderer.render(this.scene, this.camera);
    }

    private handleResize(): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}