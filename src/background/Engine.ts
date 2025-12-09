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

    private readonly camera: THREE.PerspectiveCamera;

    private context: Context;
    private lastContext: Context;
    private contextInterp: number = 0;

    public constructor(elemID: string, getHooks: () => EngineHooks) {
        this.elem = document.getElementById(elemID) as HTMLCanvasElement;

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.camera.position.z = 5;
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
        const delta = this.clock.getDelta();
        if (this.context) {
            this.context.tick(delta);
        }
        this.composer.render(delta);
    }

    private handleResize(): void {
        this.composer.setSize(window.innerWidth, window.innerHeight, false);
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    public switchContext(location: Location): void {
        this.lastContext = this.context;
        this.contextInterp = 0;
        if (this.context) {
            this.context.removeFromParent();
        }
        const contextConstructor = ContextMappings[location.pathname as AppRoute];
        if (contextConstructor) {
            this.context = new contextConstructor(this);
            this.scene.add(this.context);
            this.camera.lookAt(this.context.position);
            return;
        }
        this.context = null;
    }
}