import * as THREE from 'three';

export default class Engine {
    private readonly elem: HTMLCanvasElement;

    private readonly renderer: THREE.WebGLRenderer;
    private readonly scene: THREE.Scene;

    private readonly camera: THREE.PerspectiveCamera;

    public constructor(elemID: string) {
        this.elem = document.getElementById(elemID) as HTMLCanvasElement;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.elem,
            alpha: true,
            premultipliedAlpha: false
        });

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.scene.add(this.camera);

        const cube = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshNormalMaterial());
        this.scene.add(cube);
        cube.position.z = -5;

        window.onresize = (): void => this.handleResize();

        this.handleResize();

        this.renderer.setAnimationLoop((): void => this.mainloop());
    }

    private mainloop(): void {
        this.renderer.render(this.scene, this.camera);
    }

    private handleResize(): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}