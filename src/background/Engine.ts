import * as THREE from 'three';
import * as POST from 'postprocessing';
import { MotionValue } from 'motion/react';
import { Location } from 'react-router';
import Context from './Context';
import { ContextMappings } from './ContextMappings';
import { AppRoute } from '../AppRoutes';

export type EngineHooks = {
    scrollProgress: MotionValue<number>,
    scrollVelocity: MotionValue<number>,
    currentPage: Location
}

export default class Engine {
    private readonly elem: HTMLCanvasElement;
    private readonly getHooks: () => EngineHooks;

    private readonly renderer: THREE.WebGLRenderer;
    private readonly composer: POST.EffectComposer;
    private readonly scene: THREE.Scene;
    private readonly clock: THREE.Clock;

    public readonly camera: THREE.PerspectiveCamera;

    public context: Context;
    public lastContext: Context;

    public constructor(elemID: string, getHooks: () => EngineHooks) {
        this.elem = document.getElementById(elemID) as HTMLCanvasElement;

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.camera.position.z = 5;
        this.camera.rotation.order = "YXZ";
        this.scene.add(this.camera);

        this.getHooks = getHooks;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.elem,
            alpha: true,
            premultipliedAlpha: false,
            antialias: false,
            powerPreference: "high-performance"
        });

        this.composer = new POST.EffectComposer(this.renderer);
        this.composer.addPass(new POST.RenderPass(
            this.scene,
            this.camera
        ));

        this.composer.addPass(new POST.EffectPass(this.camera,
            new POST.GlitchEffect(),
            new POST.ASCIIEffect({ cellSize: 5 })
        ));

        window.onresize = (): void => this.handleResize();

        this.handleResize();

        this.renderer.setAnimationLoop((): void => this.mainloop());
    }

    public get hooks(): EngineHooks {
        return this.getHooks();
    }

    private mainloop(): void {
        const delta = Math.min(this.clock.getDelta(), 0.5);
        if (this.context) {
            this.context.tick(Math.min(0.5 * delta, 1));
        }
        const targetPos = this.context ? this.context.cameraPos : new THREE.Vector3;

        this.camera.position.add(
            targetPos
                .sub(this.camera.position)
                .multiplyScalar(Math.min(0.8 * delta, 1))
        );

        const oldRot = (new THREE.Vector3).setFromEuler(this.camera.rotation);
        this.camera.lookAt(this.context ?
            this.context.position :
            new THREE.Vector3(0, 1, 0));
        const rot = (new THREE.Vector3).copy(this.camera.rotation);
        this.camera.rotation.setFromVector3(
            rot.clone()
                .sub(oldRot)
                .multiplyScalar(Math.min(0.8 * delta, 1))
                .add(oldRot)
        );

        this.composer.render(delta);
    }

    private handleResize(): void {
        this.composer.setSize(window.innerWidth, window.innerHeight, false);
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    public switchContext(location: Location): void {
        if (this.lastContext) {
            this.lastContext.removeFromParent();
        }
        this.lastContext = this.context;
        const contextConstructor = ContextMappings[location.pathname as AppRoute];
        if (contextConstructor) {
            this.context = new contextConstructor(this);
            this.scene.add(this.context);
            return;
        }
        this.context = null;
    }
}